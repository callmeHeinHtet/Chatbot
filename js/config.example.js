// Example configuration file
// Copy this file to config.js and replace the API key with your own

export const API_KEY = 'YOUR_GOOGLE_AI_API_KEY_HERE';

export const config = {
    // Model configuration
    TEMPERATURE: 0.7,
    MAX_TOKENS: 2048,
    RATE_LIMIT_MS: 2000,
    
    // Initial context and training data
    INITIAL_CONTEXT: [
        {
            role: "user",
            parts: [{ text: "You are the Rangsit University Library AI Assistant. Only answer questions related to the library. For non-library questions, respond with 'I can only help with library-related questions.'" }]
        },
        {
            role: "model",
            parts: [{ text: "I understand. I am the Rangsit University Library AI Assistant. I will only provide information about the library and its services. For any questions not related to the library, I will politely explain that I can only assist with library-related inquiries." }]
        }
    ]
}; 