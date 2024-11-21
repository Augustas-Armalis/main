// Hero Section

// window.addEventListener('load', () => {
//   const timeline = gsap.timeline({ defaults: { ease: "power4.out", duration: 2 } });
//   const moveDistance = window.innerWidth;

//   timeline.fromTo('.alt-container', { y: 100, opacity: 0 }, { y: 0, opacity: 1 });
//   timeline.fromTo('nav', { y: -100, opacity: 0 }, { y: 0, opacity: 1 }, "-=2");
//   timeline.fromTo('#load-in-btn-hero', { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, "-=1.8");
//   timeline.fromTo('.logos', { x: moveDistance, opacity: 0 }, { x: 0, opacity: 1, duration: 1.8 }, "-=1.8");
//   timeline.fromTo('.logos-opp', { x: -moveDistance, opacity: 0 }, { x: 0, opacity: 1, duration: 1.8 }, "-=1.5");
//   timeline.fromTo('.logos-dbb', { x: moveDistance, opacity: 0 }, { x: 0, opacity: 1, duration: 1.8 }, "-=1.5");

//   gsap.fromTo(".black-bottom-content-container", {
//     y: 50, opacity: 0
//   }, {
//     y: 0, opacity: 1, duration: 1, ease: "power4.out",
//     scrollTrigger: {
//       trigger: ".black-bottom-content-container",
//       start: "top 90%",
//       toggleActions: "play none none none"
//     }
//   });

//   gsap.fromTo('.circle', { opacity: 0 }, { opacity: 1, duration: 1, delay: 1, ease: "power2.out" });
// });

// window.onload = () => {
//   const textElement = document.querySelector('.title-container h1');
//   textElement.style.visibility = 'visible';
//   const letters = textElement.innerText.split('');

//   textElement.innerHTML = '';
//   letters.forEach((letter, index) => {
//     const span = document.createElement('span');
//     span.innerText = letter;
//     textElement.appendChild(span);

//     setTimeout(() => {
//       span.style.opacity = 1;
//       span.style.filter = 'blur(0)';
//       span.style.transform = 'translateY(0)';
//     }, index * 20);
//   });
// };




















// Navigation Bar

const burgerContainer = document.querySelector('.burger-menu-container');
const topLine = document.querySelector('.top-burger-line');
const bottomLine = document.querySelector('.bottom-burger-line');
const nav = document.querySelector('nav');
const topThingNav = document.querySelector('.inside-container-nav');
const logoNav = document.querySelector('.logo-container');
const linkElementsMobile = document.querySelectorAll('.link-elements-mobile-nav a');
const backgroundBlur = document.querySelector('.background-blur-thing-nav-mobile');
const buttonNavContainerMobile = document.querySelector('#button-nav-container-mobile');
const firefliesEasterEgg = document.querySelector('.fireflies-easter-egg');

let isOpen = false;

gsap.set(topLine, { rotation: 0 });
gsap.set(bottomLine, { rotation: 0, y: 0 });
gsap.set(buttonNavContainerMobile, { y: 50, opacity: 0 });
gsap.set(firefliesEasterEgg, { y: 50, opacity: 0 });

function isMobile() {
  return window.innerWidth < 850;
}

function disableScroll() {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  document.body.style.overflowX = 'hidden';
  document.documentElement.style.overflowX = 'hidden';
}

function closeMenu() {
  gsap.to(topLine, { rotation: 0, y: 0, duration: 0.15 });
  gsap.to(bottomLine, { rotation: 0, y: 0, duration: 0.15 });
  gsap.to(topThingNav, { marginTop: "9px", duration: 0.3 });
  gsap.to(logoNav, { marginLeft: "14px", duration: 0.3 });
  gsap.to(nav, { height: "48px", duration: 0.15 });
  gsap.to(burgerContainer, { marginRight: "6px", duration: 0.3 });
  gsap.to(linkElementsMobile, { x: -100, opacity: 0, stagger: -0.05, duration: 0.3 });
  gsap.to(backgroundBlur, { opacity: 0, duration: 0.2, onComplete: () => gsap.set(backgroundBlur, { top: "-100vh" }) });
  gsap.to(buttonNavContainerMobile, { y: 50, opacity: 0, duration: 1 });
  gsap.to(firefliesEasterEgg, { y: 50, opacity: 0, duration: 0.3 });
  enableScroll();
  isOpen = false;
}

