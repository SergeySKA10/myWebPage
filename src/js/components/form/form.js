import { postData } from '../../services/postData';

export const form = (selectorForm, selectorBtn, cookies) => {
    const form = document.querySelector(selectorForm);
    const inputName = form.querySelector('[name="name"]');
    const textErrorName = form.querySelector('#inputName');
    const inputEmail = form.querySelector('[name="email"]');
    const textErrorEmail = form.querySelector('#inputEmail');
    const inputPhone = form.querySelector('[name="phone"]');
    const textErrorPhone = form.querySelector('#inputNumber');
    const inputMessage = form.querySelector('[name="message"]');
    const textErrorMessage = form.querySelector('#inputMessage');
    const btn = document.querySelector(selectorBtn);

    let validateName = false,
        validateEmail = false,
        validateMessage = false;

    const message = {
        loading: '../assets/icons/spinner/spinner.svg',
        error: 'Произошла ошибка при отправке данных. Пожалуйста, попробуйте позже, или отправте мне сообщение на мой email: karakoskinsergej@gmail.com',
        success: 'Спасибо за обращение. Я свяжусь с вами в ближайшее время',
    };

    const createSpinner = () => {
        const spinner = document.createElement('img');
        spinner.classList.add('spinner');
        spinner.setAttribute('src', message.loading);

        return spinner;
    };

    const createError = (e) => {
        const error = document.createElement('p');
        error.classList.add('error', 'montserrat-regular');
        error.textContent = `${message.error}. Status: ${e.message}`;

        return error;
    };

    const createSuccessMessage = () => {
        const msg = document.createElement('p');
        msg.classList.add('success');
        msg.textContent = `${message.success}`;

        return msg;
    };

    const clearMessage = (message, btn) => {
        setTimeout(() => {
            message.remove();
            btn.style.display = '';
        }, 6000);
    };

    // функция отправки формы:
    const formSend = () => {
        btn.style.display = 'none';

        if (!cookies.hasConsented()) {
            textErrorMessage.style.display = 'block';
            textErrorMessage.textContent =
                'Нет соглашения об обработке персональных данных. Согласитесь с политикой cookies';
            cookies.showCookiesWrapper();
            setTimeout(() => {
                textErrorMessage.style.display = 'none';
                textErrorMessage.textContent = '';
                btn.style.display = '';
            }, 3000);

            return;
        }

        if (!validateName || !validateEmail || !validateMessage) {
            textErrorMessage.style.display = 'block';
            textErrorMessage.textContent = 'Не верно заполнены поля';
            setTimeout(() => {
                textErrorMessage.style.display = 'none';
                textErrorMessage.textContent = '';
                btn.style.display = '';
            }, 3000);

            return;
        }

        const spinner = createSpinner();
        form.append(spinner);

        const formData = new FormData(form);
        const objData = {};
        formData.forEach((value, key) => {
            objData[key] = value;
        });

        postData(objData)
            .then(() => {
                const success = createSuccessMessage();
                spinner.remove();
                form.append(success);
                clearMessage(success, btn);
                form.reset();
                validateName = false;
                validateEmail = false;
                validateMessage = false;
            })
            .catch((e) => {
                const error = createError(e);
                spinner.remove();
                form.append(error);
                clearMessage(error, btn);
            });
    };

    // обработчик
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        formSend();
    });

    // валидация инпутов
    inputName.addEventListener('input', (e) => {
        if (!/^[a-zA-Zа-яА-Я ]+$/gi.test(e.target.value)) {
            validateName = false;
            e.target.value = e.target.value.slice(0, e.target.value.length - 1);
        } else {
            validateName = true;
        }

        if (e.target.value.length < 2 || e.target.value.length > 50) {
            validateName = false;
            inputName.style.cssText = `
                border: 4px solid red;
                box-shadow: 0px 10px 15px 0px rgba(255, 0, 0, 0.7);
            `;
            textErrorName.style.display = 'block';
            if (e.target.value.length === 0) {
                textErrorName.textContent = 'Поле обязательное для заполнения';
            } else {
                textErrorName.textContent =
                    'Количество символов должно быть > 2 и меньше 50';
            }
        } else {
            inputName.style = '';
            textErrorName.style.display = 'none';
            textErrorName.textContent = '';
            validateName = true;
        }
    });

    inputEmail.addEventListener('change', (e) => {
        if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                e.target.value
            )
        ) {
            validateEmail = false;
            inputEmail.style.cssText = `
                border: 4px solid red;
                box-shadow: 0px 10px 15px 0px rgba(255, 0, 0, 0.7);
            `;
            textErrorEmail.style.display = 'block';
            if (e.target.value.length === 0) {
                textErrorEmail.textContent = 'Поле обязательное для заполнения';
            } else {
                textErrorEmail.textContent =
                    'Неверно введен Email адрес. (test@mail.com)';
            }
        } else {
            validateEmail = true;
            inputEmail.style = '';
            textErrorEmail.style.display = 'none';
            textErrorEmail.textContent = '';
        }
    });

    inputPhone.addEventListener('input', (e) => {
        if (/\D/g.test(e.target.value)) {
            e.target.value = e.target.value.slice(0, e.target.value.length - 1);
            inputPhone.style.cssText = `
                border: 4px solid red;
                box-shadow: 0px 10px 15px 0px rgba(255, 0, 0, 0.7);
            `;
            textErrorPhone.style.display = 'block';
            textErrorPhone.textContent = 'Введено не число';

            setTimeout(() => {
                inputPhone.style = '';
                textErrorPhone.style.display = 'none';
                textErrorPhone.textContent = '';
            }, 3000);
        } else {
            inputPhone.style = '';
            textErrorPhone.style.display = 'none';
            textErrorPhone.textContent = '';
        }
    });

    inputMessage.addEventListener('input', (e) => {
        if (e.target.value.length < 10 || e.target.value.length > 500) {
            validateMessage = false;
            inputMessage.style.cssText = `
                border: 4px solid red;
                box-shadow: 0px 10px 15px 0px rgba(255, 0, 0, 0.7);
            `;
            textErrorMessage.style.display = 'block';
            if (e.target.value.length === 0) {
                textErrorMessage.textContent =
                    'Поле обязательное для заполнения';
            } else {
                textErrorMessage.textContent =
                    'Количество символов должно быть больше 10 и не превышать 500';
            }
        } else {
            validateMessage = true;
            inputMessage.style = '';
            textErrorMessage.style.display = 'none';
            textErrorMessage.textContent = '';
        }
    });
};
