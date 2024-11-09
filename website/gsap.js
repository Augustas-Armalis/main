// Hero section on load
window.addEventListener('load', () => {
  const altContainer = document.querySelector('.alt-container');
  const underRectangleLayer = document.querySelector('#load-in-btn-hero');
  const logos = document.querySelector('.logos');
  const logosOpp = document.querySelector('.logos-opp');
  const logosDbb = document.querySelector('.logos-dbb');
  const nav = document.querySelector('nav'); // Select <nav> element
  const circle = document.querySelector('.circle'); // Select .circle element
  
  const screenWidth = window.innerWidth;
  const moveDistance = screenWidth;

  const timeline = gsap.timeline({ defaults: { ease: "power4.out", duration: 2 } });

  // Alt container animation
  timeline.fromTo(altContainer, { y: 100, opacity: 0 }, { y: 0, opacity: 1 });
  
  // New animation for <nav> element at the same time as altContainer
  timeline.fromTo(nav, { y: -100, opacity: 0 }, { y: 0, opacity: 1 }, "-=2"); 

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

  // New fade-in animation for .circle with a 2-second delay
  gsap.fromTo(circle, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1, ease: "power2.out" });
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
const nav = document.querySelector('nav');
const topThingNav = document.querySelector('.inside-container-nav');
const logoNav = document.querySelector('.logo-container');
const linkElementsMobile = document.querySelectorAll('.link-elements-mobile-nav a'); // Changed variable name

let isOpen = false;

gsap.set(topLine, { rotation: 0 });
gsap.set(bottomLine, { rotation: 0, y: 0 });

// Function to check screen size
function isMobile() {
  return window.innerWidth < 850;
}

burgerContainer.addEventListener('click', () => {
  if (isMobile()) {
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
        duration: 0.3,
      });

      gsap.to(logoNav, {
        marginLeft: "14px",
        duration: 0.3,
      });

      // Animate nav height back to initial value
      gsap.to(nav, {
        height: "48px", // Return to original height
        duration: 0.4,
      });

      gsap.to(burgerContainer, {
        marginRight: "6px", // Return to original height
        duration: 0.3,
      });

      // Animate the links to fly out (fade out) and move left in reverse order
      gsap.to(linkElementsMobile, {
        x: -100,
        opacity: 0,  // Ensure they fade out
        stagger: -0.05, // Negative stagger for reverse animation (last element first)
        duration: 0.3, // Fast 0.3s duration for the entire closing animation
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
        duration: 0.3,
      });

      gsap.to(logoNav, {
        marginLeft: "20px",
        duration: 0.3,
      });

      // Animate nav height to 400px
      gsap.to(nav, {
        height: "400px", // Open height
        duration: 0.4,
      });

      gsap.to(burgerContainer, {
        marginRight: "12px",
        duration: 0.3,
      });

      // Animate the links to fly in from the left with the original speed and easing
      gsap.fromTo(linkElementsMobile, 
        {
          x: -100, // Start off-screen
          opacity: 0, // Start invisible
        }, 
        {
          x: 0, // End at their original position
          opacity: 1, // Fade in
          stagger: 0.1, // Stagger the animation of the links
          duration: 0.5, // Original duration for smoothness
          ease: "power2.out", // Custom easing (start fast, slow down)
        }
      );
    }

    isOpen = !isOpen;
  }
});













const logoContainer = document.querySelector('.logo-container');
const logoImgNav = document.querySelector('.logo-img-nav');

// Apply active styles on pointerdown
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


// Revert to original state on pointerup
logoContainer.addEventListener('pointerup', () => {
  logoImgNav.style.transform = 'scale(1)';
  logoImgNav.style.opacity = '1';
});



const burgerMenuContainer = document.querySelector('.burger-menu-container');

// Apply active styles on pointerdown for burger menu
burgerMenuContainer.addEventListener('pointerdown', () => {
  burgerMenuContainer.style.transform = 'scale(0.97) translateZ(0)';
  burgerMenuContainer.style.opacity = '0.7';
});

// Revert to original state on pointerup for burger menu
burgerMenuContainer.addEventListener('pointerup', () => {
  burgerMenuContainer.style.transform = 'scale(1)';
  burgerMenuContainer.style.opacity = '1';
});




const linkElements = document.querySelectorAll('.link-elements-mobile-nav a');

// Apply active styles on pointerdown for each link
linkElements.forEach(link => {
  link.addEventListener('pointerdown', () => {
    link.style.transform = 'scale(0.97) translateZ(0)';
    link.style.opacity = '0.7';
  });

  // Revert to original state on pointerup for each link
  link.addEventListener('pointerup', () => {
    link.style.transform = 'scale(1)';
    link.style.opacity = '1';
  });
});





