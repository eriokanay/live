(() => {
    const config = {
        color: "#c815f5",
        connectionColor: "255, 45, 170",
        maxParticles: 75,
        densityDivisor: 16,
        minSize: 0.5,
        maxSize: 1.9,
        speed: 0.18,
        connectionDistance: 90,
        interactionDistance: 140,
        interactionStrength: 0.55,
        interactiveByDefault: false
    };

    const canvas = document.getElementById("particles");
    if (!canvas) return;

    const context = canvas.getContext("2d");
    const modeButton = document.getElementById("gameMode");
    let particles = [];
    let interactive = config.interactiveByDefault;
    let pointer = { x: -1000, y: -1000 };

    function resizeCanvas() {
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
        context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

        const particleCount = Math.min(
            config.maxParticles,
            Math.floor(window.innerWidth / config.densityDivisor)
        );

        particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * config.speed,
            vy: (Math.random() - 0.5) * config.speed,
            size: Math.random() * (config.maxSize - config.minSize) + config.minSize
        }));
    }

    function drawParticles() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

            if (interactive) {
                const dx = pointer.x - particle.x;
                const dy = pointer.y - particle.y;
                const distance = Math.hypot(dx, dy);

                if (distance < config.interactionDistance && distance > 0) {
                    particle.x -= dx / distance * config.interactionStrength;
                    particle.y -= dy / distance * config.interactionStrength;
                }
            }

            context.fillStyle = config.color;
            context.beginPath();
            context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            context.fill();

            for (let next = index + 1; next < particles.length; next += 1) {
                const other = particles[next];
                const distance = Math.hypot(particle.x - other.x, particle.y - other.y);

                if (distance < config.connectionDistance) {
                    const opacity = 0.10 * (1 - distance / config.connectionDistance);
                    context.strokeStyle = `rgba(${config.connectionColor}, ${opacity})`;
                    context.beginPath();
                    context.moveTo(particle.x, particle.y);
                    context.lineTo(other.x, other.y);
                    context.stroke();
                }
            }
        });

        requestAnimationFrame(drawParticles);
    }

    if (modeButton) {
        modeButton.addEventListener("click", () => {
            interactive = !interactive;
            modeButton.classList.toggle("active", interactive);
            modeButton.firstElementChild.nextSibling.textContent =
                interactive ? " particle mode: on" : " particle mode";
        });
    }

    window.addEventListener("pointermove", (event) => {
        pointer = { x: event.clientX, y: event.clientY };
    });
    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    drawParticles();
})();
