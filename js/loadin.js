// Load in animations

document.addEventListener("DOMContentLoaded", () => {
  gsap.fromTo(".bck-img-holder",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.1 }
  );

  gsap.fromTo(".title-container",
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.1 }
  );

  gsap.fromTo(".alt-container",
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
  );

  gsap.fromTo(".under-rectangle-layer",
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.4 }
  );

  gsap.fromTo("nav",
    { y: -40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
  );

  gsap.fromTo(".nav-lottie-drag",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.7 }
  );

  gsap.fromTo(".slider-hero-container",
    { x: 200, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.3 }
  );

  gsap.fromTo(".circle",
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
  );
});










// Hide the hrefs

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }

    window.history.replaceState(null, null, ' ');
  });
});










// Fireflies button

gsap.registerPlugin(MotionPathPlugin);

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function moveBlob(blob, widthRange, heightRange) {
  const randomPath = [
    { x: random(-20, widthRange), y: random(-10, heightRange) },
    { x: random(-20, widthRange), y: random(-10, heightRange) },
    { x: random(-20, widthRange), y: random(-10, heightRange) },
    { x: random(-20, widthRange), y: random(-10, heightRange) }
  ];

  gsap.to(blob, {
    motionPath: {
      path: randomPath,
      curviness: 1.5,
      autoRotate: false
    },
    duration: random(12, 20),
    ease: 'power6.in',
    onComplete: () => moveBlob(blob, widthRange, heightRange),
    repeat: 0
  });
}

function initializeBlobs(rectangle) {
  const blobs = rectangle.querySelectorAll('.blob');
  const { width, height } = rectangle.getBoundingClientRect();

  blobs.forEach(blob => {
    const size = random(30, 45);
    blob.style.width = `${size}px`;
    blob.style.height = `${size}px`;

    gsap.set(blob, {
      x: random(-20, width - size),
      y: random(-10, height - size)
    });

    moveBlob(blob, width - size, height - size);
  });

  if (window.innerWidth >= 768) {
    rectangle.addEventListener('mouseenter', () => moveToCursor(blobs, rectangle));
    rectangle.addEventListener('mouseleave', () => continueAnimation(blobs, rectangle));
  }

  rectangle.addEventListener('touchend', () => {
    rectangle.classList.remove('active');
    continueAnimation(blobs, rectangle);
  });
}

function moveToCursor(blobs, rectangle) {
  rectangle.addEventListener('mousemove', (event) => {
    const { left, top } = rectangle.getBoundingClientRect();
    const cursorX = event.clientX - left;
    const cursorY = event.clientY - top;

    blobs.forEach(blob => {
      gsap.to(blob, {
        x: cursorX - parseInt(blob.style.width) / 2,
        y: cursorY - parseInt(blob.style.height) / 2,
        duration: 3.0,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  });
}

function continueAnimation(blobs, rectangle) {
  const { width, height } = rectangle.getBoundingClientRect();

  blobs.forEach(blob => {
    const size = parseInt(blob.style.width);

    gsap.to(blob, {
      duration: 2.0,
      motionPath: {
        path: [
          { x: random(-20, width - size), y: random(-10, height - size) },
          { x: random(-20, width - size), y: random(-10, height - size) },
          { x: random(-20, width - size), y: random(-10, height - size) },
          { x: random(-20, width - size), y: random(-10, height - size) }
        ],
        curviness: 1.5,
        autoRotate: false
      },
      onComplete: () => moveBlob(blob, width - size, height - size)
    });
  });
}

function init() {
  document.querySelectorAll('.rectangle').forEach(initializeBlobs);
}

const buttons = document.querySelectorAll('.under-rectangle-layer');

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    gsap.to(button, {
      boxShadow: '0px 0px 8px 0px rgba(175, 175, 182, 0.20) inset',
      duration: 0.15,
      ease: 'power1.out'
    });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      boxShadow: '0px 0px 8px 3px rgba(175, 175, 182, 0.20) inset',
      duration: 0.15,
      ease: 'power1.out'
    });
  });

  button.addEventListener('mousedown', () => {
    gsap.to(button, {
      scale: 0.98,
      duration: 0.15,
      ease: 'power2.out'
    });

    gsap.to(button.querySelector('.rectangle'), {
      scale: 0.99,
      opacity: 0.7,
      duration: 0.15,
      ease: 'power2.out',
    });
  });

  button.addEventListener('touchstart', () => {
    gsap.to(button, {
      scale: 0.98,
      duration: 0.15,
      ease: 'power2.out',
    });
    gsap.to(button.querySelector('.rectangle'), {
      scale: 0.99,
      opacity: 0.7,
      duration: 0.15,
      ease: 'power2.out'
    });
  });

  const resetScale = () => {
    gsap.to(button, {
      scale: 1,
      duration: 0.15,
      ease: 'power2.out'
    });
    gsap.to(button.querySelector('.rectangle'), {
      scale: 1,
      opacity: 1,
      duration: 0.15,
      ease: 'power2.out'
    });
  };

  button.addEventListener('mouseup', resetScale);
  button.addEventListener('mouseleave', resetScale);
  button.addEventListener('touchend', resetScale);
});

