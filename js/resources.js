document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const searchInput = document.querySelector('.search-input');
    const searchType = document.querySelector('.search-type');
    const searchBtn = document.querySelector('.search-btn');

    // Handle tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Update placeholder based on selected tab
            updatePlaceholder(button.dataset.tab);
        });
    });

    // Update search input placeholder based on selected tab
    function updatePlaceholder(tab) {
        const placeholders = {
            'all': 'Search all library resources...',
            'books': 'Search library catalog...',
            'archives': 'Search archives...',
            'journals': 'Search e-journals...'
        };
        searchInput.placeholder = placeholders[tab] || placeholders['all'];
    }

    // Handle search
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        const type = searchType.value;
        const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
        
        if (query) {
            performSearch(query, type, activeTab);
        }
    });

    // Handle enter key in search input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // Perform search (to be implemented based on backend requirements)
    function performSearch(query, type, tab) {
        console.log(`Searching for: ${query}`);
        console.log(`Search type: ${type}`);
        console.log(`Selected tab: ${tab}`);
        
        // Here you would typically make an API call to your backend
        // For now, we'll just show an alert
        alert(`Search functionality will be implemented here.\nQuery: ${query}\nType: ${type}\nTab: ${tab}`);
    }

    // Database card hover effects
    const databaseCards = document.querySelectorAll('.database-card');
    databaseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Tool card hover effects
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}); 