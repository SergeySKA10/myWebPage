import { portfolio } from '../portfolio/portfolio';

export const tabs = (selectorTabs, selectorWrapper) => {
    const tabs = document.querySelectorAll(selectorTabs);
    const portfolioBlock = document.querySelector(selectorWrapper);
    const portfolioComponents = portfolio();

    let index = 0;
    portfolioBlock.append(...portfolioComponents);

    const cacheFilterProjects = {
        all: portfolioComponents,
    };

    const handlerFilterProjects = (filter, parentBlock, components) => {
        parentBlock.innerHTML = '';

        if (cacheFilterProjects[filter]) {
            parentBlock.append(...cacheFilterProjects[filter]);
        } else {
            const projects = components.filter(
                (el) => el.getAttribute('data-category') === filter
            );
            cacheFilterProjects[filter] = projects;
            parentBlock.append(...projects);
        }
    };

    tabs.forEach((tab) => {
        tab.addEventListener('click', (e) => {
            if (index === +e.target.getAttribute('data-index')) {
                return;
            }

            tabs[index].classList.remove('tab_active');
            index = +e.target.getAttribute('data-index');
            tabs[index].classList.add('tab_active');

            handlerFilterProjects(
                e.target.textContent.toLowerCase(),
                portfolioBlock,
                portfolioComponents
            );
        });
    });
};
