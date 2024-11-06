function executeAbove1064px() {
  if (window.innerWidth > 1064) {
    console.clear();
    const circleElement = document.querySelector('.circle');
    const mouse = { x: 0, y: 0 };
    const previousMouse = { x: 0, y: 0 };
    const circle = { x: 0, y: 0 };
    let currentScale = 0;
    let currentAngle = 0;

    window.addEventListener('mousemove', (e) => {
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
      if (mouseVelocity > 20) {
        currentAngle = angle;
      }
      const rotateTransform = `rotate(${currentAngle}deg)`;
      circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
      window.requestAnimationFrame(tick);
    }

    tick();

    const targetContainer = document.querySelector('.under-rectangle-layer');

    const fadeOutCircle = () => circleElement.style.opacity = '0';
    const fadeInCircle = () => circleElement.style.opacity = '1';

    targetContainer.addEventListener('mouseenter', fadeOutCircle);
    targetContainer.addEventListener('mouseleave', fadeInCircle);

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        fadeOutCircle();
      } else {
        fadeInCircle();
      }
    });

    document.addEventListener("mouseenter", fadeInCircle);
    document.addEventListener("mouseleave", fadeOutCircle);
  }
}

executeAbove1064px();
window.addEventListener('resize', executeAbove1064px);

// Slider

var copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);

var copy = document.querySelector(".logos-slide-opp").cloneNode(true);
document.querySelector(".logos-opp").appendChild(copy);

var copy = document.querySelector(".logos-slide-dbb").cloneNode(true);
document.querySelector(".logos-dbb").appendChild(copy);

document.querySelectorAll('.logos-slide img, .logos-slide-opp img, .logos-slide-dbb img').forEach((img) => {
  // Add event listeners for touch events
  img.addEventListener('touchstart', () => {
    img.style.opacity = '0.7';
    img.style.transform = 'scale(0.99)';
  });

  img.addEventListener('touchend', () => {
    img.style.opacity = '';
    img.style.transform = '';
  });
});