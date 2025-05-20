import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_KEY } from './config.js';

class Chatbot {
    constructor() {
        this.genAI = new GoogleGenerativeAI(API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        this.chat_history = [];
        this.setupUI();
        this.setupEventListeners();
        this.updateStatus(true);
    }

    setupUI() {
        this.messagesContainer = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-message');
        this.typingIndicator = document.querySelector('.typing-indicator');
        this.clearButton = document.getElementById('clear-chat');
        this.quickLinks = document.querySelectorAll('.quick-link-btn');
    }

    setupEventListeners() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.handleSendMessage());

        // Send message on Enter (but new line on Shift+Enter)
        this.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });

        // Auto-resize textarea
        this.userInput.addEventListener('input', () => this.adjustTextareaHeight());

        // Clear chat
        this.clearButton?.addEventListener('click', () => this.clearChat());

        // Quick links
        this.quickLinks.forEach(link => {
            link.addEventListener('click', () => {
                const question = link.dataset.question;
                if (question) {
                    this.userInput.value = question;
                    this.handleSendMessage();
                }
            });
        });
    }

    updateStatus(isOnline) {
        const statusIndicator = document.querySelector('.status-indicator');
        const statusText = document.querySelector('.status-text');
        
        if (isOnline) {
            statusIndicator.classList.add('online');
            statusText.textContent = 'Online';
        } else {
            statusIndicator.classList.remove('online');
            statusText.textContent = 'Offline';
        }
    }

    adjustTextareaHeight() {
        const textarea = this.userInput;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.textContent = text;
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        this.typingIndicator.style.display = 'flex';
    }

    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    clearChat() {
        while (this.messagesContainer.firstChild) {
            this.messagesContainer.removeChild(this.messagesContainer.firstChild);
        }
        // Add welcome message back
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'welcome-message';
        welcomeMessage.innerHTML = `
            <h2>Welcome to Rangsit University Library</h2>
            <p>I'm your AI library assistant. I can help you with:</p>
            <ul>
                <li>Finding books and resources</li>
                <li>Library hours and services</li>
                <li>Study room bookings</li>
                <li>Online database access</li>
            </ul>
            <p>How can I assist you today?</p>
        `;
        this.messagesContainer.appendChild(welcomeMessage);
        this.chat_history = [];
    }

    async handleSendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Add user message to UI
        this.addMessage(message, true);
        
        // Clear input and reset height
        this.userInput.value = '';
        this.adjustTextareaHeight();

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Add user message to history
            this.chat_history.push({ role: 'user', parts: message });

            // Get AI response
            const result = await this.model.generateContent({
                contents: [{
                    parts: [{
                        text: `You are a helpful library assistant for Rangsit University Library. 
                        You help students and faculty with questions about library services, resources, 
                        and facilities. Be concise but friendly in your responses. If you don't know 
                        something specific about RSU Library, be honest and provide general library guidance.
                        
                        Library Information:
                        - Hours: Mon-Fri 8:00-20:00, Sat-Sun 9:00-17:00
                        - Location: 52/347 Muang-Ake, Phaholyothin Road, Lak-Hok, Muang, Pathumthani 12000
                        - Contact: library@rsu.ac.th, Tel: 02-997-2222 ext. 3461
                        - Services: Book borrowing, study rooms, computer access, printing, research support
                        - Online Resources: Access Pharmacy, BioMed Central, Business Source Ultimate, Science Direct
                        
                        Keep responses under 150 words.

                        User question: ${message}`
                    }]
                }]
            });

            const response = result.response.text();
            
            // Add AI response to history
            this.chat_history.push({ role: 'assistant', parts: response });
            
            // Hide typing indicator and show response
            this.hideTypingIndicator();
            this.addMessage(response);

            // Limit history to last 10 messages
            if (this.chat_history.length > 10) {
                this.chat_history = this.chat_history.slice(-10);
            }
        } catch (error) {
            console.error('Error getting AI response:', error);
            this.hideTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again later.');
            this.updateStatus(false);
        }
    }
}

// Initialize chatbot
const chatbot = new Chatbot(); 