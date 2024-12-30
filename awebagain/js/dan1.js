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

// Select all elements with the class .hover-touch-card
const hoverTouchCards = document.querySelectorAll('.counter-card');

// Function to apply the hover effect
function addHoverEffect(event) {
  event.currentTarget.style.transition = 'background-color 0.3s ease';
  event.currentTarget.style.backgroundColor = 'var(--gray5)';
}

// Function to remove the hover effect
function removeHoverEffect(event) {
  event.currentTarget.style.backgroundColor = '';
}

// Add event listeners for mouseover, mouseout, touchstart, and touchend
hoverTouchCards.forEach(card => {
  card.addEventListener('mouseover', addHoverEffect);
  card.addEventListener('mouseout', removeHoverEffect);
  card.addEventListener('touchstart', addHoverEffect);
  card.addEventListener('touchend', removeHoverEffect);
});






// Titles

gsap.utils.toArray('.section-title-container').forEach(container => {
  const [title, subtitle] = container.querySelectorAll('h2, h4');

  gsap.fromTo(container,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
      }
    }
  );

  gsap.fromTo([title, subtitle],
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.3,
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
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
    paused: true
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animation.play();
      } else {
        animation.pause();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(container);
}

animateFloating(document.querySelector('.floating-augustas-container'));
animateFloating(document.querySelector('.floating-daniel-container'));
animateFloating(document.querySelector('.ok-container-management'));
animateFloating(document.querySelector('.change-it-container-management'));

const frameworkFirst = gsap.utils.toArray(".framework-box-first");
const frameworkSecond = gsap.utils.toArray(".framework-box-second");
const frameworkBoxes = gsap.utils.toArray("#framework-box");

if (window.innerWidth > 830) {
  gsap.fromTo(
    frameworkFirst,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".framework-box-first",
        start: "top bottom",
        toggleActions: "play none none none"
      },
      stagger: 0.1
    }
  );

  gsap.fromTo(
    frameworkSecond,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".framework-box-second",
        start: "top bottom",
        toggleActions: "play none none none"
      },
      stagger: 0.1
    }
  );
} else {
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
          toggleActions: "play none none none"
        }
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



















// Testimonial section

const videoUrls = {
  "ares-testimonial": "https://www.youtube.com/embed/G7qvBdtHAO4?autoplay=1&modestbranding=1&rel=0&controls=1&color=white",
  "motiejus-testimonial": "https://www.youtube.com/embed/kZNutM6e_9c?si=hz6tP-eboCXjWzKp?autoplay=1&modestbranding=1&rel=0&controls=1&color=white",
  "rick-testimonial": "https://www.youtube.com/embed/5sbWbfe_4XU?si=c2RrfDYKn9kWqz7f?autoplay=1&modestbranding=1&rel=0&controls=1&color=white",
  "maj-testimonial": "https://www.youtube.com/embed/dtAoDQiWrgA?si=tVTKCkIM7mMt13V9?autoplay=1&modestbranding=1&rel=0&controls=1&color=white"
};

// ?autoplay=1&modestbranding=1&rel=0&controls=1&color=white

gsap.fromTo(
  ".carousel-container",
  { x: 200, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".slide",
      start: "top 90%",
      once: true
    }
  }
);

gsap.fromTo(
  ".dot",
  { y: 50, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".bottom-navigation-container-tesimonials",
      start: "top bottom",
      once: true
    }
  }
);

gsap.fromTo(
  ".arrow",
  { y: 50, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".bottom-navigation-container-tesimonials",
      start: "top bottom",
      once: true
    }
  }
);

document.addEventListener('DOMContentLoaded', () => {
  updateCarousel();
});

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const carousel = document.querySelector('.carousel');

function isLargeScreen() {
  return window.innerWidth > 1064;
}

function moveSlide(direction) {
  if (isLargeScreen()) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = slides.length - 2;
    if (currentIndex >= slides.length - 1) currentIndex = 0;
  } else {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    if (currentIndex >= slides.length) currentIndex = 0;
  }
  updateCarousel();
}

function goToSlide(index) {
  currentIndex = index % slides.length;
  updateCarousel();
}

function updateCarousel() {
  const carouselWidth = carousel.offsetWidth;
  const gap = isLargeScreen() ? 8 : 16;
  const slideWidth = isLargeScreen() ? carouselWidth / 2 : carouselWidth;
  const newTransform = -(currentIndex * (slideWidth + gap));

  carousel.style.transform = `translateX(${newTransform}px)`;

  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index === currentIndex || (isLargeScreen() && index === currentIndex + 1)) {
      slide.classList.add('active');
    }
  });

  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === currentIndex || (isLargeScreen() && index === currentIndex + 1)) {
      dot.classList.add('active');
    }
  });
}

window.addEventListener('resize', updateCarousel);

const videoContainer = document.querySelector(".video-container");
const closeButton = document.querySelector(".close-button");
const youtubePlayer = document.querySelector("#ytplayer");
const activators = document.querySelectorAll(".slide-activator-conatiner");

function disableScroll() {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
}

function enableScroll() {
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
  document.body.style.overflowX = "hidden";
  document.documentElement.style.overflowX = "hidden";
}

const showVideoContainer = (videoId) => {
  const videoUrl = videoUrls[videoId];
  if (videoUrl) {
    youtubePlayer.src = `${videoUrl}?autoplay=1`;
    videoContainer.style.display = "inherit";
    disableScroll();
  }
};

