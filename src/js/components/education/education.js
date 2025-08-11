const certificates = [
    {
        id: 'JavaScript',
        src: 'https://storage.yandexcloud.net/mywebpageresources/JS_React.jpg',
        alt: 'certificate JS/React',
    },
    {
        id: 'TypeScript',
        src: 'https://storage.yandexcloud.net/mywebpageresources/JS_TS.jpg',
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
