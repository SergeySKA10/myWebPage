import { skills } from '../../data/data';

export const technologies = (idUsing, idLearning) => {
    const wrapperUsingTechnologies = document.querySelector(idUsing);
    const wrapperLearningTechnologies = document.querySelector(idLearning);

    const renderItems = (wrapper, elems) => {
        try {
            elems.forEach((el) => {
                const item = document.createElement('div');
                item.classList.add('skills__skill');
                item.setAttribute('data-aos', 'fade-up');
                item.setAttribute('data-aos-duration', '800');
                item.setAttribute('aria-label', 'skill');
                item.innerHTML = `
                <div class="skills__skill_img">
                    <img 
                        tabindex="0"
                        loading="lazy"
                        src=${el.linkIcons}
                        alt=${el.name}
                    />
                </div>
                <p
                    tabindex="0"
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
            default:
                console.error('Error while enumerating technology object');
        }
    }
};
