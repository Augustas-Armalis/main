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

















// Testimonials









// Testimonials


document.addEventListener('DOMContentLoaded', () => {
  updateCarousel(); // Ensure the carousel is set up correctly on page load
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
    if (currentIndex < 0) currentIndex = slides.length - 2; // Show 2 slides on large screens
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













// Testimonials


// Testimonials

const videoContainer = document.querySelector(".video-container");
const closeButton = document.querySelector(".close-button");
const youtubePlayer = document.querySelector("#ytplayer");
const activators = document.querySelectorAll(".slide-activator-conatiner");

// Mapping of slide activator IDs to YouTube URLs
const videoUrls = {
  "ares-testimonial": "https://www.youtube.com/embed/G7qvBdtHAO4?autoplay=1&modestbranding=1&rel=0&controls=1&color=white",
  "motiejus-testimonial": "https://www.youtube.com/embed/kZNutM6e_9c?si=hz6tP-eboCXjWzKp?autoplay=1&modestbranding=1&rel=0&controls=1&color=white",
  "rick-testimonial": "https://www.youtube.com/embed/5sbWbfe_4XU?si=c2RrfDYKn9kWqz7f?autoplay=1&modestbranding=1&rel=0&controls=1&color=white",
  "maj-testimonial": "https://www.youtube.com/embed/dtAoDQiWrgA?si=tVTKCkIM7mMt13V9?autoplay=1&modestbranding=1&rel=0&controls=1&color=white",
};

// ?autoplay=1&modestbranding=1&rel=0&controls=1&color=white


function disableScroll() {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
}

// Function to enable scrolling
function enableScroll() {
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
  document.body.style.overflowX = "hidden";
  document.documentElement.style.overflowX = "hidden";
}

// Function to show the video container and set the video URL
const showVideoContainer = (videoId) => {
  const videoUrl = videoUrls[videoId];
  if (videoUrl) {
    youtubePlayer.src = `${videoUrl}?autoplay=1`; // Set video URL and autoplay
    videoContainer.style.display = "inherit"; // Show video container
    disableScroll(); // Disable scrolling
  }
};

// Function to hide the video container
const hideVideoContainer = () => {
  youtubePlayer.src = ""; // Clear the video URL
  videoContainer.style.display = "none"; // Hide video container
  enableScroll(); // Enable scrolling
};

// Event listener for each activator container
activators.forEach((activator) => {
  activator.addEventListener("click", () => {
    const activatorId = activator.id; // Get the ID of the clicked activator
    showVideoContainer(activatorId); // Show the video container with the corresponding video
  });
});

// Event listener for the close button
closeButton.addEventListener("click", hideVideoContainer);



// Select all instances of the elements
const playButtons = document.querySelectorAll(".slide-activator-conatiner");
const svg1Elements = document.querySelectorAll("#svg1");
const svg2Elements = document.querySelectorAll("#svg2");
const videoSliders = document.querySelectorAll(".on-top-of-video-slider");
const videos = document.querySelectorAll(".testimonial-video");

// Function to change the SVG and slow down the video
const changeSVG = (index) => {
  svg1Elements[index].style.opacity = "0";  // Fade out the first SVG
  svg2Elements[index].style.opacity = "1";  // Fade in the second SVG
  videoSliders[index].classList.add("hovered"); // Add class for background change and height increase

  // Slow down the video playback (transition it to a stop)
  videos[index].style.transition = "playback-rate 0.3s ease"; // Transition for playbackRate
  videos[index].playbackRate = 0;  // Slow down the video to a complete stop
};

// Function to restore to the first SVG and reset the video speed
const restoreSVG = (index) => {
  svg1Elements[index].style.opacity = "1";  // Fade in the first SVG
  svg2Elements[index].style.opacity = "0";  // Fade out the second SVG
  videoSliders[index].classList.remove("hovered"); // Remove class for background and height reset

  // Gradually reset the video playback to normal speed
  videos[index].style.transition = "playback-rate 0.3s ease"; // Transition for playbackRate
  videos[index].playbackRate = 1;  // Reset the video speed to normal
};

// Add event listeners for hover and touch events for each element
playButtons.forEach((playButton, index) => {
  playButton.addEventListener("mouseover", () => changeSVG(index));
  playButton.addEventListener("mouseout", () => restoreSVG(index));

  // For touch interactions (touchstart and touchend) on each play button
  playButton.addEventListener("touchstart", (event) => {
    changeSVG(index);
    // Prevent only the default action of touchstart if necessary, to avoid conflicting behavior.
    event.stopPropagation(); // Stop event from bubbling, but don't prevent default
  });

  playButton.addEventListener("touchend", (event) => {
    restoreSVG(index);
    // Prevent only the default action of touchend if necessary, to avoid conflicting behavior.
    event.stopPropagation(); // Stop event from bubbling, but don't prevent default
  });

  // Optional: Handle touchcancel as a fallback (e.g., when touch is interrupted)
  playButton.addEventListener("touchcancel", () => restoreSVG(index));
});








