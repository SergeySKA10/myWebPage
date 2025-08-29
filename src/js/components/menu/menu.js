const stateMenu = {
    state: 'close',
    changeState(state) {
        this.state = state;
    },
};

export const menu = (buttonSelector, menuSelector, linksSelector) => {
    const btn = document.querySelector(buttonSelector);
    const menu = document.querySelector(menuSelector);
    const links = document.querySelectorAll(linksSelector);
    const body = document.querySelector('body');

    try {
        btn.addEventListener('click', () => {
            if (stateMenu.state === 'close') {
                stateMenu.changeState('open');
                btn.classList.add(`${buttonSelector.slice(1)}__active`);
                menu.classList.add(`${menuSelector.slice(1)}_active`);
                body.style.overflow = 'hidden';
                return;
            }

            if (stateMenu.state === 'open') {
                stateMenu.changeState('close');
                btn.classList.remove(`${buttonSelector.slice(1)}__active`);
                menu.classList.remove(`${menuSelector.slice(1)}_active`);
                body.style.overflow = '';
                return;
            }
        });

        links.forEach((link) => {
            link.addEventListener('click', (e) => {
                if (stateMenu.state === 'open') {
                    stateMenu.changeState('close');
                    btn.classList.remove(`${buttonSelector.slice(1)}__active`);
                    menu.classList.remove(`${menuSelector.slice(1)}_active`);
                    body.style.overflow = '';
                }
            });
        });
    } catch (error) {
        console.error(error);
    }
};
