'use strict';
export default class CookieConsent {
    constructor({
        height = '80px',
        background = 'rgb(255, 183, 0)',
        link = 'https://2gdpr.com/cookies',
        linkColor = '#fff',
        text = 'Я даю согласие на использование cookies',
        textColor = 'black',
        btnBorder = 'black',
        btnTextColor = '#fff',
        confirm = 'Accept',
        cancel = 'Cancel',
        nameConsent = 'site_consent',
        valueCookies = true,
        expires,
    } = {}) {
        this.popup = 'popup';
        this.btnConfirm = 'data-confirm';
        this.btnCancel = 'data-cancel';
        this.consentPropertyType = nameConsent;
        this.valueCookies = valueCookies;
        this.expiresCookies = expires;
        this.linkConsentCookies = link;
        this.textConsent = text;
        this.linkColor = linkColor;
        this.textConsentColor = textColor;
        this.heightblock = height;
        this.background = background;
        this.borderBtnColor = btnBorder;
        this.btnTextColor = btnTextColor;
        this.btnConfirmText = confirm;
        this.btnCancelText = cancel;
    }

    // создание блока Cookies
    create = () => {
        const windowCookies = document.createElement('div');
        windowCookies.classList.add(this.popup);
        windowCookies.style.cssText = `
			position: fixed;
            z-index: 10000;
			bottom: -100%;
			width: 100%;
			min-height: ${this.heightblock};
            padding: 10px;
			background-color: ${this.background};
			display: flex;
			justify-content: center;
			align-items: center;
			color: ${this.textConsentColor};
			transition: 0.5s all;
		`;

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapperCookie');
        wrapper.style.cssText = `
            display: flex;
            justify-content: center;
		 	align-items: center;
            gap: 30px;
        `;

        wrapper.innerHTML = `
            <p class="wrapperCookie__text" style="text-align: center">${this.textConsent}</p>
            <div class="wrapperCookie__btn" style="display: flex; gap: 10px ">
                <button ${this.btnConfirm} class="btn_cookies">${this.btnConfirmText}</button>
                <button ${this.btnCancel} class="btn_cookies">${this.btnCancelText}</button>
            </div>
            <a class="link_cookies" href="${this.linkConsentCookies}">Политика в отношении файлов cookie</a>
        `;

        if (window.innerWidth < 769) {
            wrapper.style.minHeight = '150px';
            wrapper.style.flexDirection = 'column';
            wrapper.style.gap = '10px';
            wrapper.style.justifyContent = 'space-around';
        }

        windowCookies.append(wrapper);

        document.querySelector('body').append(windowCookies);
    };

    // получение ключа из Cookies
    getItem = (key) => {
        const cookies = document.cookie
            .split(';')
            .map((cookie) => cookie.split('='))
            .reduce(
                (acc, [key, value]) => ({ ...acc, [key.trim()]: value }),
                {}
            );
        return cookies[key];
    };

    // запись ключа и значения в Cookies
    setItem = (key, value) => {
        document.cookie = `${key}=${value}; expires = ${this.expiresCookies}`;
    };

    // проверка наличия записи ключа в Cookies
    hasConsented = () =>
        this.getItem(this.consentPropertyType) === `${this.valueCookies}`
            ? true
            : false;

    // метод для смены статуса согласия пользователя и загрузки метрик
    changeStatus = (prop) => {
        this.setItem(this.consentPropertyType, prop);

        // if (this.hasConsented()) {
        //     myScripts(); // загрузка метрик
        // }
    };

    // обработчики на кнопки для смены статуса
    bindTriggers = (popup, btn) => {
        btn.forEach((el) => {
            el.addEventListener('click', () => {
                if (el.getAttribute(this.btnConfirm) == '') {
                    this.changeStatus(this.valueCookies);
                    popup.style.bottom = '-100%';
                }
                if (el.getAttribute(this.btnCancel) == '') {
                    this.changeStatus(false);
                    popup.style.bottom = '-100%';
                }
            });

            el.addEventListener('mouseenter', (e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.border = 'none';
            });

            el.addEventListener('mouseleave', (e) => {
                e.target.style.backgroundColor = 'inherit';
                e.target.style.border = `2px solid ${this.borderBtnColor}`;
            });
        });
    };

    showCookiesWrapper = () => {
        const popup = document.querySelector(`.${this.popup}`);
        popup.style.bottom = 0;
    };

    // инициализация cookie
    render = () => {
        this.create();
        const popup = document.querySelector(`.${this.popup}`),
            btnCookies = document.querySelectorAll('.btn_cookies'),
            linkCookies = document.querySelector('.link_cookies');

        btnCookies.forEach((btn) => {
            btn.style.cssText = `
                transition: all 0.3s;
				width: 150px;
				height: 50px;
				text-align: center;
				color: ${this.btnTextColor};
				border: 2px solid ${this.borderBtnColor};
				background-color: inherit;
                border-radius: 10px;
                cursor: pointer;
			`;
        });

        linkCookies.style.cssText = `
            transition: all 0.3s;
			width: 250px;
			height: 50px;
			text-align: center;
			color: ${this.linkColor};
			background-color: transparent;
		`;

        linkCookies.addEventListener('mouseenter', (e) => {
            e.target.style.color = '#ffffff';
        });

        linkCookies.addEventListener('mouseleave', (e) => {
            e.target.style.color = this.linkColor;
        });

        try {
            if (this.hasConsented()) {
                // myScripts();
            } else {
                popup.style.bottom = 0;
            }
            this.bindTriggers(popup, btnCookies);
        } catch (e) {
            console.error(e);
        }
    };
}
