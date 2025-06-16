import { tabs } from './components/tabs/tabs';
import { technologies } from './components/technologies/technologies';
import { form } from './components/form/form';

window.addEventListener('DOMContentLoaded', () => {
    tabs('.portfolio__tabs_li', '.portfolio__pages');
    technologies('#using', '#learning', '#otherTechnologies');
    form('#form', '#btn_submit');
});
