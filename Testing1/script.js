import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace with a valid Google API Key
const API_KEY = process.env.GOOGLE_API_KEY || "YOUR_API_KEY_HERE";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
 // Use correct model

// Select DOM elements
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Initialize chatbot session
let chat;

async function initChat() {
  try {
      chat = model.startChat({
          history: [
              { role: "user", parts: [{ text: "Hello, Don't answer any questions that are not related to the Rangsit University Library." }] },
              { role: "model", parts: [{ text: "Ok. I will not answer questions that are not related to the Rangsit University Library. I will answer 'Sorry, I don't have any information for that'." }] },

              { role: "user", parts: [{ text: "Where is the Rangsit University Library located?" }] },
              { role: "model", parts: [{ text: "The Rangsit University library is in Building 7." }] },

              { role: "user", parts: [{ text: "What are the library hours?" }] },
              { role: "model", parts: [{ text: "The library is open Monday to Friday from 8:00 AM to 17:00 PM." }] },

              { role: "user", parts: [{ text: "Can students borrow books from the library?" }] },
              { role: "model", parts: [{ text: "Yes, students can borrow up to two books for a period of two weeks." }] },

              { role: "user", parts: [{ text: "Can I renew my borrowed books online?" }] },
              { role: "model", parts: [{ text: "Yes, students can renew borrowed books by logging into their library account online or by visiting the library circulation desk." }] },

              { role: "user", parts: [{ text: "How much is the fine for overdue books?" }] },
              { role: "model", parts: [{ text: "The overdue book fine is 25 Baht per day per book." }] },

              { role: "user", parts: [{ text: "Does the library offer digital resources?" }] },
              { role: "model", parts: [{ text: "Yes, the Rangsit University Library provides access to e-books, databases, and online journals through the school library portal." }] },

              { role: "user", parts: [{ text: "Are there printing and photocopying services available?" }] },
              { role: "model", parts: [{ text: "Yes, students can use the library's printing and photocopying services for a nominal fee." }] },

              { role: "user", parts: [{ text: "Are there study spaces in the library?" }] },
              { role: "model", parts: [{ text: "Yes, the library offers both individual study spaces and group study areas for students." }] },

              { role: "user", parts: [{ text: "Can I request books that are not available in the library?" }] },
              { role: "model", parts: [{ text: "Yes, students can request books through the interlibrary loan service." }] },

              { role: "user", parts: [{ text: "Is there an online catalog for the library?" }] },
              { role: "model", parts: [{ text: "Yes, students can search for books and materials in the Rangsit University Library catalog via the school website." }] },

              { role: "user", parts: [{ text: "Does the library provide access to academic research papers?" }] },
              { role: "model", parts: [{ text: "Yes, students can access academic research papers through the university's digital repository and academic databases." }] },

              { role: "user", parts: [{ text: "Does the library have Wi-Fi for students?" }] },
              { role: "model", parts: [{ text: "Yes, the library offers free Wi-Fi for students. They need to log in using their university credentials." }] },

              { role: "user", parts: [{ text: "Are there any quiet study areas in the library?" }] },
              { role: "model", parts: [{ text: "Yes, there are designated quiet study zones to ensure minimal disturbances for focused learning." }] },

              { role: "user", parts: [{ text: "Can alumni access the library after graduation?" }] },
              { role: "model", parts: [{ text: "Yes, alumni can access the library but may have restrictions on borrowing privileges." }] },

              { role: "user", parts: [{ text: "Can I use my student ID to borrow books?" }] },
              { role: "model", parts: [{ text: "Yes, students must present their student ID to borrow books from the library." }] },

              { role: "user", parts: [{ text: "Does the library have group discussion rooms?" }] },
              { role: "model", parts: [{ text: "Yes, students can book group discussion rooms in advance at the library help desk." }] },

              { role: "user", parts: [{ text: "Are there any computer labs available in the library?" }] },
              { role: "model", parts: [{ text: "Yes, the library has computer labs that students can use for research and assignments." }] },

              { role: "user", parts: [{ text: "Can I bring food or drinks into the library?" }] },
              { role: "model", parts: [{ text: "No, food and drinks are not allowed in the library to maintain cleanliness and prevent damage to books." }] },

              { role: "user", parts: [{ text: "How do I contact the library staff?" }] },
              { role: "model", parts: [{ text: "Students can contact the library staff via email, phone, or by visiting the library information desk." }] }
          ]
      });

      console.log("Chatbot initialized successfully.");
  } catch (error) {
      console.error("Error initializing chatbot:", error);
  }
}


// Handle sending user messages
async function handleSendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return; // Prevent empty messages

    addMessage("User", userMessage);
    userInput.value = "";

    const typingElement = showTypingIndicator(); // Show "Typing..." indicator

    try {
        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const botMessage = await response.text();

        chatMessages.removeChild(typingElement); // Remove typing indicator
        addMessage("Bot", botMessage); // Display bot response
    } catch (error) {
        console.error("Error sending message:", error);
        chatMessages.removeChild(typingElement);
        addMessage("Bot", "Sorry, something went wrong. Please try again.");
    }
}

// Display typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "incoming");
    typingDiv.innerHTML = `<span class="typing-indicator">Typing...</span>`;
    chatMessages.appendChild(typingDiv);
    scrollToBottomSmooth();
    return typingDiv;
}

// Add messages to the chat window
function addMessage(sender, message) {
    if (!message.trim()) return; // Prevent empty messages

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender === "User" ? "outgoing" : "incoming");
    messageElement.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(messageElement);
    scrollToBottomSmooth();
}

// Smoothly scroll to the bottom of the chat
function scrollToBottomSmooth() {
    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: "smooth"
    });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    initChat();
    sendBtn.addEventListener("click", handleSendMessage);
    userInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    // Add keyboard navigation
    sendBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSendMessage();
        }
    });

    // Focus input on page load
    userInput.focus();
});
