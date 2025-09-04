import Typed from 'typed.js';

export const header = (greetingId, headerId, stackId) => {
    new Typed(greetingId, {
        strings: ['Привет, меня зовут'],
        typeSpeed: 70,
        showCursor: false,
    });

    new Typed(headerId, {
        strings: ['Сергей Каракоскин'],
        typeSpeed: 70,
        showCursor: false,
        startDelay: 2000,
    });

    new Typed(stackId, {
        strings: [
            'JavaScript',
            'TypeScript',
            'React',
            'Next.js',
            'Node.js',
            'Express.js',
            'Nest.js',
        ],
        typeSpeed: 60,
        loop: true,
        showCursor: false,
    });
};
