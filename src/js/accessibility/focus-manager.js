export class FocusManager {
    constructor() {
        this.previousActiveElement = null;
        this.isTrapped = false;
        this.focusableElements = [];

        this.init();
    }

    init() {
        this.setupGlobalListeners();
    }

    setupGlobalListeners() {
        // Слушаем изменения состояния модалки и меню
        document.addEventListener('stateChanged', (e) => {
            if (e.detail.type === 'modal' && e.detail.state === 'open') {
                this.trapFocus('#modal');
            } else if (
                e.detail.type === 'modal' &&
                e.detail.state === 'close'
            ) {
                this.releaseFocus();
            } else if (e.detail.type === 'menu' && e.detail.state === 'open') {
                this.trapFocus('.header__menu');
            } else if (e.detail.type === 'menu' && e.detail.state === 'close') {
                this.releaseFocus();
            }
        });
    }

    trapFocus(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        this.previousActiveElement = document.activeElement;
        this.isTrapped = true;

        // Находим все фокусируемые элементы внутри контейнера
        this.focusableElements = this.getFocusableElements(container);

        if (this.focusableElements.length === 0) return;

        // Фокус на первый элемент
        this.focusableElements[0].focus();

        // Добавляем обработчик для Tab/Shift+Tab
        container.addEventListener('keydown', this.handleTabKey.bind(this));

        // Скрываем от скринридеров остальной контент
        this.hideContentFromScreenReaders();
    }

    releaseFocus() {
        this.isTrapped = false;

        // Удаляем обработчики
        const containers = document.querySelectorAll('#modal, .header__menu');
        containers.forEach((container) => {
            container.removeEventListener(
                'keydown',
                this.handleTabKey.bind(this)
            );
        });

        // Возвращаем фокус
        if (
            this.previousActiveElement &&
            document.body.contains(this.previousActiveElement)
        ) {
            this.previousActiveElement.focus();
        }

        // Восстанавливаем доступность контента
        this.restoreContentForScreenReaders();
    }

    handleTabKey(e) {
        if (e.key !== 'Tab' || !this.isTrapped) return;

        if (this.focusableElements.length === 0) return;

        const firstElement = this.focusableElements[0];
        const lastElement =
            this.focusableElements[this.focusableElements.length - 1];

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    getFocusableElements(container) {
        const focusableSelectors = [
            'button:not([disabled])',
            '[href]',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ];

        return Array.from(
            container.querySelectorAll(focusableSelectors.join(','))
        )
            .filter((element) => {
                return (
                    element.offsetWidth > 0 ||
                    element.offsetHeight > 0 ||
                    element === document.activeElement
                );
            })
            .sort((a, b) => {
                // Сортируем по tabindex
                const aIndex = parseInt(a.getAttribute('tabindex') || 0);
                const bIndex = parseInt(b.getAttribute('tabindex') || 0);
                return aIndex - bIndex;
            });
    }

    hideContentFromScreenReaders() {
        // Находим основной контент (всё кроме активного модального/меню)
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.setAttribute('aria-hidden', 'true');
        }
    }

    restoreContentForScreenReaders() {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.setAttribute('aria-hidden', 'false');
        }
    }

    // Метод для принудительного обновления фокусируемых элементов
    updateFocusableElements(containerSelector) {
        if (this.isTrapped) {
            const container = document.querySelector(containerSelector);
            if (container) {
                this.focusableElements = this.getFocusableElements(container);
            }
        }
    }
}
