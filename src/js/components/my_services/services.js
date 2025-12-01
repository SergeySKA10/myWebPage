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
            let image;

            switch (el.id) {
                case 'layout_services':
                    icon =
                        '<i class="fas fa-laptop-code fa-2x fa-flip" style="--fa-animation-duration: 3s;"></i>';
                    image = `
                        <div class="services__icon">
                            <div class="layout-animation">
                                <div class="layout-block montserrat-bold"><i class="fa-solid fa-2x fa-computer"></i></div>
                                <div class="layout-block montserrat-bold"><i class="fa-brands fa-2x fa-html5"></i></div>
                                <div class="layout-block montserrat-bold"><i class="fa-brands fa-2x fa-css"></i></div>
                                <div class="layout-block montserrat-bold"><i class="fa-brands fa-2x fa-js"></i></div>
                            </div>
                        </div>
                    `;
                    break;
                case 'frontend_services':
                    icon = '<i class="fab fa-react fa-2x fa-spin"></i>';
                    image = `
                        <div class="services__icon">
                            <div class="frontend-animation">
                                <div class="frontend-input"><div class="frontend-input_circle"></div></div>
                                <div class="frontend-block-left"><div class="frontend-block-one"></div><div class="frontend-block-two"><i class="fa-solid fa-code fa-spin" style="color: #f8f9fc;"></i></div></div>
                                <div class="frontend-block-right"><div class="frontend-block-one"></div><div class="frontend-block-two"><i class="fa-solid fa-code fa-spin" style="color: #f8f9fc;"></i></div></div>
                            </div>
                        </div>
                    `;
                    break;
                case 'fullstack_services':
                    icon =
                        '<i class="fa-brands fa-java fa-2x fa-bounce style="--fa-animation-duration: 3s;""></i>';
                    image = `
                        <div class="services__icon">
                            <div class="fullstack-animation">
                                <div class="stack-layer"></div>
                                <div class="stack-layer"><i class="fa-solid fa-2x fa-database"></i></div>
                                <div class="stack-layer"></div>
                                <div class="connection-line"></div>
                                <div class="connection-line"></div>
                                <div class="connection-line"></div>
                            </div>
                        </div>
                    `;
                    break;
                default:
                    throw new Error('id not found (services component render)');
            }

            article.innerHTML = `
                ${image}
                <div class="services__descr" aria-label="service-description">
                    <div>
                        <header>
                            ${icon}
                            <h3 class="services__subheader">${el.header}</h3>
                        </header>
                        <div class="services__opportunitys">
                            ${opportunitys}
                        </div>
                    </div>
                </div>
                <div class="services__btn">
                    <button id="write" class="btn btn__about" role="open dialog"><a href="#">Написать</a></button>
                </div>
            `;
            wrapper.append(article);
        });
    } catch (e) {
        console.log(e);
    }
};
