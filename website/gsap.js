// Herso section on load

window.addEventListener('load', () => {
    const altContainer = document.querySelector('.alt-container');
    const underRectangleLayer = document.querySelector('.under-rectangle-layer');
    const logos = document.querySelector('.logos');
    const logosOpp = document.querySelector('.logos-opp');
    const logosDbb = document.querySelector('.logos-dbb');

    const screenWidth = window.innerWidth;

    const moveDistance = screenWidth;

    const timeline = gsap.timeline({ defaults: { ease: "power4.out", duration: 2 } });

    timeline.fromTo(altContainer, { y: 100, opacity: 0 }, { y: 0, opacity: 1 });

    timeline.fromTo(underRectangleLayer, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, "-=1.8");

    timeline.fromTo(logos, { x: moveDistance, opacity: 0 }, { x: 0, opacity: 1, duration: 1.8 }, "-=1.8");

    timeline.fromTo(logosOpp, { x: -moveDistance, opacity: 0 }, { x: 0, opacity: 1, duration: 1.8 }, "-=1.5");

    timeline.fromTo(logosDbb, { x: moveDistance, opacity: 0 }, { x: 0, opacity: 1, duration: 1.8 }, "-=1.5");

    gsap.fromTo(".bck-container", { opacity: 0 }, {
      opacity: 1,
      duration: 4,
      ease: "power2.out"
    });

    gsap.fromTo(".black-bottom-content-container", {
      y: 50, opacity: 0
    }, {
      y: 0, opacity: 1, duration: 1, ease: "power4.out",
      scrollTrigger: {
        trigger: ".black-bottom-content-container",
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
  });



// Hero section main tech fade glur in animation on load

window.onload = () => {
    const textElement = document.querySelector('.title-container h1');

    textElement.style.visibility = 'visible';

    const letters = textElement.innerText.split('');
    textElement.innerHTML = '';

    letters.forEach((letter, index) => {
    const span = document.createElement('span');
    span.innerText = letter;
    textElement.appendChild(span);

    setTimeout(() => {
        span.style.opacity = 1;
        span.style.filter = 'blur(0)';
        span.style.transform = 'translateY(0)';
    }, index * 20);
    });
};