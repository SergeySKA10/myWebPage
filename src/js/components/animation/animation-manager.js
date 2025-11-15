export class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.observer = null;
        this.connectTreeInstance = null;
    }

    init() {
        this.setupIntersectionObserver();
        this.registerAnimations();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const animationId = entry.target.dataset.animationId;
                    const animation = this.animations.get(animationId);

                    if (entry.isIntersecting) {
                        this.startAnimation(animation);
                    } else {
                        this.stopAnimation(animation);
                    }
                });
            },
            {
                rootMargin: '100px', // отсутп для включения анимации
                threshold: 0.05,
            }
        );
    }

    registerAnimations() {
        // Регистрируем анимацию background
        const connectTreeCanvas = document.querySelector('.canvas-background');
        if (connectTreeCanvas) {
            connectTreeCanvas.dataset.animationId = 'connect-tree';
            this.animations.set('connect-tree', {
                element: connectTreeCanvas,
                type: 'canvas',
                running: false,
            });
            this.observer.observe(connectTreeCanvas);

            // Изначально приостанавливаем анимацию
            this.stopCanvasAnimation();
        }

        // Регистрируем анимации услуг
        document.querySelectorAll('.services__icon').forEach((icon, index) => {
            const animation = icon.querySelector(
                '.layout-animation, .frontend-animation, .fullstack-animation'
            );
            if (animation) {
                const animationId = `service-${index}`;
                animation.dataset.animationId = animationId;
                this.animations.set(animationId, {
                    element: animation,
                    type: 'css',
                    running: false,
                });
                this.observer.observe(animation);

                // Изначально приостанавливаем CSS анимации
                animation.style.animationPlayState = 'paused';
            }
        });
    }

    startAnimation(animation) {
        if (!animation || animation.running) return;

        animation.running = true;

        if (animation.type === 'css') {
            // Для CSS анимаций услуг
            animation.element.style.animationPlayState = 'running';
            animation.element.style.opacity = '1';
        } else if (animation.type === 'canvas') {
            // Для анимации background
            this.startCanvasAnimation();
        }
    }

    stopAnimation(animation) {
        if (!animation || !animation.running) return;

        animation.running = false;

        if (animation.type === 'css') {
            // Для CSS анимаций услуг
            animation.element.style.animationPlayState = 'paused';
            animation.element.style.opacity = '0.7'; // Немного прозрачности когда не видно для оптимизации
        } else if (animation.type === 'canvas') {
            // Для анимации background
            this.stopCanvasAnimation();
        }
    }

    startCanvasAnimation() {
        const canvas = document.querySelector('.canvas-background');
        if (canvas) {
            canvas.style.opacity = '1';
            canvas.style.transition = 'opacity 0.5s ease';
        }
    }

    stopCanvasAnimation() {
        // делаем менее заметной без остановки для оптимизации
        const canvas = document.querySelector('.canvas-background');
        if (canvas) {
            canvas.style.opacity = '0.3';
            canvas.style.transition = 'opacity 0.5s ease';
        }
    }
}
