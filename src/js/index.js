import { tabs } from './components/tabs/tabs';
import { technologies } from './components/technologies/technologies';
import { form } from './components/form/form';
import CookieConsent from './components/cookies/cookies';

const cookies = new CookieConsent({
    background: 'CadetBlue',
    linkColor: '#000000',
    btnTextColor: '#000000',
    text: 'Нажимая «Принять файлы cookie», вы соглашаетесь, c хранением файлов cookie на вашем устройстве',
});

window.addEventListener('DOMContentLoaded', () => {
    cookies.render();
    tabs('.portfolio__tabs_li', '.portfolio__pages');
    technologies('#using', '#learning', '#otherTechnologies');
    form('#form', '#btn_submit', cookies);
});
