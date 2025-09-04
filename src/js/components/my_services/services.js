import { services } from '../../data/data';

export const myServices = (wrapperSelector) => {
    const wrapper = document.querySelector(wrapperSelector);
    try {
        services.forEach((el) => {
            const article = document.createElement('article');
            article.classList.add('services__card');
            article.setAttribute('data-aos', 'fade-up');
            article.setAttribute('data-aos-duration', '1500');

            let opportunitys = '';
            el.opportunitys.forEach((el) => {
                opportunitys += `<p class="montserrat-regular" style="display:flex; gap: 5px; align-items: center"><i class="fas fa-check-circle"></i> ${el}</p>`;
            });

            let icon;

            switch (el.id) {
                case 'layout_services':
                    icon =
                        '<i class="fas fa-laptop-code fa-2x fa-flip" style="--fa-animation-duration: 3s;"></i>';
                    break;
                case 'frontend_services':
                    icon = '<i class="fab fa-react fa-2x fa-spin"></i>';
                    break;
                case 'fullstack_services':
                    icon =
                        '<i class="fas fa-sitemap fa-2x fa-fade" style="--fa-animation-duration: 1s;"></i>';
                    break;
                default:
                    throw new Error('id not found (services component render)');
            }

            article.innerHTML = `
                <img class="services__img" src=${el.src} alt=${el.header} loading="lazy">
                <div class="services__descr">
                    <div>
                        <header>
                            ${icon}
                            <h3 class="services__subheader">${el.header}</h3>
                        </header>
                        <div class="services__opportunitys">
                            ${opportunitys}
                        </div>
                    </div>
                    <div class="services__btn">
                        <button id="write" class="btn btn__about"><a href="#">Написать</a></button>
                    </div>
                </div>
            `;
            wrapper.append(article);
        });
    } catch (e) {
        console.log(e);
    }
};
