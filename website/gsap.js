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

  gsap.fromTo(".bck-container", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.8, delay: 0.2, ease: "power2.out" });

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


// preloader


window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  const connectionMessage = document.getElementById("connectionMessage");

  // Cancel the preloader display if the page has loaded before 1 second
  clearTimeout(preloaderTimeout);

  // Hide the preloader after a short delay
  preloader.style.opacity = "0"; // Start fading out the preloader
  setTimeout(() => {
    preloader.style.display = "none"; // Hide the preloader completely after fade out
    enableScroll();
  }, 200); // Time for fading out

  // Display the connection message after 1.5 seconds
  setTimeout(function () {
    connectionMessage.style.display = "block";
    connectionMessage.classList.add("show");
  }, 1000);

  // Disable scrolling while the preloader is active
  disableScroll();
});

// Set a timeout to show the preloader if the page takes longer than 1 second to load
const preloaderTimeout = setTimeout(function () {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "flex"; // Show preloader (as a flexbox)
  preloader.style.opacity = "1"; // Trigger fade-in effect
}, 200); // Trigger preloader after 1 second if page hasn't finished loading

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







// stats counter


document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter .count');

  // Function to handle the counting effect with the same duration (1 second)
  const startCounting = (counter, duration) => {
    const target = +counter.parentElement.getAttribute('data-target');
    const start = 0;

    // We calculate how much we should increase per frame to finish in the given duration
    const incrementPerFrame = target / (duration / 16); // ~60 FPS, so 1000ms / 16ms = approx. 60 frames per second

    let current = start;

    const updateCount = () => {
      current += incrementPerFrame;
      // Set the rounded value
      counter.querySelector('.counter-number').innerText = Math.round(current);

      // If the current number hasn't reached the target yet, continue updating
      if (current < target) {
        requestAnimationFrame(updateCount); // Using requestAnimationFrame for smoother animation
      } else {
        // Ensure the number is exactly equal to the target at the end
        counter.querySelector('.counter-number').innerText = target;
      }
    };

    updateCount(); // Start the animation
  };

  // IntersectionObserver to trigger when counter enters the viewport
  const observerOptions = {
    threshold: 0.2, // Trigger when 10% of the element is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector('.count');
        const duration = 1000; // Fixed duration for all counters to complete in 1 second

        startCounting(counter, duration);
        observer.unobserve(entry.target); // Stop observing after counting starts
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe each counter
  counters.forEach(counter => {
    const counterContainer = counter.parentElement;
    observer.observe(counterContainer);
  });
});





gsap.utils.toArray(".counter").forEach((counter, index) => {
  gsap.fromTo(counter, {
    y: 50, opacity: 0
  }, {
    y: 0, opacity: 1,
    duration: 1, ease: "power4.out",
    scrollTrigger: {
      trigger: counter,
      start: "top 90%",
      toggleActions: "play none none none"
    },
    stagger: window.innerWidth < 830 ? 0.3 * index : 0  // stagger for smaller screens
  });
});


// GSAP animation for multiple `.section-title-container` elements
document.querySelectorAll(".section-title-container").forEach(container => {
  gsap.fromTo(container, {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: container,
      start: "top 90%",
      toggleActions: "play none none none"
    }
  });
});



const frameworkBoxes = gsap.utils.toArray("#framework-box");

if (window.innerWidth > 830) {
  // Grouped animation with stagger for larger screens
  gsap.fromTo(
    frameworkBoxes,
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".framework-container", // Trigger animation when the container is in view
        start: "top 90%",
        toggleActions: "play none none none"
      },
      stagger: 0.15 // Stagger effect for larger screens
    }
  );
} else {
  // Individual animations for smaller screens
  frameworkBoxes.forEach((box) => {
    gsap.fromTo(
      box,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: box, // Each box triggers its own animation
          start: "top 90%", // Animation starts when the box enters the viewport
          toggleActions: "play none none none"
        }
      }
    );
  });
}



function animateFloating(container) {
  gsap.to(container, {
    x: "+=" + (Math.random() * 10 - 10),  // Random X movement (-10 to 10px)
    y: "+=" + (Math.random() * 10 - 10),  // Random Y movement (-10 to 10px)
    rotation: "+=" + (Math.random() * 2 - 1), // Slight random rotation
    duration: 2 + Math.random() * 1, // Random duration between 2s and 4s
    ease: "sine.inOut",  // Smooth easing effect
    repeat: -1, // Infinite loop
    yoyo: true // Alternate direction to make it more fluid
  });
}

// Apply the animation to both containers
animateFloating(document.querySelector('.floating-augustas-container'));
animateFloating(document.querySelector('.floating-daniel-container'));




gsap.registerPlugin(ScrollTrigger);

gsap.to(".floating-augustas-container", {
  scrollTrigger: {
    trigger: ".floating-augustas-container",
    start: "top bottom",
    end: "top 30%",
    scrub: 1, // Smooth scrub (in seconds)
  },
  bottom: 140, // Moves from 50px to 140px
  duration: 1,
  ease: "power1.inOut", // Smooth in-and-out motion
});


gsap.to(".floating-daniel-container", {
  scrollTrigger: {
    trigger: ".floating-daniel-container",
    start: "top bottom",
    end: "top 30%",
    scrub: 1, // Smooth scrub (in seconds)
  },
  top: 110, // Moves from 50px to 140px
  duration: 1,
  ease: "power1.inOut", // Smooth in-and-out motion
});



gsap.registerPlugin(ScrollTrigger);

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".website-sketch-title-box", // First element starts the animation
      start: "top bottom", // Animation starts when the first element is 90% in the viewport
      end: "top 30%",   // Ends when it's 50% in the viewport
      scrub: 0.8,       // Smooth scrolling effect
    },
  });

  // Fade in each element sequentially
  timeline
    .from(".website-sketch-title-box", { opacity: 0, y: -20, duration: 0.5 }) // Fades in from above
    .from(".website-sketch-alt-long", { opacity: 0, y: -20, duration: 0.5 }, "-=0.3") // Starts slightly before the previous finishes
    .from(".website-sketch-alt-short", { opacity: 0, y: -20, duration: 0.5 }, "-=0.3")
    .from(".website-sketch-cta", { opacity: 0, y: -20, duration: 0.5 }, "-=0.3")
    .from(".website-sketch-image", { opacity: 0, y: -20, duration: 0.5 }, "-=0.3");





    // Animate `.imgage-line-going-top` upwards
  gsap.to(".imgage-line-going-top", {
    scrollTrigger: {
      trigger: ".imgage-line-going-top",
      start: "top bottom",  // Starts when the element enters the viewport
      end: "bottom top",    // Ends when the element exits the viewport
      scrub: true,          // Smooth animation tied to scroll
      markers: true,        // Debugging markers
    },
    y: -200, // Moves 200px upwards
  });

// Initially position `.imgage-line-going-bottom` elements upwards
gsap.fromTo(".imgage-line-going-bottom", {
  y: -400, // Start from 400px above the normal position
}, {
  scrollTrigger: {
    trigger: ".imgage-line-going-bottom",
    start: "top bottom",  // Starts when the element enters the viewport
    end: "bottom top",    // Ends when the element exits the viewport
    scrub: true,          // Smooth animation tied to scroll
    markers: true,        // Debugging markers
  },
  y: -100,  // Ends at 100px downward (can adjust this value)
  duration: 1,
});