const certificates = [
    {
        id: 'JavaScript',
        src: 'https://github.com/SergeySKA10/myWebPage/blob/img/img/backgrounds_portfolio/frontend/picture.png?raw=true',
        alt: 'certificate JS/React',
    },
    {
        id: 'TypeScript',
        src: 'https://github.com/SergeySKA10/myWebPage/blob/img/img/backgrounds_portfolio/frontend/picture.png?raw=true',
        alt: 'certificate TS/React',
    },
];

export const education = (wrapperSelector) => {
    const wrapper = document.querySelector(wrapperSelector);

    certificates.forEach((el) => {
        const div = document.createElement('div');
        div.classList.add('portfolio__page');
        const img = document.createElement('img');
        img.setAttribute('src', el.src);
        img.setAttribute('alt', el.alt);
        div.append(img);
        wrapper.append(div);
    });
};
