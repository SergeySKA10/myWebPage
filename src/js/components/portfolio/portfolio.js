const webProducts = [
    {
        id: 'picture',
        name: 'picture',
        link: 'https://picture.sergeykarakoskin.ru/',
        img: 'https://storage.yandexcloud.net/mywebpageresources/picture.png',
        stack: 'Реализована frontend часть сайта c использованием JavaScript. (Desktop версия)',
        category: 'frontend',
    },
    {
        id: 'loan',
        name: 'loan',
        link: 'https://loan.sergeykarakoskin.ru/',
        img: 'https://storage.yandexcloud.net/mywebpageresources/loan.png',
        stack: 'Реализована frontend часть сайта c использованием JavaScript. (Desktop версия)',
        category: 'frontend',
    },
    {
        id: 'food',
        name: 'food',
        link: 'https://test.sergeykarakoskin.ru/',
        img: 'https://storage.yandexcloud.net/mywebpageresources/food.png',
        stack: 'Реализована frontend часть сайта c использованием JavaScript. (Desktop версия)',
        category: 'frontend',
    },
    {
        id: 'window',
        name: 'window',
        link: 'https://window.sergeykarakoskin.ru/',
        img: 'https://storage.yandexcloud.net/mywebpageresources/window.png',
        stack: 'Реализована frontend часть сайта c использованием JavaScript. (Desktop версия)',
        category: 'frontend',
    },
];

export const portfolio = () => {
    const portfolioComponents = [];

    webProducts.forEach((el) => {
        const a = document.createElement('a');
        a.classList.add('portfolio__page');
        a.setAttribute('href', el.link);
        a.setAttribute('data-category', el.category);
        a.setAttribute('target', '_blank');
        a.style.background = `url(${el.img} center center/cover no-repeat)`;
        a.innerHTML = `
            <img class="portfolio__page_img" src= ${el.img} alt="web site"/>
            <div class="portfolio__page_bg">
                <p class="portfolio__page_descr portfolio__page_descr-header montserrat-regular">
                    ${el.name}
                </p>
                <p class="portfolio__page_descr montserrat-regular">
                    ${el.stack}
                </p>
            </div>
        `;

        portfolioComponents.push(a);
    });

    return portfolioComponents;
};
