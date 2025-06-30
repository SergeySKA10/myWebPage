const skills = {
    using: [
        {
            id: 'HTML5',
            name: 'HTML5',
            linkIcons:
                'https://img.icons8.com/?size=80&id=D2Hi2VkJSi33&format=png',
        },
        {
            id: 'CSS3',
            name: 'CSS3',
            linkIcons:
                'https://img.icons8.com/?size=80&id=YjeKwnSQIBUq&format=png',
        },
        {
            id: 'SASS',
            name: 'SASS',
            linkIcons:
                'https://img.icons8.com/?size=48&id=QBqFNfPPB2Kx&format=png',
        },
        {
            id: 'Bootstrap',
            name: 'Bootstrap',
            linkIcons:
                'https://img.icons8.com/?size=80&id=BASPRdx1MrMq&format=png',
        },
        {
            id: 'JavaScript',
            name: 'JavaScript',
            linkIcons:
                'https://img.icons8.com/?size=64&id=Nkym0Ujb8VGI&format=png',
        },
        {
            id: 'TypeScript',
            name: 'TypeScript',
            linkIcons:
                'https://img.icons8.com/?size=48&id=nCj4PvnCO0tZ&format=png',
        },
        {
            id: 'React',
            name: 'React',
            linkIcons:
                'https://img.icons8.com/?size=80&id=VXQrhy9fWtm1&format=png',
        },
        {
            id: 'Redux',
            name: 'Redux',
            linkIcons:
                'https://img.icons8.com/?size=80&id=b6vIINYN0kfW&format=png',
        },
        {
            id: 'NodeJS',
            name: 'NodeJS',
            linkIcons:
                'https://img.icons8.com/?size=48&id=hsPbhkOH4FMe&format=png',
        },
    ],
    learning: [
        {
            id: 'Vite',
            name: 'Vite',
            linkIcons:
                'https://img.icons8.com/?size=48&id=YO3YqSaTOu5K&format=png',
        },
        {
            id: 'TailwindCSS',
            name: 'TailwindCSS',
            linkIcons:
                'https://img.icons8.com/?size=48&id=CIAZz2CYc6Kc&format=png',
        },
        {
            id: 'NextJS',
            name: 'NextJS',
            linkIcons:
                'https://img.icons8.com/?size=48&id=MWiBjkuHeMVq&format=png',
        },
        {
            id: 'ExpressJS',
            name: 'ExpressJS',
            linkIcons:
                'https://img.icons8.com/?size=48&id=SDVmtZ6VBGXt&format=png',
        },
        {
            id: 'PostgreSQL',
            name: 'PostgreSQL',
            linkIcons:
                'https://img.icons8.com/?size=80&id=Pv4IGT0TSpt8&format=png',
        },
    ],
    other: [
        {
            id: 'Gulp',
            name: 'Gulp',
            linkIcons:
                'https://img.icons8.com/?size=80&id=BpsdR48voUpa&format=png',
        },
        {
            id: 'Webpack',
            name: 'Webpack',
            linkIcons:
                'https://img.icons8.com/?size=80&id=QjbHx7WUskg1&format=png',
        },
        {
            id: 'Figma',
            name: 'Figma',
            linkIcons:
                'https://img.icons8.com/?size=48&id=W0YEwBDDfTeu&format=png',
        },
        {
            id: 'Git',
            name: 'Git',
            linkIcons: 'https://img.icons8.com/?size=48&id=20906&format=png',
        },
        {
            id: 'Postman',
            name: 'Postman',
            linkIcons:
                'https://img.icons8.com/?size=80&id=EPbEfEa7o8CB&format=png',
        },
        {
            id: 'England',
            name: 'Английский язык B1/B2',
            linkIcons:
                'https://img.icons8.com/?size=48&id=t3NE3BsOAQwq&format=png',
        },
    ],
};

export const technologies = (idUsing, idLearning, idOther) => {
    const wrapperUsingTechnologies = document.querySelector(idUsing);
    const wrapperLearningTechnologies = document.querySelector(idLearning);
    const wrapperOtherTechnologies = document.querySelector(idOther);

    const renderItems = (wrapper, elems) => {
        try {
            elems.forEach((el) => {
                const item = document.createElement('div');
                item.classList.add('skills__skill');
                item.innerHTML = `
                <div class="skills__skill_img">
                    <img 
                        tabindex="0"
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
            case 'other':
                renderItems(wrapperOtherTechnologies, skills[key]);
                break;
            default:
                console.error('Error while enumerating technology object');
        }
    }
};
