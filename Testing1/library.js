// Toggle FAQ Answers
function toggleFAQ(element) {
    const answer = element.querySelector(".faq-answer");
    answer.style.display = answer.style.display === "block" ? "none" : "block";
}

// Chatbot Redirect
document.addEventListener("DOMContentLoaded", function () {
    const chatButton = document.querySelector(".btn");
    if (chatButton) {
        chatButton.addEventListener("click", function () {
            window.location.href = "Chatbot.html";
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const langSwitch = document.getElementById("lang-switch");

    if (!langSwitch) {
        console.error("Language switch button not found!");
        return;
    }

    langSwitch.addEventListener("click", toggleLanguage);
});

// Language Toggle Function
const translations = {
    en: {
        title: "Rangsit University Library",
        heroTitle: "Empowering minds with books, journals, and digital resources.",
        btnChat: "Ask the Chatbot",
        featuredTitle: "Explore Our Library",
        featured1: "Digital Library",
        featured1Text: "Access thousands of e-books, journals, and online databases.",
        featured2: "Research Assistance",
        featured2Text: "Need help? Our librarians are here to assist you with research and citations.",
        featured3: "Study Spaces",
        featured3Text: "Discover quiet study zones and group discussion rooms.",
        faqTitle: "Frequently Asked Questions",
        faq1: "How do I get a library card?",
        faq1Answer: "Visit the circulation desk with your student ID.",
        faq2: "What are the library's hours?",
        faq2Answer: "Monday - Friday, 8:00 AM - 5:00 PM.",
        faq3: "Can I renew books online?",
        faq3Answer: "Yes, log in to 'My Account' to renew items.",
        footerText: "© 2025 Rangsit University Library. All rights reserved.",
        langBtn: "TH / EN"
    },
    th: {
        title: "ห้องสมุดมหาวิทยาลัยรังสิต",
        heroTitle: "เพิ่มพูนความรู้ด้วยหนังสือ วารสาร และแหล่งข้อมูลดิจิทัล",
        btnChat: "ถามแชทบอท",
        featuredTitle: "สำรวจห้องสมุดของเรา",
        featured1: "ห้องสมุดดิจิทัล",
        featured1Text: "เข้าถึงหนังสืออิเล็กทรอนิกส์ วารสาร และฐานข้อมูลออนไลน์หลายพันรายการ",
        featured2: "บริการวิจัย",
        featured2Text: "ต้องการความช่วยเหลือ? บรรณารักษ์ของเราพร้อมให้คำแนะนำด้านการวิจัยและอ้างอิง",
        featured3: "พื้นที่อ่านหนังสือ",
        featured3Text: "ค้นหาพื้นที่อ่านหนังสือเงียบสงบและห้องประชุมกลุ่ม",
        faqTitle: "คำถามที่พบบ่อย",
        faq1: "ฉันจะได้รับบัตรห้องสมุดได้อย่างไร?",
        faq1Answer: "ไปที่เคาน์เตอร์บริการพร้อมบัตรนักศึกษา",
        faq2: "ห้องสมุดเปิดทำการเมื่อไหร่?",
        faq2Answer: "วันจันทร์ - ศุกร์ 08:00 - 17:00 น.",
        faq3: "ฉันสามารถต่ออายุหนังสือออนไลน์ได้ไหม?",
        faq3Answer: "ได้ สามารถเข้าสู่ระบบ 'บัญชีของฉัน' เพื่อต่ออายุ",
        footerText: "© 2025 ห้องสมุดมหาวิทยาลัยรังสิต สงวนลิขสิทธิ์",
        langBtn: "EN / TH"
    }
};

let currentLang = "en"; // Default Language

function toggleLanguage() {
    currentLang = currentLang === "en" ? "th" : "en";

    // Check if elements exist before updating them
    const elementsToUpdate = [
        { id: "library-title", text: translations[currentLang].title },
        { id: "hero-title", text: translations[currentLang].heroTitle },
        { id: "btn-chat", text: translations[currentLang].btnChat },
        { id: "featured-title", text: translations[currentLang].featuredTitle },
        { id: "featured1", text: translations[currentLang].featured1 },
        { id: "featured1-text", text: translations[currentLang].featured1Text },
        { id: "featured2", text: translations[currentLang].featured2 },
        { id: "featured2-text", text: translations[currentLang].featured2Text },
        { id: "featured3", text: translations[currentLang].featured3 },
        { id: "featured3-text", text: translations[currentLang].featured3Text },
        { id: "faq-title", text: translations[currentLang].faqTitle },
        { id: "faq1", text: translations[currentLang].faq1 },
        { id: "faq1-answer", text: translations[currentLang].faq1Answer },
        { id: "faq2", text: translations[currentLang].faq2 },
        { id: "faq2-answer", text: translations[currentLang].faq2Answer },
        { id: "faq3", text: translations[currentLang].faq3 },
        { id: "faq3-answer", text: translations[currentLang].faq3Answer },
        { id: "footer-text", text: translations[currentLang].footerText },
        { id: "lang-switch", text: translations[currentLang].langBtn }
    ];

    elementsToUpdate.forEach((el) => {
        const element = document.getElementById(el.id);
        if (element) {
            element.innerText = el.text;
        } else {
            console.warn(`Element with ID '${el.id}' not found.`);
        }
    });
}