const hideVideoContainer = () => {
  youtubePlayer.src = "";
  videoContainer.style.display = "none";
  enableScroll();
};

activators.forEach((activator) => {
  activator.addEventListener("click", () => {
    const activatorId = activator.id;
    showVideoContainer(activatorId);
  });
});

closeButton.addEventListener("click", hideVideoContainer);

const playButtons = document.querySelectorAll(".slide-activator-conatiner");
const svg1Elements = document.querySelectorAll("#svg1");
const svg2Elements = document.querySelectorAll("#svg2");
const videoSliders = document.querySelectorAll(".on-top-of-video-slider");
const videos = document.querySelectorAll(".testimonial-video");

const changeSVG = (index) => {
  svg1Elements[index].style.opacity = "0";
  svg2Elements[index].style.opacity = "1";
  videoSliders[index].classList.add("hovered");
  videos[index].style.transition = "playback-rate 0.3s ease";
  videos[index].playbackRate = 0;
};

const restoreSVG = (index) => {
  svg1Elements[index].style.opacity = "1";
  svg2Elements[index].style.opacity = "0";
  videoSliders[index].classList.remove("hovered");
  videos[index].style.transition = "playback-rate 0.3s ease";
  videos[index].playbackRate = 1;
};

playButtons.forEach((playButton, index) => {
  playButton.addEventListener("mouseover", () => changeSVG(index));
  playButton.addEventListener("mouseout", () => restoreSVG(index));

  playButton.addEventListener("touchstart", (event) => {
    changeSVG(index);
    event.stopPropagation();
  });

  playButton.addEventListener("touchend", (event) => {
    restoreSVG(index);
    event.stopPropagation();
  });

  playButton.addEventListener("touchcancel", () => restoreSVG(index));
});

const observerOptions = {
  root: null,
  threshold: 0
};

const stopVideoWhenNotVisible = (entries, observer) => {
  entries.forEach(entry => {
    const video = entry.target;
    if (entry.isIntersecting) {
      video.play();
    } else {
      video.pause();
    }
  });
};

const observer = new IntersectionObserver(stopVideoWhenNotVisible, observerOptions);

videos.forEach(video => {
  observer.observe(video);
});

const arrows = document.querySelectorAll('.arrow');

arrows.forEach(arrow => {
  const arrowImage = arrow.querySelector('img');

  arrow.addEventListener('touchstart', function () {
    arrow.style.backgroundColor = 'rgb(255, 255, 255)';
    arrow.style.opacity = '0.9';
    if (arrowImage) {
      arrowImage.style.filter = 'brightness(0)';
    }
  });

  arrow.addEventListener('touchend', function () {
    arrow.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    arrow.style.opacity = '1';
    if (arrowImage) {
      arrowImage.style.filter = 'none';
    }
  });
});












// Plans hover effect spec

const grayPlansCards = document.querySelectorAll('.gray-plans-card');

function addStarBrightness(event) {
  const starPlans = event.currentTarget.querySelector('.star-plans');
  if (starPlans) {
    starPlans.style.filter = 'brightness(300%)';
  }
}

function removeStarBrightness(event) {
  const starPlans = event.currentTarget.querySelector('.star-plans');
  if (starPlans) {
    starPlans.style.filter = '';
  }
}

grayPlansCards.forEach(card => {
  card.addEventListener('mouseover', addStarBrightness);
  card.addEventListener('mouseout', removeStarBrightness);
  card.addEventListener('touchstart', addStarBrightness);
  card.addEventListener('touchend', removeStarBrightness);
});














// FAQ accordion

document.querySelectorAll('.question').forEach((question, index) => {
  const questionContainer = question.querySelector('.the-question-itself-container');
  const answerContainer = question.querySelector('.the-answer-itself-container');
  const arrow = question.querySelector('.faq-arrow');

  const initialHeight = questionContainer.scrollHeight;
  question.style.height = `${initialHeight}px`;

  if (index === 0) {
    question.classList.add('active');
    const contentHeight = initialHeight + answerContainer.scrollHeight;
    question.style.height = `${contentHeight}px`;
    if (arrow) {
      arrow.style.transform = 'rotate(-180deg)';
      arrow.style.filter = 'brightness(200%)';
    }
  }

  questionContainer.addEventListener('click', () => {
    const isOpen = question.classList.toggle('active');
    const contentHeight = initialHeight + answerContainer.scrollHeight;

    if (isOpen) {
      question.style.height = `${contentHeight}px`;
      question.style.transition = `height 0.5s cubic-bezier(0.22, 1, 0.36, 1)`;
      if (arrow) {
        arrow.style.transform = 'rotate(-180deg)';
        arrow.style.filter = 'brightness(200%)';
      }
    } else {
      question.style.height = `${initialHeight}px`;
      question.style.transition = `height 0.5s cubic-bezier(0.22, 1, 0.36, 1)`;
      if (arrow) {
        arrow.style.transform = 'rotate(0deg)';
        arrow.style.filter = 'brightness(100%)';
      }
    }
  });
});

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".question").forEach((question) => {
  gsap.fromTo(
    question,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: question,
        start: "top bottom", // Start animation when the top of the element is 80% down the viewport
        toggleActions: "play none none none", // Play animation on enter
      },
    }
  );
});









