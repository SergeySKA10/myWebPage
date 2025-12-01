import { state } from '../state/state';

export const menu = (buttonSelector, menuSelector, linksSelector) => {
    const btn = document.querySelector(buttonSelector);
    const menu = document.querySelector(menuSelector);
    const links = document.querySelectorAll(linksSelector);
    const body = document.querySelector('body');

    const dispatchStateChange = (stateValue) => {
        document.dispatchEvent(
            new CustomEvent('stateChanged', {
                detail: { type: 'menu', state: stateValue },
            })
        );
    };

    const openMenu = () => {
        state.changeStateMenu('open');
        btn.classList.add(`${buttonSelector.slice(1)}__active`);
        menu.classList.add(`${menuSelector.slice(1)}_active`);
        menu.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
        body.style.overflow = 'hidden';

        dispatchStateChange('open');
    };

    const closeMenu = () => {
        state.changeStateMenu('close');
        btn.classList.remove(`${buttonSelector.slice(1)}__active`);
        menu.classList.remove(`${menuSelector.slice(1)}_active`);
        menu.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';

        dispatchStateChange('close');
    };

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && state.stateMenu === 'open') {
            closeMenu();
        }
    });

    try {
        btn.addEventListener('click', () => {
            if (state.stateMenu === 'close') {
                openMenu();
                return;
            }

            if (state.stateMenu === 'open') {
                closeMenu();
                return;
            }
        });

        links.forEach((link) => {
            link.addEventListener('click', (e) => {
                if (state.stateMenu === 'open') {
                    closeMenu();
                }
            });
        });
    } catch (error) {
        console.error(error);
    }
};
