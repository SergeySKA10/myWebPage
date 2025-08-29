import { header } from './components/header/header';
import { menu } from './components/menu/menu';
import { tabs } from './components/tabs/tabs';
import { technologies } from './components/technologies/technologies';
import { form } from './components/form/form';
import { education } from './components/education/education';
import { myServices } from './components/my_services/services';
import CookieConsent from './components/cookies/cookies';

const cookies = new CookieConsent({
    background: 'CadetBlue',
    linkColor: '#000000',
    btnTextColor: '#000000',
    text: 'Нажимая «Принять файлы cookie», вы соглашаетесь, c хранением файлов cookie на вашем устройстве',
    link: 'https://sergeykarakoskin.ru/policyCookies.html',
});

window.addEventListener('DOMContentLoaded', () => {
    cookies.render();
    header('#greetings', '#header', '#stack');
    menu('.burger', '.header__menu', '.header__menu-link');
    tabs('.portfolio__tabs_li', '.portfolio__pages');
    technologies('#using', '#learning');
    education('.education__article .portfolio__pages');
    myServices('.services__wrapper');
    form('#form', '#btn_submit', cookies);
});
