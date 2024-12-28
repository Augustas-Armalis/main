// Counter up

const firstCard = 10000;
const secondCard = 100;
const thirdCard = 2;

const createOdometer = (el, value) => {
  const odometer = new Odometer({
    el: el,
    value: 0,
  });

  let hasRun = false;

  const options = {
    threshold: [0, 0.9],
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!hasRun) {
          odometer.update(value);
          hasRun = true;
        }
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(el);
};

const subscribersOdometer = document.querySelector(".first-odometer");
createOdometer(subscribersOdometer, firstCard);

const videosOdometer = document.querySelector(".second-odometer");
createOdometer(videosOdometer, secondCard);

const projectsOdometer = document.querySelector(".third-odometer");
createOdometer(projectsOdometer, thirdCard);

gsap.registerPlugin(ScrollTrigger);

const counterCards = document.querySelectorAll('.counter-card');

const animateCards = (card, index) => {
  gsap.fromTo(card,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      delay: isDesktop ? 0.1 * index : 0,
      scrollTrigger: {
        trigger: card,
        start: "top 100%",
        once: true
      }
    });
};

const isDesktop = window.innerWidth > 768;

counterCards.forEach((card, index) => {
  animateCards(card, index);
});





// Titles

gsap.utils.toArray('.section-title-container').forEach(container => {
  const [title, subtitle] = container.querySelectorAll('h2, h4');
  
  // Animate the container
  gsap.fromTo(container, 
    { y: 100, opacity: 0 }, 
    { 
      y: 0, 
      opacity: 1, 
      duration: 1, 
      ease: "power2.out", 
      delay: 0.2, 
      scrollTrigger: {
        trigger: container,
        start: "top bottom", // Animation starts as soon as the element enters the viewport
      }
    }
  );

  // Stagger animation for h2 and h4
  gsap.fromTo([title, subtitle],
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.5, 
      stagger: 0.3, // Adds the stagger effect
      scrollTrigger: {
        trigger: container,
        start: "top bottom", // Same start point for this animation
      }
    }
  );
});




// Framework Section


function animateFloating(container) {
  const animation = gsap.to(container, {
    x: "+=" + (Math.random() * 10 - 10),
    y: "+=" + (Math.random() * 10 - 10),
    rotation: "+=" + (Math.random() * 2 - 1),
    duration: 2 + Math.random() * 1,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    paused: true // Start the animation paused
  });

  // Observe the visibility of the container
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animation.play(); // Play when visible
      } else {
        animation.pause(); // Pause when not visible
      }
    });
  }, { threshold: 0.1 }); // Adjust threshold if needed

  observer.observe(container); // Start observing the container
}

animateFloating(document.querySelector('.floating-augustas-container'));
animateFloating(document.querySelector('.floating-daniel-container'));
animateFloating(document.querySelector('.ok-container-management'));
animateFloating(document.querySelector('.change-it-container-management'));




const frameworkBoxes = gsap.utils.toArray("#framework-box");

if (window.innerWidth > 830) {
  // For desktop
  frameworkBoxes.forEach((box, index) => {
    if (index < 2) {
      // First two boxes fly in as a group
      gsap.fromTo(
        frameworkBoxes.slice(0, 2),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: ".framework-container",
            start: "top bottom",
          },
          stagger: 0.2,
        }
      );
    } else {
      // Remaining boxes animate individually with a stagger effect
      gsap.fromTo(
        frameworkBoxes.slice(2, 4),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: frameworkBoxes[2], // Trigger animation for the 3rd box (start both)
            start: "top bottom",
          },
          stagger: 0.2, // Stagger effect for the 3rd and 4th boxes
        }
      );
    }
  });
} else {
  // For mobile (width <= 830px)
  frameworkBoxes.forEach((box) => {
    gsap.fromTo(
      box,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: box,
          start: "top bottom",
          toggleActions: "play none none none",
        },
      }
    );
  });
}



gsap.registerPlugin(ScrollTrigger);

gsap.to(".floating-augustas-container", {
  scrollTrigger: {
    trigger: ".floating-augustas-container",
    start: "top bottom",
    end: "top 30%",
    scrub: 1
  },
  bottom: 140,
  duration: 1,
  ease: "power1.inOut"
});

gsap.to(".floating-daniel-container", {
  scrollTrigger: {
    trigger: ".floating-daniel-container",
    start: "top bottom",
    end: "top 30%",
    scrub: 1
  },
  top: 110,
  duration: 1,
  ease: "power1.inOut"
});

const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".website-sketch-title-box",
    start: "top bottom",
    end: "top 40%",
    scrub: 0.8
  }
});

timeline
  .from(".website-sketch-title-box", { opacity: 0, y: -20, duration: 0.5 })
  .from(".website-sketch-alt-long", { opacity: 0, y: -20, duration: 0.5 }, "-=0.3")
  .from(".website-sketch-alt-short", { opacity: 0, y: -20, duration: 0.5 }, "-=0.3")
  .from(".website-sketch-cta", { opacity: 0, y: -20, duration: 0.5 }, "-=0.3")
  .from(".website-sketch-image", { opacity: 0, y: -20, duration: 0.5 }, "-=0.3");

gsap.to(".imgage-line-going-top", {
  scrollTrigger: {
    trigger: ".imgage-line-going-top",
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  },
  y: -200
});

gsap.fromTo(".imgage-line-going-bottom", {
  y: -400
}, {
  scrollTrigger: {
    trigger: ".imgage-line-going-bottom",
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  },
  y: -100,
  duration: 1
});

gsap.to(".coding-thingy-code-container pre", {
  scrollTrigger: {
    trigger: ".coding-thingy-code-container",
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  },
  y: -400,
  ease: "power1.out"
});

gsap.to(".focuss-liner-management", {
  opacity: 0,
  duration: 0.5,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});

const managementTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".p-container-management",
    start: "top bottom",
    end: "top 30%",
    scrub: 0.8,
    duration: 1
  }
});

managementTimeline
  .from(".p-container-management", { opacity: 0, x: -100, duration: 0.5 })
  .from(".text-below-container", { opacity: 0, x: -100, duration: 0.5 }, "-=0.3")
  .from(".image-container-beneath-management", { opacity: 0, x: -100, duration: 0.5 }, "-=0.3");

const okChangeTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".ok-container-management",
    start: "top bottom",
    end: "top 30%",
    scrub: 1,
    duration: 1
  }
});

okChangeTimeline
  .from(".ok-container-management", { opacity: 0, right: "-100%", duration: 1 })
  .from(".change-it-container-management", { opacity: 0, right: "-100%", duration: 1 }, "-=0.6");