init();










// Circle following the mouse

function executeAbove1064px() {
  if (window.innerWidth > 1064) {
    console.clear();

    const circleDissapearTo = document.querySelectorAll('.under-rectangle-layer, nav, .dots, .arrows-testimonials-container, .rectangle, .white-cta-button, .question, .list-element, .contact-icon, .legal-link, .call-cta-container a');
    const rectangleMorphTo = document.querySelectorAll('.morph-home-web, .slide');

    const circleElement = document.querySelector('.circle');
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

    const fadeInCircleOnLoad = () => {
      circleElement.style.transition = `opacity ${fadeInOnLoadDuration}s ease-in-out`;
      circleElement.style.opacity = '1';
    };

    const fadeInCircle = () => {
      circleElement.style.transition = `opacity ${fadeHoverDuration}s ease-in-out`;
      circleElement.style.opacity = '1';
    };

    const fadeOutCircle = () => {
      circleElement.style.transition = `opacity ${fadeHoverDuration}s ease-in-out`;
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

    rectangleMorphTo.forEach(container => {
      container.addEventListener('mouseenter', () => {
        if (hoverTimeoutActive) {
          clearTimeout(rotationTimeout);
          hoverTimeoutActive = false;
        }
      });
    });
  }
}

executeAbove1064px();
window.addEventListener('resize', executeAbove1064px);










// Image hero slider

const sliderHero = document.querySelector('.slider-container-hero');
const slidesHero = document.querySelector('.slider-hero');
let isDraggingHero = false;
let startXHero, scrollLeftHero, lastXHero, velocityHero, momentumIntervalHero;

sliderHero.addEventListener('mousedown', (e) => {
  isDraggingHero = true;
  startXHero = e.pageX - sliderHero.offsetLeft;
  scrollLeftHero = sliderHero.scrollLeft;
  lastXHero = startXHero;
  velocityHero = 0;
  sliderHero.style.cursor = 'grabbing';
  sliderHero.classList.add('dragging-hero');
  cancelAnimationFrame(momentumIntervalHero);
});

sliderHero.addEventListener('mouseup', () => {
  if (isDraggingHero) {
    isDraggingHero = false;
    sliderHero.style.cursor = 'grab';
    sliderHero.classList.remove('dragging-hero');
    momentumHero();
  }
});

sliderHero.addEventListener('mouseleave', () => {
  if (isDraggingHero) {
    isDraggingHero = false;
    sliderHero.style.cursor = 'grab';
    sliderHero.classList.remove('dragging-hero');
    momentumHero();
  }
});

sliderHero.addEventListener('mousemove', (e) => {
  if (!isDraggingHero) return;
  const xHero = e.pageX - sliderHero.offsetLeft;
  const walkHero = xHero - startXHero;
  sliderHero.scrollLeft = scrollLeftHero - walkHero;
  velocityHero = xHero - lastXHero;
  lastXHero = xHero;
});

function momentumHero() {
  let lastTimeHero = Date.now();
  let scrollSpeedHero = -velocityHero;

  function momentumStepHero() {
    const now = Date.now();
    const deltaTimeHero = now - lastTimeHero;
    lastTimeHero = now;

    if (Math.abs(scrollSpeedHero) > 0.5) {
      sliderHero.scrollLeft += scrollSpeedHero;
      scrollSpeedHero *= 0.95;
      momentumIntervalHero = requestAnimationFrame(momentumStepHero);
    }
  }

  momentumStepHero();
}

const slideElements = document.querySelectorAll('.slide-hero');

slideElements.forEach(slide => {
  let isMouseDown = false;
  let startX = 0;

  slide.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX;
  });

  slide.addEventListener('mouseup', (e) => {
    if (isMouseDown && Math.abs(startX - e.pageX) < 10) {
      const link = slide.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    }
    isMouseDown = false;
  });

  slide.addEventListener('mouseleave', () => {
    isMouseDown = false;
  });
});

