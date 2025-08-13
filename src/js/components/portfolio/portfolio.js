const webProducts = [
    {
        id: 'picture',
        name: 'picture',
        link: 'https://picture.sergeykarakoskin.ru/',
        img: 'https://storage.yandexcloud.net/mywebpageresources/picture.png',
        stack: 'Реализована frontend часть сайта.<br/><br/> Стек: JavaScript <br/><br/> Адаптация: Desktop версия',
        category: 'frontend',
    },
    {
        id: 'loan',
        name: 'loan',
        link: 'https://loan.sergeykarakoskin.ru/',
        img: 'https://storage.yandexcloud.net/mywebpageresources/loan.png',
        stack: 'Реализована frontend часть сайта.<br/><br/> Стек: JavaScript <br/><br/> Адаптация: Desktop версия',
        category: 'frontend',
    },
    {
        id: 'food',
        name: 'food',
        link: 'https://test.sergeykarakoskin.ru/',
        img: 'https://storage.yandexcloud.net/mywebpageresources/food.png',
        stack: 'Реализована frontend часть сайта.<br/><br/> Стек: JavaScript <br/><br/> Адаптация: Desktop версия',
        category: 'frontend',
    },
    {
        id: 'window',
        name: 'window',
        link: 'https://window.sergeykarakoskin.ru/',
        img: 'https://storage.yandexcloud.net/mywebpageresources/window.png',
        stack: 'Реализована frontend часть сайта.<br/><br/> Стек: JavaScript <br/><br/> Адаптация: Desktop версия',
        category: 'frontend',
    },
    {
        id: 'todo',
        name: 'Todo List',
        link: 'https://mb-pet-todo-list-nyrm.vercel.app/',
        img: 'https://storage.yandexcloud.net/mywebpageresources/todoList.jpg',
        stack: 'Вэб-приложение для формирования списка задач с возможнстью редактирования и удаления<br/><br/> Стек: TypeScript, React, NextJS.<br/><br/> Адаптация: под различные устройства<br/><br/> Развертывание: Vercel',
        category: 'frontend',
    },
    {
        id: 'kinopoisk',
        name: 'Movie Search',
        link: 'https://vk-movies-search.vercel.app/',
        img: 'https://storage.yandexcloud.net/mywebpageresources/movieSearch.jpg',
        stack: 'Вэб-приложение для просмотра данных о фильмах, поиска (с фильтрами) и добавление в избранное <br/><br/> Стек: TypeScript, React, NextJS, API Кинопоиск <br/><br/> Адаптация: под различные устройства.<br/><br/> Развертывание: Vercel',
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
