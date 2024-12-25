function executeAbove1064px() {
    if (window.innerWidth > 1064) {
        console.clear();

        const circleDissapearTo = document.querySelectorAll('.dissapear-container'); // Elements that make the circle disappear

        const circleElement = document.querySelector('.circle');
        const circleText = circleElement.querySelector('.circle-text');
        const mouse = { x: 0, y: 0 };
        const previousMouse = { x: 0, y: 0 };
        const circle = { x: 0, y: 0 };
        let currentScale = 0;
        let currentAngle = 0;
        let rotationEnabled = true;

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
