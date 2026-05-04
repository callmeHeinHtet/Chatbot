/**
 * RSU Library AI — frontend chat client
 *
 * Calls /api/chat (backend Express proxy). The Gemini API key is held
 * server-side and never reaches the browser. History is maintained
 * client-side and sent with each request (backend is stateless).
 */

const RATE_LIMIT_MS = 1500 // minimum time between sends — protects free quota

class Chatbot {
    constructor() {
        this.history = []           // [{role:'user'|'model', parts:[{text}]}]
        this.lastSendTime = 0
        this.setupUI()
        this.setupEventListeners()
        this.checkBackendHealth()
    }

    setupUI() {
        this.messagesContainer = document.getElementById('chat-messages')
        this.userInput = document.getElementById('user-input')
        this.sendButton = document.getElementById('send-message')
        this.typingIndicator = document.querySelector('.typing-indicator')
        this.clearButton = document.getElementById('clear-chat')
        this.quickLinks = document.querySelectorAll('.quick-link-btn')
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.handleSendMessage())

        this.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                this.handleSendMessage()
            }
        })

        this.userInput.addEventListener('input', () => this.adjustTextareaHeight())

        this.clearButton?.addEventListener('click', () => this.clearChat())

        this.quickLinks.forEach((link) => {
            link.addEventListener('click', () => {
                const question = link.dataset.question
                if (question) {
                    this.userInput.value = question
                    this.handleSendMessage()
                }
            })
        })

        // Listen for language change → reset chat so the bot doesn't reference
        // English context in a Thai reply (or vice versa).
        document.addEventListener('rsu:lang-changed', () => this.resetForLanguageChange())
    }

    async checkBackendHealth() {
        try {
            const r = await fetch('/api/health')
            if (r.ok) {
                this.updateStatus(true)
                return
            }
        } catch {}
        this.updateStatus(false)
    }

    updateStatus(isOnline) {
        const statusEl = document.querySelector('.status')
        const statusText = document.querySelector('.status-text')
        if (!statusText || !statusEl) return
        statusEl.classList.toggle('online', isOnline)
        statusText.textContent = isOnline ? 'Online' : 'Offline'
    }

    adjustTextareaHeight() {
        const textarea = this.userInput
        textarea.style.height = 'auto'
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }

    addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div')
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`
        messageDiv.textContent = text
        this.messagesContainer.appendChild(messageDiv)
        this.scrollToBottom()
    }

    showTypingIndicator() {
        if (this.typingIndicator) this.typingIndicator.style.display = 'flex'
    }

    hideTypingIndicator() {
        if (this.typingIndicator) this.typingIndicator.style.display = 'none'
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
    }

    /** Build the welcome speech bubble — used by clearChat + lang change. */
    buildWelcomeMessage() {
        const t = window.i18n?.t
        const dict = (key, fallback) => (t ? t(key) ?? fallback : fallback)

        const welcome = document.createElement('div')
        welcome.className = 'welcome-message'
        welcome.innerHTML = `
            <h2 data-i18n="chatbot.welcome.title">${dict('chatbot.welcome.title', 'Welcome to RSU Library')}</h2>
            <p data-i18n="chatbot.welcome.intro">${dict('chatbot.welcome.intro', 'Hi! I can help you with:')}</p>
            <ul>
                <li data-i18n="chatbot.welcome.i1">${dict('chatbot.welcome.i1', 'Finding books and resources')}</li>
                <li data-i18n="chatbot.welcome.i2">${dict('chatbot.welcome.i2', 'Booking study rooms')}</li>
                <li data-i18n="chatbot.welcome.i3">${dict('chatbot.welcome.i3', 'Printing and computer services')}</li>
                <li data-i18n="chatbot.welcome.i4">${dict('chatbot.welcome.i4', 'Library hours and locations')}</li>
            </ul>
            <p data-i18n="chatbot.welcome.prompt">${dict('chatbot.welcome.prompt', 'What can I help you with?')}</p>
        `
        return welcome
    }

    clearChat() {
        while (this.messagesContainer.firstChild) {
            this.messagesContainer.removeChild(this.messagesContainer.firstChild)
        }
        this.messagesContainer.appendChild(this.buildWelcomeMessage())
        this.history = []
    }

    /** Reset on language change — same as clear, but also re-applies i18n. */
    resetForLanguageChange() {
        this.clearChat()
        window.i18n?.applyTranslations?.()
    }

    async handleSendMessage() {
        const message = this.userInput.value.trim()
        if (!message) return

        // Frontend rate limit — protects against spam-clicks
        const now = Date.now()
        const elapsed = now - this.lastSendTime
        if (elapsed < RATE_LIMIT_MS) {
            const waitMs = RATE_LIMIT_MS - elapsed
            this.userInput.placeholder = `Please wait ${Math.ceil(waitMs / 1000)}s…`
            setTimeout(() => {
                this.userInput.placeholder = window.i18n?.t?.('chatbot.input.placeholder') ?? 'Type your message here...'
            }, waitMs)
            return
        }
        this.lastSendTime = now

        this.addMessage(message, true)
        this.userInput.value = ''
        this.adjustTextareaHeight()
        this.showTypingIndicator()
        this.sendButton.disabled = true

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    history: this.history,
                    message,
                }),
            })

            if (!response.ok) {
                const err = await response.json().catch(() => ({}))
                throw Object.assign(new Error(err.error || `HTTP ${response.status}`), {
                    status: response.status,
                    detail: err,
                })
            }

            const { reply } = await response.json()
            this.hideTypingIndicator()
            this.addMessage(reply)

            // Update local history with the turn that just completed
            this.history.push({ role: 'user', parts: [{ text: message }] })
            this.history.push({ role: 'model', parts: [{ text: reply }] })
            // Cap to last 20 turns (matches backend cap)
            if (this.history.length > 20) this.history = this.history.slice(-20)

            this.updateStatus(true)
        } catch (err) {
            console.error('Chat error:', err)
            this.hideTypingIndicator()
            const friendly =
                err?.status === 429
                    ? "I'm getting too many requests right now. Try again in a moment."
                    : err?.status === 503
                        ? 'The AI service is busy. Try again in a few seconds.'
                        : err?.status >= 500
                            ? 'The AI service had a hiccup. Try again.'
                            : 'Sorry, I hit an error. Please try again.'
            this.addMessage(friendly)
            this.updateStatus(false)
        } finally {
            this.sendButton.disabled = false
        }
    }
}

// Initialize chatbot
new Chatbot()
