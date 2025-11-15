import { AnimatedBackground } from './components/animation/background';
import { AnimationManager } from './components/animation/animation-manager';
import { header } from './components/header/header';
import { menu } from './components/menu/menu';
import { tabs } from './components/tabs/tabs';
import { technologies } from './components/technologies/technologies';
import { form } from './components/form/form';
import { education } from './components/education/education';
import { myServices } from './components/my_services/services';
import { popupModal } from './components/popup-modal/popup-modal';
import CookieConsent from './components/cookies/cookies';

const cookies = new CookieConsent({
    background: '#475569',
    linkColor: '#ffffff',
    btnTextColor: '#ffffff',
    text: 'Нажимая «Принять файлы cookie», вы соглашаетесь, c хранением файлов cookie на вашем устройстве',
    link: 'https://sergeykarakoskin.ru/policyCookies.html',
});

window.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: false,
        duration: 800,
        offset: 70,
    });
    cookies.render();

    const introSection = document.querySelector('.introducing');
    let connectTreeInstance = null;

    if (introSection) {
        connectTreeInstance = new AnimatedBackground(introSection);
    }

    // Инициализируем менеджер анимаций
    new AnimationManager().init();

    header('#greetings', '#header', '#stack');
    menu('.burger', '.header__menu', '.header__menu-link');
    tabs('.portfolio__tabs_li', '.portfolio__pages');
    technologies('#using', '#learning');
    education('.education__article .portfolio__pages');
    myServices('.services__wrapper');
    form('#form', '#btn_submit', cookies);
    form('#popup-form', '#btn_submit-popup', cookies);
    popupModal('#modal', '#write', '#close', '#popup-form');

    AOS.refresh();
});
