export const state = {
    stateMenu: 'close',
    stateModal: 'close',
    changeStateMenu(state) {
        this.stateMenu = state;
    },
    changeStateModal(state) {
        this.stateModal = state;
    },
};
