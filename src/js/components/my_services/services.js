import { services } from '../../data/data';

export const myServices = (wrapperSelector) => {
    const wrapper = document.querySelector(wrapperSelector);
    try {
        services.forEach((el) => {
            const article = document.createElement('article');
            article.classList.add('services__card');
            article.setAttribute('data-aos', 'flip-up');
            let opportunitys = '';
            el.opportunitys.forEach((el) => {
                opportunitys += `<p class="montserrat-regular">${el}</p>`;
            });
            article.innerHTML = `
            <img class="services__img" src=${el.src} alt=${el.header} loading="lazy">
            <div class="services__descr">
                <div>
                    <h3 class="services__subheader">${el.header}</h3>
                    <div class="services__opportunitys">
                        ${opportunitys}
                    </div>
                </div>
                <div class="services__btn">
                    <button class="btn btn__about"><a href="#">Написать</a></button>
                </div>
            </div>
        `;
            wrapper.append(article);
        });
    } catch (e) {
        console.log(e);
    }
};
