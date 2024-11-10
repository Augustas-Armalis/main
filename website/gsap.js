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


let lastScrollTop = 0;
const navis = document.querySelector('nav'); // Select the <nav> element (now renamed to navis)

// On page load, animate the <nav> element as it comes into view
window.addEventListener('load', () => {
  gsap.fromTo(navis, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 2, ease: "power4.out" });
});

window.addEventListener('scroll', () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scrolling down: hide the <nav> by moving it up and fading out
    gsap.to(navis, { y: -navis.offsetHeight, opacity: 0, duration: 0.6, ease: "power4.out" });
  } else {
    // Scrolling up: show the <nav> by moving it down and fading in
    gsap.to(navis, { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" });
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
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
const linkElementsMobile = document.querySelectorAll('.link-elements-mobile-nav a');
const backgroundBlur = document.querySelector('.background-blur-thing-nav-mobile');
const buttonNavContainerMobile = document.querySelector('#button-nav-container-mobile'); // Button container

let isOpen = false;

gsap.set(topLine, { rotation: 0 });
gsap.set(bottomLine, { rotation: 0, y: 0 });
gsap.set(buttonNavContainerMobile, { y: 50, opacity: 0 }); // Initial position below the view

// Function to check screen size
function isMobile() {
  return window.innerWidth < 850;
}

// Function to disable scrolling
function disableScroll() {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden'; // Prevent scrolling on html element
}

// Function to enable scrolling
function enableScroll() {
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto'; // Re-enable scrolling on html element
}


// Function to close the menu (refactored for reuse)
function closeMenu() {
  gsap.to(topLine, { rotation: 0, y: 0, duration: 0.15 });
  gsap.to(bottomLine, { rotation: 0, y: 0, duration: 0.15 });
  
  gsap.to(topThingNav, { marginTop: "9px", duration: 0.3 });
  gsap.to(logoNav, { marginLeft: "14px", duration: 0.3 });
  gsap.to(nav, { height: "48px", duration: 0.15 });
  gsap.to(burgerContainer, { marginRight: "6px", duration: 0.3 });
  
  // Animate links to fly out and fade in reverse order
  gsap.to(linkElementsMobile, {
    x: -100,
    opacity: 0,
    stagger: -0.05,
    duration: 0.3,
  });

  // Hide background blur on close
  gsap.to(backgroundBlur, {
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      gsap.set(backgroundBlur, { top: "-100vh" });
    }
  });

  // Animate button-nav-container-mobile to fly down and fade out
  gsap.to(buttonNavContainerMobile, {
    y: 50, // Move down
    opacity: 0,
    duration: 0.3,
  });

  enableScroll();  // Enable scroll when menu closes

  isOpen = false;
}

// Open/close toggle for the burger menu button
burgerContainer.addEventListener('click', () => {
  if (isMobile()) {
    if (isOpen) {
      closeMenu();
    } else {
      // Open animations
      gsap.to(topLine, { rotation: 45, y: 4, duration: 0.15 });
      gsap.to(bottomLine, { rotation: -45, y: -4, duration: 0.15 });
      
      gsap.to(topThingNav, { marginTop: "15px", duration: 0.3 });
      gsap.to(logoNav, { marginLeft: "20px", duration: 0.3 });
      gsap.to(nav, { height: "357px", duration: 0.15 });
      gsap.to(burgerContainer, { marginRight: "12px", duration: 0.3 });

      // Animate links to fly in from the left
      gsap.fromTo(linkElementsMobile, 
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" }
      );

      // Background blur jumps down instantly and fades in
      gsap.set(backgroundBlur, { top: "0" });
      gsap.to(backgroundBlur, { opacity: 1, duration: 0.3 });

      // Animate button-nav-container-mobile to fly up and fade in with a 0.2s delay
      gsap.to(buttonNavContainerMobile, 
        { y: 0, opacity: 1, delay: 0.2, duration: 0.5, ease: "power2.out" } // Fly up to initial position and fade in
      );

      disableScroll();  // Disable scroll when menu opens

      isOpen = true;
    }
  }
});

// Add click event to background blur, link elements, logo, and button to close the menu
backgroundBlur.addEventListener('click', () => {
  if (isOpen) closeMenu();
});
linkElementsMobile.forEach(link => link.addEventListener('click', () => {
  if (isOpen) closeMenu();
}));
logoNav.addEventListener('click', () => {
  if (isOpen) closeMenu();
});

// Add event listeners for touch and mouse release to close menu
buttonNavContainerMobile.addEventListener('mouseup', () => {
  if (isOpen) closeMenu(); // Close the menu on mouse button release
});

buttonNavContainerMobile.addEventListener('touchend', () => {
  if (isOpen) closeMenu(); // Close the menu on touch release
});

// Adding the correct link behavior for the button
buttonNavContainerMobile.addEventListener('click', (event) => {
  if (isOpen) closeMenu(); // Close the menu on click
  // Allow the default link behavior (navigate to the href)
  // event.preventDefault(); // Uncomment this if you want to stop the navigation
});











document.getElementById('button-nav-container-mobile').addEventListener('touchend', function(event) {
  event.preventDefault();  // Prevent the default link behavior
  window.location.href = "#"; // Replace with your custom link
});

document.getElementById('load-in-btn-hero').addEventListener('touchend', function(event) {
  event.preventDefault();  // Prevent the default link behavior
  window.location.href = "#"; // Replace with your custom link
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









