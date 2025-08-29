import { certificates } from '../../data/data';

export const education = (wrapperSelector) => {
    const wrapper = document.querySelector(wrapperSelector);

    certificates.forEach((el) => {
        const div = document.createElement('div');
        div.classList.add('portfolio__page');
        div.setAttribute('data-aos', 'flip-up');
        div.setAttribute('data-aos-duration', '1500');
        const img = document.createElement('img');
        img.setAttribute('src', el.src);
        img.setAttribute('alt', el.alt);
        div.append(img);
        wrapper.append(div);
    });
};
