// Hero section on load

window.addEventListener('load', () => {
  const altContainer = document.querySelector('.alt-container');
  const underRectangleLayer = document.querySelector('#load-in-btn-hero');
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
    duration: 2,
    delay: 0.2,
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








// Burger menu


const burgerContainer = document.querySelector('.burger-menu-container');
const topLine = document.querySelector('.top-burger-line');
const bottomLine = document.querySelector('.bottom-burger-line');
const nav = document.querySelector('nav'); // Select the <nav> element
const topThingNav = document.querySelector('.inside-container-nav')

let isOpen = false;
let initialNavHeight = nav.offsetHeight; // Store the initial height of the <nav> element

gsap.set(topLine, { rotation: 0 });
gsap.set(bottomLine, { rotation: 0, y: 0 });

// Function to check screen size
function isMobile() {
  return window.innerWidth < 850;
}

burgerContainer.addEventListener('click', () => {
  if (isMobile()) { // Only trigger animation if screen width is below 850px
    if (isOpen) {
      // Burger lines to 'X' close animation
      gsap.to(topLine, {
        rotation: 0,
        y: 0,
        duration: 0.15,
      });
      gsap.to(bottomLine, {
        rotation: 0,
        y: 0,
        duration: 0.15,
      });

      gsap.to(topThingNav, {
        marginTop: "9px",
        duration: 0.5,
      });


      // Animate nav height back to initial value
      gsap.to(nav, {
        height: "48px", // Return to original height
        duration: 0.3,
      });
    } else {
      // Burger lines to 'X' open animation
      gsap.to(topLine, {
        rotation: 45,
        y: 4,
        duration: 0.15,
      });
      gsap.to(bottomLine, {
        rotation: -45,
        y: -4,
        duration: 0.15,
      });

      gsap.to(topThingNav, {
        marginTop: "15px",
        duration: 0.5,
      });

      // Animate nav height to 500px
      gsap.to(nav, {
        height: "300px", // Open height
        duration: 0.3,
      });
    }

    isOpen = !isOpen;
  }
});






