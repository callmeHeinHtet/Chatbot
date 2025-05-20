// News page functionality
document.addEventListener('DOMContentLoaded', () => {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const newsItems = document.querySelectorAll('.news-item');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let currentPage = 1;
    const itemsPerPage = 4;

    // Category filtering
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.category;
            filterNews(category);
        });
    });

    function filterNews(category) {
        newsItems.forEach(item => {
            const itemCategory = item.querySelector('.news-category').textContent.toLowerCase();
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = '';
                item.classList.remove('filtered-out');
            } else {
                item.style.display = 'none';
                item.classList.add('filtered-out');
            }
        });

        // Reset pagination
        currentPage = 1;
        updateVisibility();
        checkLoadMoreButton();
    }

    // Load more functionality
    function updateVisibility() {
        const visibleItems = Array.from(newsItems).filter(item => !item.classList.contains('filtered-out'));
        
        visibleItems.forEach((item, index) => {
            if (index < currentPage * itemsPerPage) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function checkLoadMoreButton() {
        const visibleItems = Array.from(newsItems).filter(item => !item.classList.contains('filtered-out'));
        const hasMoreItems = visibleItems.length > currentPage * itemsPerPage;
        
        loadMoreBtn.style.display = hasMoreItems ? '' : 'none';
    }

    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        updateVisibility();
        checkLoadMoreButton();

        // Add loading animation
        const icon = loadMoreBtn.querySelector('i');
        icon.classList.add('fa-spin');
        
        // Remove loading animation after delay
        setTimeout(() => {
            icon.classList.remove('fa-spin');
        }, 500);
    });

    // Initialize visibility
    updateVisibility();
    checkLoadMoreButton();
}); 