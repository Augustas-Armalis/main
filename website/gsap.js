






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
animateFloating(document.querySelector('.ok-container-management'));
animateFloating(document.querySelector('.change-it-container-management'));




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
    end: "top 40%",   // Ends when it's 50% in the viewport
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
    scrub: 1,          // Smooth animation tied to scroll
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
    scrub: 1,          // Smooth animation tied to scroll
  },
  y: -100,  // Ends at 100px downward (can adjust this value)
  duration: 1,
});




gsap.to(".coding-thingy-code-container pre", {
  scrollTrigger: {
    trigger: ".coding-thingy-code-container", // Triggers when the container enters the viewport
    start: "top bottom",  // Start animation when the container top hits the bottom of the viewport
    end: "bottom top",    // End animation when the container bottom exits the top of the viewport
    scrub: 1,          // Smoothly ties animation to scroll
  },
  y: -400, // Moves the text 200px downward
  ease: "power1.out", // Smooth easing for a natural feel
});



gsap.to(".focuss-liner-management", {
  opacity: 0,
  duration: 0.5, 
  repeat: -1, 
  yoyo: true,
  ease: "power1.inOut"
});



gsap.registerPlugin(ScrollTrigger);

// Animation for p-container-management and its children
const managementTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".p-container-management", // Starts when this element enters the viewport
    start: "top bottom", // Animation starts when the top of the element reaches the bottom of the viewport
    end: "top 30%", // Ends when it's 30% from the top of the viewport
    scrub: 0.8, // Smooth scroll effect
    duration: 1,
  },
});

managementTimeline
  .from(".p-container-management", { opacity: 0, x: -100, duration: 0.5 }) // Fades in from left
  .from(".text-below-container", { opacity: 0, x: -100, duration: 0.5 }, "-=0.3") // Starts before the previous ends
  .from(".image-container-beneath-management", { opacity: 0, x: -100, duration: 0.5 }, "-=0.3");





  gsap.registerPlugin(ScrollTrigger);

  // Animation for ok-container-management and change-it-container-management
  const okChangeTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".ok-container-management", // Trigger when .ok-container-management enters the viewport
      start: "top bottom", // Animation starts when the top of the element reaches the bottom of the viewport
      end: "top 30%", // Ends when it's 30% from the top of the viewport
      scrub: 1, // Smooth scroll effect
      duration: 1,
    },
  });
  
  okChangeTimeline
    .from(".ok-container-management", { opacity: 0, right: "-100%", duration: 1 }) // Fades in from right
    .from(".change-it-container-management", { opacity: 0, right: "-100%", duration: 1 }, "-=0.6"); // Starts after .ok-container-management with a delay of 0.3 seconds
  