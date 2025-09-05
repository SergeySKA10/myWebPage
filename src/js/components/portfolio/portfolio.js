import { webProducts } from '../../data/data';

export const portfolio = () => {
    const portfolioComponents = [];

    webProducts.forEach((el, i) => {
        const a = document.createElement('a');
        a.classList.add('portfolio__page');
        a.setAttribute('href', el.link);
        a.setAttribute('data-category', el.category);
        a.setAttribute('target', '_blank');

        if (i % 3 === 0) {
            a.setAttribute('data-aos', 'flip-left');
        } else if (i % 3 === 1) {
            a.setAttribute('data-aos', 'fade-up');
        } else {
            a.setAttribute('data-aos', 'flip-right');
        }

        a.setAttribute('data-aos-duration', '1200');
        a.innerHTML = `
            <picture>
                <source srcset=${el.img[0]} type="image/webp">
                <source srcset=${el.img[1]} type="image/jpeg">
                <img class="portfolio__page_img" src= ${el.img[1]} alt="web site" loading="lazy"/>
            </picture>
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
