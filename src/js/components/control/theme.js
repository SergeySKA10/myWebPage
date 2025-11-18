export class ThemeManager {
    constructor() {
        this.themes = {
            light: 'light',
            dark: 'dark',
        };
        this.currentTheme = this.getSavedTheme() || this.getSystemTheme();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.createThemeToggle();
        this.setupSystemThemeListener();
    }

    getSavedTheme() {
        return localStorage.getItem('theme');
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? this.themes.dark
            : this.themes.light;
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);

        // Обновляем иконку
        this.updateThemeIcon(theme);
    }

    toggleTheme() {
        const newTheme =
            this.currentTheme === this.themes.light
                ? this.themes.dark
                : this.themes.light;
        this.applyTheme(newTheme);
    }

    createThemeToggle() {
        const button = document.querySelector('.control__btn');
        button.addEventListener('click', () => this.toggleTheme());
    }

    updateThemeIcon(theme) {
        const blockIcon = document.querySelector('.control__theme');
        const dark = blockIcon.querySelector('.control__icon-dark');
        const light = blockIcon.querySelector('.control__icon-light');
        const btn = blockIcon.querySelector('.control__btn');
        const control = btn.querySelector('div');

        if (blockIcon && dark && light) {
            if (theme === 'dark') {
                dark.style.display = 'block';
                light.style.display = 'none';
                btn.style.backgroundColor = 'rgba(71, 85, 105, 0.9)';
                control.style.left = '28px';
            } else {
                dark.style.display = 'none';
                light.style.display = 'block';
                btn.style.backgroundColor = 'transparent';
                control.style.left = '0px';
            }
        } else {
            console.error('theme icon is not defined');
        }
    }

    setupSystemThemeListener() {
        // Меняем тему при изменении системных настроек (только если пользователь не выбирал вручную)
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.applyTheme(
                        e.matches ? this.themes.dark : this.themes.light
                    );
                }
            });
    }
}
