// load inwindow.onload = function () {
// Hiding the preloader after page load
window.addEventListener('load', function () {
  document.querySelector('.preloader').className += ' hidden';
});
// Your GSAP animations
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
  { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.3 }
);

gsap.fromTo("nav",
  { y: -40, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
);

gsap.fromTo(".nav-lottie-drag",
  { y: 20, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 2 }
);

gsap.fromTo(".slider-hero-container",
  { x: 200, opacity: 0 },
  { x: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.3 }
);

gsap.fromTo(".bck-container",
  { y: -window.innerHeight * 0.5, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.6, ease: "expo.Out" }
);























// Counter Section

gsap.utils.toArray(".counter").forEach((counter, index) => {
  gsap.fromTo(counter, { y: 50, opacity: 0 }, {
    y: 0, opacity: 1, duration: 1, ease: "power4.out",
    scrollTrigger: {
      trigger: counter,
      start: "top 90%",
      toggleActions: "play none none none"
    },
    stagger: window.innerWidth < 830 ? 0.3 * index : 0
  });
});

document.querySelectorAll(".section-title-container").forEach(container => {
  gsap.fromTo(container, { y: 50, opacity: 0 }, {
    y: 0, opacity: 1, duration: 1, ease: "power4.out",
    scrollTrigger: {
      trigger: container,
      start: "top 90%",
      toggleActions: "play none none none"
    }
  });
});











// Framework Section

const frameworkBoxes = gsap.utils.toArray("#framework-box");

if (window.innerWidth > 830) {
  gsap.fromTo(frameworkBoxes, {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".framework-container",
      start: "top 90%",
      toggleActions: "play none none none"
    },
    stagger: 0.15
  });
} else {
  frameworkBoxes.forEach((box) => {
    gsap.fromTo(box, {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: box,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
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



  


gsap.to(".pumping-circle", {
  scale: 3.2, // Expands to match 16px (16px / 6px)
  opacity: 0, // Fades out
  duration: 1.5, // Animation duration
  repeat: -1, // Infinite loop
  ease: "power1.out",
  transformOrigin: "center", // Keeps the scaling centered
});








