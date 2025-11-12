export class AnimatedBackground {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };

        this.canvas.className = 'canvas-background';
        this.container.prepend(this.canvas);

        this.init();
        this.bindEvents();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    createParticles() {
        const count = 40; // Количество частиц
        this.particles = [];

        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5, // Медленная скорость
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                connections: [],
            });
        }
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Рисуем соединения
        this.ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)'; // Тонкий синий цвет
        this.ctx.lineWidth = 0.8;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 300) {
                    // Максимальное расстояние для соединения
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }

        // Рисуем частицы
        this.ctx.fillStyle = 'rgba(99, 102, 241, 0.3)'; // Цвет точек

        this.particles.forEach((particle) => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    updateParticles() {
        this.particles.forEach((particle) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Отскок от границ
            if (particle.x < 0 || particle.x > this.canvas.width)
                particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height)
                particle.vy *= -1;

            // Плавное изменение направления
            particle.vx += (Math.random() - 0.5) * 0.02;
            particle.vy += (Math.random() - 0.5) * 0.02;

            // Ограничение скорости
            const speed = Math.sqrt(
                particle.vx * particle.vx + particle.vy * particle.vy
            );
            if (speed > 1) {
                particle.vx = (particle.vx / speed) * 0.8;
                particle.vy = (particle.vy / speed) * 0.8;
            }
        });
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        // Интерактивность при наведении
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;

            // Легкое взаимодействие с частицами
            this.particles.forEach((particle) => {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    particle.vx += dx * 0.0005;
                    particle.vy += dy * 0.0005;
                }
            });
        });
    }
}
