import Typed from 'typed.js';

export const header = (greetingId, headerId, stackId) => {
    new Typed(greetingId, {
        strings: ['Привет, меня зовут'],
        typeSpeed: 80,
        showCursor: false,
    });

    new Typed(headerId, {
        strings: ['Сергей Каракоскин'],
        typeSpeed: 80,
        showCursor: false,
        startDelay: 2500,
    });

    new Typed(stackId, {
        strings: [
            'JavaScript',
            'TypeScript',
            'React',
            'NextJS',
            'NodeJS',
            'Express',
            'NestJS',
        ],
        typeSpeed: 60,
        loop: true,
        showCursor: false,
    });
};
