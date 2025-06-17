/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/form/form.js":
/*!****************************************!*\
  !*** ./src/js/components/form/form.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   form: () => (/* binding */ form)
/* harmony export */ });
const form = (selectorForm, selectorBtn) => {
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
    success: 'Спасибо за обращение. Я свяжусь с вами в ближайшее время'
  };
  const createSpinner = () => {
    const spinner = document.createElement('img');
    spinner.style.cssText = `
            display: flex;
            width: 40px;
            height: 40px;
            justify-content: center;
            align-items: center;
        `;
    spinner.setAttribute('src', message.loading);
    return spinner;
  };
  const createError = () => {
    const error = document.createElement('p');
    error.classList.add('montserrat-regular');
    error.style.cssText = `
                display: block;
                text-align: center;
                color: red;
                font-size: 14px;
                padding: 2px 10px;
            `;
    error.textContent = `${message.error}`;
    return error;
  };
  const createSuccessMessage = () => {
    const msg = document.createElement('p');
    msg.style.cssText = `
            display: block;
            text-align: center;
            color: green;
            font-size: 14px;
            padding: 2px 10px;
        `;
    msg.textContent = `${message.success}`;
    return msg;
  };
  const clearMessage = (message, btn) => {
    setTimeout(() => {
      message.remove();
      btn.style.display = '';
    }, 4000);
  };
  const postData = (data, spinner) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      // throw new Error('');
      console.log(data);
      const success = createSuccessMessage();
      spinner.remove();
      form.append(success);
      clearMessage(success, btn);
      form.reset();
    } catch (e) {
      const error = createError(e);
      spinner.remove();
      form.append(error);
      clearMessage(error, btn);
    }
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    btn.style.display = 'none';
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
    postData(objData, spinner);
  });

  // валидация инпутов

  inputName.addEventListener('input', e => {
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
        textErrorName.textContent = 'Количество символов должно быть > 2 и меньше 50';
      }
    } else {
      inputName.style = '';
      textErrorName.style.display = 'none';
      textErrorName.textContent = '';
      validateName = true;
    }
  });
  inputEmail.addEventListener('change', e => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value)) {
      validateEmail = false;
      inputEmail.style.cssText = `
                border: 4px solid red;
                box-shadow: 0px 10px 15px 0px rgba(255, 0, 0, 0.7);
            `;
      textErrorEmail.style.display = 'block';
      if (e.target.value.length === 0) {
        textErrorEmail.textContent = 'Поле обязательное для заполнения';
      } else {
        textErrorEmail.textContent = 'Неверно введен Email адрес. (test@mail.com)';
      }
    } else {
      validateEmail = true;
      inputEmail.style = '';
      textErrorEmail.style.display = 'none';
      textErrorEmail.textContent = '';
    }
  });
  inputPhone.addEventListener('input', e => {
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
  inputMessage.addEventListener('input', e => {
    if (e.target.value.length < 10 || e.target.value.length > 500) {
      validateMessage = false;
      inputMessage.style.cssText = `
                border: 4px solid red;
                box-shadow: 0px 10px 15px 0px rgba(255, 0, 0, 0.7);
            `;
      textErrorMessage.style.display = 'block';
      if (e.target.value.length === 0) {
        textErrorMessage.textContent = 'Поле обязательное для заполнения';
      } else {
        textErrorMessage.textContent = 'Количество символов должно быть больше 10 и не превышать 500';
      }
    } else {
      validateMessage = true;
      inputMessage.style = '';
      textErrorMessage.style.display = 'none';
      textErrorMessage.textContent = '';
    }
  });
};

/***/ }),

/***/ "./src/js/components/portfolio/portfolio.js":
/*!**************************************************!*\
  !*** ./src/js/components/portfolio/portfolio.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   portfolio: () => (/* binding */ portfolio)
