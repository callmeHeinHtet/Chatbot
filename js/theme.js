// Theme handling
const theme = {
    init() {
        this.setTheme(this.getCurrentTheme());
        this.addThemeToggleListener();
    },

    getCurrentTheme() {
        return localStorage.getItem('theme') || 'light';
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    },

    toggleTheme() {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        this.updateThemeIcon(newTheme === 'dark');
    },

    updateThemeIcon(isDark) {
        const themeIcon = document.querySelector('#toggle-theme i');
        if (themeIcon) {
            themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    },

    addThemeToggleListener() {
        const themeToggle = document.getElementById('toggle-theme');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
};

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    theme.init();
}); 