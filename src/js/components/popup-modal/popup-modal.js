import { state } from '../state/state';

export const popupModal = (popupSelector, btnsSelector, closeSelector) => {
    const popup = document.querySelector(popupSelector);
    const btns = document.querySelectorAll(btnsSelector);
    const body = document.querySelector('body');
    const closeElem = document.querySelector(closeSelector);

    btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            if (state.stateModal === 'close') {
                popup.classList.add('popup-modal_active');
                body.style.overflow = 'hidden';
                state.changeStateModal('open');
            }
        });
    });

    closeElem.addEventListener('click', (e) => {
        e.preventDefault();

        if (state.stateModal === 'open') {
            popup.classList.remove('popup-modal_active');
            body.style.overflow = '';
            state.changeStateModal('close');
        }
    });
};
