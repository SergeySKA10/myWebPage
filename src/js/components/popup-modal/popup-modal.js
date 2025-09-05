import { state } from '../state/state';

export const popupModal = (
    popupSelector,
    btnsSelector,
    closeSelector,
    formSelector
) => {
    const popup = document.querySelector(popupSelector);
    const btns = document.querySelectorAll(btnsSelector);
    const body = document.querySelector('body');
    const closeElem = document.querySelector(closeSelector);
    const form = document.querySelector(formSelector);

    const openModal = () => {
        popup.classList.add('popup-modal_active');
        body.style.overflow = 'hidden';
        state.changeStateModal('open');
    };

    const closeModal = () => {
        popup.classList.remove('popup-modal_active');
        body.style.overflow = '';
        state.changeStateModal('close');
        form.reset();
    };

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && state.stateModal === 'open') {
            closeModal();
        }
    });

    btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            if (state.stateModal === 'close') {
                openModal();
            }
        });
    });

    closeElem.addEventListener('click', (e) => {
        e.preventDefault();

        if (state.stateModal === 'open') {
            closeModal();
        }
    });
};
