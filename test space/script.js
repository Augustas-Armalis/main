function executeAbove1064px() {
    if (window.innerWidth > 1064) {
        console.clear();

        const circleDissapearTo = document.querySelectorAll('.dissapear-container'); // Elements that make the circle disappear
        const rectangleMorphTo = document.querySelectorAll('.rectangle-container, .change-container-two'); // Elements to morph the circle into a rectangle

        const circleElement = document.querySelector('.circle');
        const circleText = circleElement.querySelector('.circle-text');
        const mouse = { x: 0, y: 0 };
        const previousMouse = { x: 0, y: 0 };
        const circle = { x: 0, y: 0 };
        let currentScale = 0;
        let currentAngle = 0;
        let rotationEnabled = true;
        let rotationTimeout = null;
        let hoverTimeoutActive = false;

        const fadeInOnLoadDuration = 0.2;
        const fadeHoverDuration = 0.2;
        const colorChangeDuration = 0.3;

        const fadeInCircleOnLoad = () => {
            circleElement.style.transition = `opacity ${fadeInOnLoadDuration}s ease-in-out, background-color ${colorChangeDuration}s ease`;
            circleElement.style.opacity = '1';
        };

        const fadeInCircle = () => {
            circleElement.style.transition = `opacity ${fadeHoverDuration}s ease-in-out, background-color ${colorChangeDuration}s ease`;
            circleElement.style.opacity = '1';
        };

        const fadeOutCircle = () => {
            circleElement.style.transition = `opacity ${fadeHoverDuration}s ease-in-out, background-color ${colorChangeDuration}s ease`;
            circleElement.style.opacity = '0';
        };

        let mouseMoved = false;

        window.addEventListener('mousemove', (e) => {
            if (!mouseMoved) {
                fadeInCircle();
                mouseMoved = true;
            }

            mouse.x = e.x;
            mouse.y = e.y;
        });

        const speed = 0.12;

        const tick = () => {
            circle.x += (mouse.x - circle.x) * speed;
            circle.y += (mouse.y - circle.y) * speed;
            const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;
            const deltaMouseX = mouse.x - previousMouse.x;
            const deltaMouseY = mouse.y - previousMouse.y;
            previousMouse.x = mouse.x;
            previousMouse.y = mouse.y;
            const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4, 150);
            const scaleValue = (mouseVelocity / 150) * 0.5;
            currentScale += (scaleValue - currentScale) * speed;
            const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;
            const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;

            if (mouseVelocity > 20 && rotationEnabled) {
                currentAngle = angle;
            }

            const rotateTransform = rotationEnabled ? `rotate(${currentAngle}deg)` : '';
            circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
            window.requestAnimationFrame(tick);
        };

        tick();

        circleDissapearTo.forEach(container => {
            container.addEventListener('mouseenter', fadeOutCircle);
            container.addEventListener('mouseleave', fadeInCircle);
        });

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                fadeOutCircle();
            } else {
                fadeInCircle();
            }
        });

        document.addEventListener("mouseenter", fadeInCircle);
        document.addEventListener("mouseleave", fadeOutCircle);

        fadeInCircleOnLoad();

        rectangleMorphTo.forEach(container => {
            container.addEventListener('mouseenter', () => {
                const hoverText = container.getAttribute('data-hover-text');
                const circleWidth = circleElement.Width;

                gsap.to(circleElement, {
                    width: "auto",
                    height: "auto",
                    borderRadius: "8px",
                    duration: 0.2,
                    ease: "power2.inOut",
                    top: -20,
                    left: 10,
                });

                const textElement = circleElement.querySelector('.circle-text');
                textElement.textContent = hoverText;

                gsap.to(textElement, {
                    opacity: 1,
                    scale: 1,
                    margin: "5px",
                    duration: 0.2
                });

                rotationEnabled = false;

                if (rotationTimeout) {
                    clearTimeout(rotationTimeout);
                }
                hoverTimeoutActive = true;
            });

            container.addEventListener('mouseleave', () => {
                gsap.to(circleElement, {
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    duration: 0.2,
                    ease: "power2.inOut",
                    top: -6,
                    left: -6,
                });

                const textElement = circleElement.querySelector('.circle-text');
                gsap.to(textElement, {
                    opacity: 0,
                    scale: 0,
                    duration: 0.2
                });

                if (rotationTimeout) {
                    clearTimeout(rotationTimeout);
                }

                rotationTimeout = setTimeout(() => {
                    rotationEnabled = true;
                    hoverTimeoutActive = false;
                }, 200);
            });
        });

        document.querySelectorAll('[data-color], [data-text-color]').forEach(container => {
            container.addEventListener('mouseenter', () => {
                const color = container.getAttribute('data-color');
                const textColor = container.getAttribute('data-text-color');

                if (color) {
                    circleElement.style.backgroundColor = color;
                }
                if (textColor) {
                    circleText.style.color = textColor;
                }
            });

            container.addEventListener('mouseleave', () => {
                circleElement.style.backgroundColor = '';
                circleText.style.color = '';
            });
        });
    }
}

executeAbove1064px();
window.addEventListener('resize', executeAbove1064px);
