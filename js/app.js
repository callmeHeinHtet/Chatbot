import chatManager from './chat.js';
import { initTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();

    // DOM Elements
    const chatButton = document.getElementById('chat-button');
    const openChatButton = document.getElementById('open-chat');
    const chatInterface = document.getElementById('chat-interface');
    const minimizeButton = document.getElementById('minimize-chat');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');
    const clearButton = document.getElementById('clear-chat');
    const quickLinkButtons = document.querySelectorAll('.quick-link-btn');

    // Initialize chat interface
    function showChatInterface() {
        chatInterface.classList.remove('hidden');
        chatButton.style.display = 'none';
        userInput.focus();
        adjustTextareaHeight();
    }

    function hideChatInterface() {
        chatInterface.classList.add('hidden');
        chatButton.style.display = 'flex';
    }

    // Initialize on page load
    showChatInterface();

    // Show chat button only if we're on the RSU website or localhost
    const isRSUDomain = window.location.hostname.includes('rsu.ac.th') || 
                       window.location.hostname === 'localhost' ||
                       window.location.hostname === '127.0.0.1';
    
    chatButton.style.display = isRSUDomain ? 'flex' : 'none';

    // Event Listeners
    chatButton.addEventListener('click', showChatInterface);
    openChatButton.addEventListener('click', showChatInterface);
    minimizeButton.addEventListener('click', hideChatInterface);

    // Send message on button click
    sendButton.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            chatManager.addMessage(message, true);
            chatManager.sendMessage(message);
            userInput.value = '';
            adjustTextareaHeight();
        }
    });

    // Send message on Enter key (Shift+Enter for new line)
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendButton.click();
        }
    });

    // Adjust textarea height
    function adjustTextareaHeight() {
        userInput.style.height = 'auto';
        userInput.style.height = (userInput.scrollHeight) + 'px';
    }

    userInput.addEventListener('input', adjustTextareaHeight);

    // Clear chat
    clearButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the chat history?')) {
            chatManager.clearChat();
        }
    });

    // Quick link buttons
    quickLinkButtons.forEach(button => {
        button.addEventListener('click', () => {
            const question = button.getAttribute('data-question');
            userInput.value = question;
            sendButton.click();
        });
    });

    // Handle window resize
    window.addEventListener('resize', adjustTextareaHeight);
}); 