/* harmony export */ });
const webProducts = [{
  id: 'picture',
  name: 'picture',
  link: 'https://picture.sergeykarakoskin.ru/',
  img: 'https://github.com/SergeySKA10/myWebPage/blob/img/img/backgrounds_portfolio/frontend/picture.png?raw=true',
  stack: 'JavaScript (Desktop)',
  category: 'frontend'
}, {
  id: 'loan',
  name: 'loan',
  link: 'https://loan.sergeykarakoskin.ru/',
  img: 'https://github.com/SergeySKA10/myWebPage/blob/img/img/backgrounds_portfolio/frontend/loan.png?raw=true',
  stack: 'JavaScript (Desktop)',
  category: 'frontend'
}, {
  id: 'food',
  name: 'food',
  link: 'https://test.sergeykarakoskin.ru/',
  img: 'https://github.com/SergeySKA10/myWebPage/blob/img/img/backgrounds_portfolio/frontend/food.png?raw=true',
  stack: 'JavaScript (Desktop)',
  category: 'frontend'
}, {
  id: 'window',
  name: 'window',
  link: 'https://window.sergeykarakoskin.ru/',
  img: 'https://github.com/SergeySKA10/myWebPage/blob/img/img/backgrounds_portfolio/frontend/window.png?raw=true',
  stack: 'JavaScript (Desktop)',
  category: 'frontend'
}];
const portfolio = () => {
  const portfolioComponents = [];
  webProducts.forEach(el => {
    const a = document.createElement('a');
    a.classList.add('portfolio__page');
    a.setAttribute('href', el.link);
    a.setAttribute('data-category', el.category);
    a.setAttribute('target', '_blank');
    a.style.background = `url(${el.img} center center/cover no-repeat)`;
    a.innerHTML = `
            <img class="portfolio__page_img" src= ${el.img} alt="web site"/>
            <div class="portfolio__page_bg">
                <p class="portfolio__page_descr montserrat-regular">
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

/***/ }),

/***/ "./src/js/components/tabs/tabs.js":
/*!****************************************!*\
  !*** ./src/js/components/tabs/tabs.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tabs: () => (/* binding */ tabs)
/* harmony export */ });
/* harmony import */ var _portfolio_portfolio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../portfolio/portfolio */ "./src/js/components/portfolio/portfolio.js");

const tabs = (selectorTabs, selectorWrapper) => {
  const tabs = document.querySelectorAll(selectorTabs);
  const portfolioBlock = document.querySelector(selectorWrapper);
  const portfolioComponents = (0,_portfolio_portfolio__WEBPACK_IMPORTED_MODULE_0__.portfolio)();
  let index = 0;
  portfolioBlock.append(...portfolioComponents);
  const cacheFilterProjects = {
    all: portfolioComponents
  };
  const handlerFilterProjects = (filter, parentBlock, components) => {
    parentBlock.innerHTML = '';
    if (cacheFilterProjects[filter]) {
      parentBlock.append(...cacheFilterProjects[filter]);
    } else {
      const projects = components.filter(el => el.getAttribute('data-category') === filter);
      cacheFilterProjects[filter] = projects;
      parentBlock.append(...projects);
    }
  };
  tabs.forEach(tab => {
    tab.addEventListener('click', e => {
      if (index === +e.target.getAttribute('data-index')) {
        return;
      }
      tabs[index].classList.remove('tab_active');
      index = +e.target.getAttribute('data-index');
      tabs[index].classList.add('tab_active');
      handlerFilterProjects(e.target.textContent.toLowerCase(), portfolioBlock, portfolioComponents);
    });
  });
};

/***/ }),

/***/ "./src/js/components/technologies/technologies.js":
/*!********************************************************!*\
  !*** ./src/js/components/technologies/technologies.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   technologies: () => (/* binding */ technologies)
/* harmony export */ });
const skills = {
  using: [{
    id: 'HTML5',
    name: 'HTML5',
    linkIcons: 'https://img.icons8.com/?size=80&id=D2Hi2VkJSi33&format=png'
  }, {
    id: 'CSS3',
    name: 'CSS3',
    linkIcons: 'https://img.icons8.com/?size=80&id=YjeKwnSQIBUq&format=png'
  }, {
    id: 'SASS',
    name: 'SASS',
    linkIcons: 'https://img.icons8.com/?size=48&id=QBqFNfPPB2Kx&format=png'
  }, {
    id: 'Bootstrap',
    name: 'Bootstrap',
    linkIcons: 'https://img.icons8.com/?size=80&id=BASPRdx1MrMq&format=png'
  }, {
    id: 'JavaScript',
    name: 'JavaScript',
    linkIcons: 'https://img.icons8.com/?size=64&id=Nkym0Ujb8VGI&format=png'
  }, {
    id: 'TypeScript',
    name: 'TypeScript',
    linkIcons: 'https://img.icons8.com/?size=48&id=nCj4PvnCO0tZ&format=png'
  }, {
    id: 'React',
    name: 'React',
    linkIcons: 'https://img.icons8.com/?size=80&id=VXQrhy9fWtm1&format=png'
  }, {
    id: 'Redux',
    name: 'Redux',
    linkIcons: 'https://img.icons8.com/?size=80&id=b6vIINYN0kfW&format=png'
  }, {
    id: 'NodeJS',
    name: 'NodeJS',
    linkIcons: 'https://img.icons8.com/?size=48&id=hsPbhkOH4FMe&format=png'
  }],
  learning: [{
    id: 'Vite',
    name: 'Vite',
    linkIcons: 'https://img.icons8.com/?size=48&id=YO3YqSaTOu5K&format=png'
  }, {
    id: 'TailwindCSS',
    name: 'TailwindCSS',
    linkIcons: 'https://img.icons8.com/?size=48&id=CIAZz2CYc6Kc&format=png'
  }, {
    id: 'NextJS',
    name: 'NextJS',
    linkIcons: 'https://img.icons8.com/?size=48&id=MWiBjkuHeMVq&format=png'
  }, {
    id: 'ExpressJS',
    name: 'ExpressJS',
    linkIcons: 'https://img.icons8.com/?size=48&id=SDVmtZ6VBGXt&format=png'
  }, {
    id: 'PostgreSQL',
    name: 'PostgreSQL',
    linkIcons: 'https://img.icons8.com/?size=80&id=Pv4IGT0TSpt8&format=png'
  }],
  other: [{
    id: 'Gulp',
    name: 'Gulp',
    linkIcons: 'https://img.icons8.com/?size=80&id=BpsdR48voUpa&format=png'
  }, {
    id: 'Webpack',
    name: 'Webpack',
    linkIcons: 'https://img.icons8.com/?size=80&id=QjbHx7WUskg1&format=png'
  }, {
    id: 'Figma',
    name: 'Figma',
    linkIcons: 'https://img.icons8.com/?size=48&id=W0YEwBDDfTeu&format=png'
  }, {
    id: 'Git',
    name: 'Git',
    linkIcons: 'https://img.icons8.com/?size=48&id=20906&format=png'
  }, {
    id: 'Postman',
    name: 'Postman',
    linkIcons: 'https://img.icons8.com/?size=80&id=EPbEfEa7o8CB&format=png'
  }, {
    id: 'England',
    name: 'Английский язык B1/B2',
    linkIcons: 'https://img.icons8.com/?size=48&id=t3NE3BsOAQwq&format=png'
  }]
};
const technologies = (idUsing, idLearning, idOther) => {
  const wrapperUsingTechnologies = document.querySelector(idUsing);
  const wrapperLearningTechnologies = document.querySelector(idLearning);
  const wrapperOtherTechnologies = document.querySelector(idOther);
  const renderItems = (wrapper, elems) => {
    try {
      elems.forEach(el => {
        const item = document.createElement('div');
        item.classList.add('skills__skill');
        item.innerHTML = `
                <div class="skills__skill_img">
                    <img
                        src=${el.linkIcons}
                        alt=${el.name}
                    />
                </div>
                <p
                    class="skills__skill_descr montserrat-regular"
                >
                    ${el.name}
                </p>
            `;
        wrapper.append(item);
      });
    } catch (e) {
      console.error(e);
    }
  };
  for (let key in skills) {
    switch (key) {
      case 'using':
        renderItems(wrapperUsingTechnologies, skills[key]);
        break;
      case 'learning':
        renderItems(wrapperLearningTechnologies, skills[key]);
        break;
      case 'other':
        renderItems(wrapperOtherTechnologies, skills[key]);
        break;
      default:
        console.error('Error while enumerating technology object');
    }
  }
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_tabs_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/tabs/tabs */ "./src/js/components/tabs/tabs.js");
/* harmony import */ var _components_technologies_technologies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/technologies/technologies */ "./src/js/components/technologies/technologies.js");
/* harmony import */ var _components_form_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/form/form */ "./src/js/components/form/form.js");



window.addEventListener('DOMContentLoaded', () => {
  (0,_components_tabs_tabs__WEBPACK_IMPORTED_MODULE_0__.tabs)('.portfolio__tabs_li', '.portfolio__pages');
  (0,_components_technologies_technologies__WEBPACK_IMPORTED_MODULE_1__.technologies)('#using', '#learning', '#otherTechnologies');
  (0,_components_form_form__WEBPACK_IMPORTED_MODULE_2__.form)('#form', '#btn_submit');
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map