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

    const targetContainers = document.querySelectorAll('.under-rectangle-layer, .black-bottom-fade-out-container');

    const fadeOutCircle = () => circleElement.style.opacity = '0';
    const fadeInCircle = () => circleElement.style.opacity = '1';

    targetContainers.forEach(container => {
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
  }
}

executeAbove1064px();
window.addEventListener('resize', executeAbove1064px);





// Counter Section

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter .count');

  const startCounting = (counter, duration) => {
    const target = +counter.parentElement.getAttribute('data-target');
    const incrementPerFrame = target / (duration / 16);
    let current = 0;

    const updateCount = () => {
      current += incrementPerFrame;
      counter.querySelector('.counter-number').innerText = Math.round(current);

      if (current < target) {
        requestAnimationFrame(updateCount);
      } else {
        counter.querySelector('.counter-number').innerText = target;
      }
    };

    updateCount();
  };

  const observerOptions = { threshold: 0.2 };
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector('.count');
        startCounting(counter, 1000);
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  counters.forEach(counter => {
    const counterContainer = counter.parentElement;
    observer.observe(counterContainer);
  });
});
















// Framework Section

function changeTextBasedOnWidth() {
  const frameworkText = document.getElementById('framework-change-text-framework');
  const developmentText = document.getElementById('framework-change-text-development');

  if (window.innerWidth < 1064) {
    frameworkText.innerHTML = "Professional website design, made<br>Exclusively for your business needs";
    developmentText.innerHTML = "Custom-coded website ensures<br>The best quality out of everyone";
  } else {
    frameworkText.innerHTML = "Compelling website design, done according<br>To your business’s preferences and wants";
    developmentText.innerHTML = "Custom-coded website assures speed, security<br>And the best quality amongst everybody else";
  }
}

window.addEventListener('load', changeTextBasedOnWidth);
window.addEventListener('resize', changeTextBasedOnWidth);

function animateFloating(container) {
  gsap.to(container, {
    x: "+=" + (Math.random() * 10 - 10),
    y: "+=" + (Math.random() * 10 - 10),
    rotation: "+=" + (Math.random() * 2 - 1),
    duration: 2 + Math.random() * 1,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });
}

animateFloating(document.querySelector('.floating-augustas-container'));
animateFloating(document.querySelector('.floating-daniel-container'));
animateFloating(document.querySelector('.ok-container-management'));
animateFloating(document.querySelector('.change-it-container-management'));


