// Hero section load in animations

window.addEventListener('load', () => {
  const altContainer = document.querySelector('.alt-container');
  const underRectangleLayer = document.querySelector('#load-in-btn-hero');
  const logos = document.querySelector('.logos');
  const logosOpp = document.querySelector('.logos-opp');
  const logosDbb = document.querySelector('.logos-dbb');
  const nav = document.querySelector('nav');
  const circle = document.querySelector('.circle');

  const screenWidth = window.innerWidth;
  const moveDistance = screenWidth;

  const timeline = gsap.timeline({ defaults: { ease: "power4.out", duration: 2 } });

  timeline.fromTo(altContainer, { y: 100, opacity: 0 }, { y: 0, opacity: 1 });
  timeline.fromTo(nav, { y: -100, opacity: 0 }, { y: 0, opacity: 1 }, "-=2");
  timeline.fromTo(underRectangleLayer, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, "-=1.8");
  timeline.fromTo(logos, { x: moveDistance, opacity: 0 }, { x: 0, opacity: 1, duration: 1.8 }, "-=1.8");
  timeline.fromTo(logosOpp, { x: -moveDistance, opacity: 0 }, { x: 0, opacity: 1, duration: 1.8 }, "-=1.5");
  timeline.fromTo(logosDbb, { x: moveDistance, opacity: 0 }, { x: 0, opacity: 1, duration: 1.8 }, "-=1.5");

  gsap.fromTo(".bck-container", { opacity: 0 }, { opacity: 1, duration: 2, delay: 0.2, ease: "power2.out" });

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

  gsap.fromTo(circle, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1, ease: "power2.out" });
});





// Hide/show the nav if scrolling

let lastScrollTop = 0;
const navis = document.querySelector('nav');
let isScrollingEnabled = false;

window.addEventListener('load', () => {
  gsap.fromTo(navis, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 2, ease: "power4.out" });

  setTimeout(() => {
    isScrollingEnabled = true;
  }, 3000);
});

window.addEventListener('scroll', () => {
  if (!isScrollingEnabled) return;

  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    gsap.to(navis, { y: -navis.offsetHeight, opacity: 0, duration: 0.6, ease: "power4.out" });
  } else {
    gsap.to(navis, { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" });
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});





// Hero section title framer fade in

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
const nav = document.querySelector('nav');
const topThingNav = document.querySelector('.inside-container-nav');
const logoNav = document.querySelector('.logo-container');
const linkElementsMobile = document.querySelectorAll('.link-elements-mobile-nav a');
const backgroundBlur = document.querySelector('.background-blur-thing-nav-mobile');
const buttonNavContainerMobile = document.querySelector('#button-nav-container-mobile');

let isOpen = false;

gsap.set(topLine, { rotation: 0 });
gsap.set(bottomLine, { rotation: 0, y: 0 });
gsap.set(buttonNavContainerMobile, { y: 50, opacity: 0 });

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

  gsap.to(linkElementsMobile, {
    x: -100,
    opacity: 0,
    stagger: -0.05,
    duration: 0.3,
  });

  gsap.to(backgroundBlur, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      gsap.set(backgroundBlur, { top: "-100vh" });
    }
  });

  gsap.to(buttonNavContainerMobile, {
    y: 50,
    opacity: 0,
    duration: 0.3,
  });

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

      gsap.fromTo(linkElementsMobile,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" }
      );

      gsap.set(backgroundBlur, { top: "0" });
      gsap.to(backgroundBlur, { opacity: 1, duration: 0.3 });

      gsap.to(buttonNavContainerMobile,
        { y: 0, opacity: 1, delay: 0.2, duration: 0.5, ease: "power2.out" }
      );

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

buttonNavContainerMobile.addEventListener('click', (event) => {
  if (isOpen) closeMenu();
});





// Advanced logo click animations

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





// Advanced burger menu click animations

const burgerMenuContainer = document.querySelector('.burger-menu-container');

burgerMenuContainer.addEventListener('pointerdown', () => {
  burgerMenuContainer.style.transform = 'scale(0.97) translateZ(0)';
  burgerMenuContainer.style.opacity = '0.7';
});

burgerMenuContainer.addEventListener('pointerup', () => {
  burgerMenuContainer.style.transform = 'scale(1)';
  burgerMenuContainer.style.opacity = '1';
});





// Advanced links on mobile nav click animation

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





// Image slider


// var copy = document.querySelector(".logos-slide").cloneNode(true);
// document.querySelector(".logos").appendChild(copy);

// var copyOpp = document.querySelector(".logos-slide-opp").cloneNode(true);
// document.querySelector(".logos-opp").appendChild(copyOpp);

// var copyDbb = document.querySelector(".logos-slide-dbb").cloneNode(true);
// document.querySelector(".logos-dbb").appendChild(copyDbb);







// Preloader

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");

  disableScroll();

  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
    enableScroll();
  }, 500);
});

setTimeout(function () {
  const connectionMessage = document.getElementById("connectionMessage");
  connectionMessage.style.display = "block";
  connectionMessage.classList.add("show");
}, 1500);

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