document.querySelectorAll('.slide-hero').forEach(slide => {
  slide.addEventListener('touchstart', function () {
    this.querySelector('.slide-image-hero').style.filter = 'brightness(80%)';
    this.style.transform = 'scale(0.99)';
    this.style.cursor = 'grabbing';
  });

  slide.addEventListener('touchend', function () {
    this.querySelector('.slide-image-hero').style.filter = '';
    this.style.transform = '';
  });

  slide.addEventListener('touchcancel', function () {
    this.querySelector('.slide-image-hero').style.filter = '';
    this.style.transform = '';
    this.style.cursor = '';
  });

  slide.addEventListener('mouseenter', function () {
    this.querySelector('.slide-image-hero').style.filter = 'brightness(80%)';
  });

  slide.addEventListener('mouseleave', function () {
    this.querySelector('.slide-image-hero').style.filter = '';
  });

  slide.addEventListener('mousedown', function () {
    this.style.transform = 'scale(0.99)';
    this.style.cursor = 'grabbing';
  });

  slide.addEventListener('mouseup', function () {
    this.style.transform = '';
    this.style.cursor = '';
  });

  slide.addEventListener('mouseleave', function () {
    this.style.transform = '';
    this.style.cursor = '';
  });
});










// Navigation Bar

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const elementHeight = rect.height;

  return (
    rect.top < window.innerHeight * 0.8 &&
    rect.bottom > window.innerHeight * 0.2
  );
}

function updateActiveLink() {
  const links = document.querySelectorAll('.links-container a');

  links.forEach(link => {
    const targetId = link.getAttribute('data-nav-white');
    const targetElement = document.querySelector(targetId);

    if (targetElement && isInViewport(targetElement)) {
      link.classList.add('active-nav');
    } else {
      link.classList.remove('active-nav');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);
updateActiveLink();

const burgerContainer = document.querySelector('.burger-menu-container');
const topLine = document.querySelector('.top-burger-line');
const bottomLine = document.querySelector('.bottom-burger-line');
const nav = document.querySelector('nav');
const topThingNav = document.querySelector('.inside-container-nav');
const logoNav = document.querySelector('.logo-container');
const linkElementsMobile = document.querySelectorAll('.link-elements-mobile-nav a');
const backgroundBlur = document.querySelector('.background-blur-thing-nav-mobile');
const buttonNavContainerMobile = document.querySelector('#button-nav-container-mobile');
const mobileLinksContainer = document.querySelector('.mobile-links-container');
const navHeight = mobileLinksContainer.offsetHeight + 60;

const smoothEase = "power3.out";
const gentleEase = "circ.out";
const smoothInOut = "expo.inOut";
const ultraSmoothEase = "power4.out";
const slowEase = "slowmo";

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
  gsap.to(topLine, { rotation: 0, y: 0, duration: 0.15, ease: smoothEase });
  gsap.to(bottomLine, { rotation: 0, y: 0, duration: 0.15, ease: smoothEase });
  gsap.to(topThingNav, { marginTop: "9px", duration: 0.3, ease: gentleEase });
  gsap.to(logoNav, { marginLeft: "14px", duration: 0.3, ease: gentleEase });
  gsap.to(nav, { height: "48px", duration: 0.3, ease: smoothEase });
  gsap.to(burgerContainer, { marginRight: "6px", duration: 0.3, ease: smoothEase });
  gsap.to(linkElementsMobile, { x: -100, opacity: 0, stagger: -0.05, duration: 0.1, ease: smoothEase });
  gsap.to(backgroundBlur, { opacity: 0, duration: 0.2, ease: smoothEase, onComplete: () => gsap.set(backgroundBlur, { top: "-100vh" }) });
  gsap.to(buttonNavContainerMobile, { y: 50, opacity: 0, duration: 1, ease: smoothEase });
  gsap.to('.divider-mobile-menu', { y: 0, opacity: 0, stagger: -0.1, duration: 0.3, ease: smoothEase });
  enableScroll();
  isOpen = false;
}

burgerContainer.addEventListener('click', () => {
  if (isMobile()) {
    if (isOpen) {
      closeMenu();
    } else {
      gsap.to(topLine, { rotation: 45, y: 4, duration: 0.15, ease: smoothEase });
      gsap.to(bottomLine, { rotation: -45, y: -4, duration: 0.15, ease: smoothEase });
      gsap.to(topThingNav, { marginTop: "15px", duration: 0.3, ease: gentleEase });
      gsap.to(logoNav, { marginLeft: "20px", duration: 0.3, ease: gentleEase });
      gsap.to(nav, { height: `${navHeight}px`, duration: 0.15, ease: smoothEase });
      gsap.to(burgerContainer, { marginRight: "12px", duration: 0.3, ease: smoothEase });
      gsap.fromTo(linkElementsMobile, { x: -100, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.05, duration: 0.3, ease: "power2.out" });
      gsap.set(backgroundBlur, { top: "0" });
      gsap.to(backgroundBlur, { opacity: 1, duration: 0.3, ease: smoothInOut });
      gsap.to(buttonNavContainerMobile, { y: 0, opacity: 1, delay: 0.2, duration: 0.5, ease: ultraSmoothEase });
      gsap.fromTo('.divider-mobile-menu', { y: 0, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.3, duration: 0.3, ease: smoothEase });
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