burgerContainer.addEventListener('click', () => {
  if (isMobile()) {
    if (isOpen) {
      closeMenu();
    } else {
      gsap.to(topLine, { rotation: 45, y: 4, duration: 0.15 });
      gsap.to(bottomLine, { rotation: -45, y: -4, duration: 0.15 });
      gsap.to(topThingNav, { marginTop: "15px", duration: 0.3 });
      gsap.to(logoNav, { marginLeft: "20px", duration: 0.3 });
      gsap.to(nav, { height: "357px", duration: 0.15 });
      gsap.to(burgerContainer, { marginRight: "12px", duration: 0.3 });
      gsap.fromTo(linkElementsMobile, { x: -100, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" });
      gsap.set(backgroundBlur, { top: "0" });
      gsap.to(backgroundBlur, { opacity: 1, duration: 0.3 });
      gsap.to(buttonNavContainerMobile, { y: 0, opacity: 1, delay: 0.2, duration: 0.5, ease: "power2.out" });
      gsap.to(firefliesEasterEgg, { y: 0, opacity: 1, duration: 1, delay: 1, ease: "power2.out" });
      disableScroll();
      isOpen = true;
    }
  }
});

backgroundBlur.addEventListener('click', () => {
  if (isOpen) closeMenu();
});

linkElementsMobile.forEach(link => link.addEventListener('click', () => {
  if (isOpen) closeMenu();
}));

logoNav.addEventListener('click', () => {
  if (isOpen) closeMenu();
});

buttonNavContainerMobile.addEventListener('mouseup', () => {
  if (isOpen) closeMenu();
});

buttonNavContainerMobile.addEventListener('touchend', () => {
  if (isOpen) closeMenu();
});

buttonNavContainerMobile.addEventListener('click', () => {
  if (isOpen) closeMenu();
});

firefliesEasterEgg.addEventListener('click', () => {
  if (isOpen) closeMenu();
});

const logoContainer = document.querySelector('.logo-container');
const logoImgNav = document.querySelector('.logo-img-nav');

logoContainer.addEventListener('pointerdown', () => {
  logoImgNav.style.transform = 'scale(0.97) translateZ(0)';
  logoImgNav.style.opacity = '0.7';
});

logoContainer.addEventListener('mouseover', () => {
  logoImgNav.style.transform = 'scale(1.05)';
});

logoContainer.addEventListener('mouseleave', () => {
  logoImgNav.style.transform = 'scale(1)';
});

logoContainer.addEventListener('pointerup', () => {
  logoImgNav.style.transform = 'scale(1)';
  logoImgNav.style.opacity = '1';
});

const burgerMenuContainer = document.querySelector('.burger-menu-container');

burgerMenuContainer.addEventListener('pointerdown', () => {
  burgerMenuContainer.style.transform = 'scale(0.97) translateZ(0)';
  burgerMenuContainer.style.opacity = '0.7';
});

burgerMenuContainer.addEventListener('pointerup', () => {
  burgerMenuContainer.style.transform = 'scale(1)';
  burgerMenuContainer.style.opacity = '1';
});

const linkElements = document.querySelectorAll('.link-elements-mobile-nav a');

linkElements.forEach(link => {
  link.addEventListener('pointerdown', () => {
    link.style.transform = 'scale(0.97) translateZ(0)';
    link.style.opacity = '0.7';
  });

  link.addEventListener('pointerup', () => {
    link.style.transform = 'scale(1)';
    link.style.opacity = '1';
  });
});
