function executeAbove1064px() {
  if (window.innerWidth > 1064) {
    console.clear();
    const circleElement = document.querySelector('.circle');
    const mouse = { x: 0, y: 0 };
    const previousMouse = { x: 0, y: 0 };
    const circle = { x: 0, y: 0 };
    let currentScale = 0;
    let currentAngle = 0;

    // Customizable fade-in duration for page load (in seconds)
    const fadeInOnLoadDuration = 1; // Change this value to adjust the fade speed on load (e.g., 0.5 for faster, 2 for slower)

    // Customizable fade-in/fade-out duration for mouse hover (in seconds)
    const fadeHoverDuration = 0.5; // Change this value to adjust the fade speed on mouse hover

    // Apply the fade-in effect on page load with the custom duration
    const fadeInCircleOnLoad = () => {
      circleElement.style.transition = `opacity ${fadeInOnLoadDuration}s ease-in-out`; // Use the fadeInOnLoadDuration variable
      circleElement.style.opacity = '1';
    };

    // Apply the fade-in effect with custom duration for mouse hover
    const fadeInCircle = () => {
      circleElement.style.transition = `opacity ${fadeHoverDuration}s ease-in-out`; // Use the fadeHoverDuration variable
      circleElement.style.opacity = '1';
    };

    // Apply the fade-out effect with custom duration for mouse hover
    const fadeOutCircle = () => {
      circleElement.style.transition = `opacity ${fadeHoverDuration}s ease-in-out`; // Use the fadeHoverDuration variable
      circleElement.style.opacity = '0';
    };

    // Track mouse movement to animate the circle
    window.addEventListener('mousemove', (e) => {
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
      if (mouseVelocity > 20) {
        currentAngle = angle;
      }
      const rotateTransform = `rotate(${currentAngle}deg)`;
      circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
      window.requestAnimationFrame(tick);
    };

    tick();

    const targetContainers = document.querySelectorAll('.under-rectangle-layer, .arrows-testimonials-container, .dots, nav, .slide, .offer-main-button, #button-nav-container-pricing, .call-main-button, #button-nav-container-chat');

    // Add event listeners to handle mouse enter and leave for fade-in/out
    targetContainers.forEach(container => {
      container.addEventListener('mouseenter', fadeOutCircle);
      container.addEventListener('mouseleave', fadeInCircle);
    });

    // Handle visibility change (when the page is hidden or visible)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        fadeOutCircle();
      } else {
        fadeInCircle();
      }
    });

    document.addEventListener("mouseenter", fadeInCircle);
    document.addEventListener("mouseleave", fadeOutCircle);

    // Trigger fade-in on load with custom duration
    fadeInCircleOnLoad();
  }
}

// Run the function when the page loads and on window resize
executeAbove1064px();
window.addEventListener('resize', executeAbove1064px);




// Hide/show the nav if scrolling

let lastScrollTop = 0;
const navis = document.querySelector('nav');
let isScrollingEnabled = false;


gsap.fromTo(navis, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 2, ease: "power4.out" });

setTimeout(() => {
  isScrollingEnabled = true;
}, 3000);


window.addEventListener('scroll', () => {
  if (!isScrollingEnabled) return;

  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    gsap.to(navis, { y: -100, opacity: 0, duration: 0.6, ease: "power4.out" });
  } else {
    gsap.to(navis, { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" });
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});




// Select all links in the links-container
const links = document.querySelectorAll('.links-container a');

// Map each link to its corresponding section
const sectionLinkMap = {};
links.forEach(link => {
  const href = link.getAttribute('href');
  const sectionId = href.startsWith('#') ? href.slice(1) : null;
  if (sectionId) {
    sectionLinkMap[sectionId] = link;
  }
});

// Intersection Observer to track section visibility
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      const link = sectionLinkMap[entry.target.id];
      if (link) {
        if (entry.isIntersecting) {
          // Add active class immediately when the section is in view
          link.classList.add('active');
        } else {
          // Remove active class immediately when the section is out of view
          link.classList.remove('active');
        }
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px' } // Adjusted to trigger as soon as 10% of section is in view
);

// Observe sections corresponding to the links
Object.keys(sectionLinkMap).forEach(sectionId => {
  const section = document.getElementById(sectionId);
  if (section) {
    observer.observe(section);
  }
});













// Counter Section

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter .count');

  const startCounting = (counter, duration) => {
    const target = +counter.parentElement.getAttribute('data-target');
    const incrementPerFrame = target / (duration / 16);
    let current = 0;

    const updateCount = () => {
      current += incrementPerFrame;
      counter.querySelector('.counter-number').innerText = Math.round(current);

      if (current < target) {
        requestAnimationFrame(updateCount);
      } else {
        counter.querySelector('.counter-number').innerText = target;
      }
    };

    updateCount();
  };

  const observerOptions = { threshold: 0.2 };
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector('.count');
        startCounting(counter, 1000);
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  counters.forEach(counter => {
    const counterContainer = counter.parentElement;
    observer.observe(counterContainer);
  });
});
















// Framework Section

function changeTextBasedOnWidth() {
  const frameworkText = document.getElementById('framework-change-text-framework');
  const developmentText = document.getElementById('framework-change-text-development');

  if (window.innerWidth < 1064) {
    frameworkText.innerHTML = "Professional website design, made<br>Exclusively for your business needs";
    developmentText.innerHTML = "Custom-coded website ensures<br>The best quality out of everyone";
  } else {
    frameworkText.innerHTML = "Compelling website design, done according<br>To your business’s preferences and wants";
    developmentText.innerHTML = "Custom-coded website assures speed, security<br>And the best quality amongst everybody else";
  }
}

window.addEventListener('load', changeTextBasedOnWidth);
window.addEventListener('resize', changeTextBasedOnWidth);

function animateFloating(container) {
  gsap.to(container, {
    x: "+=" + (Math.random() * 10 - 10),
    y: "+=" + (Math.random() * 10 - 10),
    rotation: "+=" + (Math.random() * 2 - 1),
    duration: 2 + Math.random() * 1,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });
}

animateFloating(document.querySelector('.floating-augustas-container'));
animateFloating(document.querySelector('.floating-daniel-container'));
animateFloating(document.querySelector('.ok-container-management'));
animateFloating(document.querySelector('.change-it-container-management'));













// Testimonials section

document.addEventListener('DOMContentLoaded', () => {
  updateCarousel(); // Ensure the carousel is set up correctly on page load
});

// Testimonials section
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const carousel = document.querySelector('.carousel');

// Adjust for two slides active above 1064px
function isLargeScreen() {
  return window.innerWidth > 1064;
}

function moveSlide(direction) {
  if (isLargeScreen()) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = slides.length - 2; // 2 because we are showing 2 slides
    if (currentIndex >= slides.length - 1) currentIndex = 0; // Wrap to the first slide when you reach the end
  } else {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    if (currentIndex >= slides.length) currentIndex = 0;
  }

  updateCarousel();
}

function goToSlide(index) {
  if (isLargeScreen()) {
    currentIndex = index;
  } else {
    currentIndex = index % slides.length;
  }
  updateCarousel();
}

function updateCarousel() {
  // Get the carousel's width in pixels
  const carouselWidth = carousel.offsetWidth;

  // Dynamically determine the gap size
  const gap = isLargeScreen() ? 8 : 16;

  // Calculate the new transform value dynamically
  const slideWidth = isLargeScreen() ? carouselWidth / 2 : carouselWidth; // 50% or 100% of carousel width

  // Calculate the transform value in pixels
  const newTransform = -(currentIndex * (slideWidth + gap));

  // Apply the transform
  carousel.style.transform = `translateX(${newTransform}px)`;

  // Update slide classes
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index === currentIndex || (isLargeScreen() && (index === currentIndex + 1))) {
      slide.classList.add('active');
    }
  });

  // Update dot classes
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === currentIndex || (isLargeScreen() && (index === currentIndex + 1))) {
      dot.classList.add('active');
    }
  });
}

// Make sure the carousel updates on window resize
window.addEventListener('resize', () => {
  updateCarousel();
});












// Testimonials



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








// Testimonials

const videoContainer = document.querySelector(".video-container");
const closeButton = document.querySelector(".close-button");
const youtubePlayer = document.querySelector("#ytplayer");
const activators = document.querySelectorAll(".slide-activator-conatiner");

// Mapping of slide activator IDs to YouTube URLs
const videoUrls = {
  "ares-testimonial": "https://www.youtube.com/embed/G7qvBdtHAO4",
  "motiejus-testimonial": "https://www.youtube.com/embed/kZNutM6e_9c?si=hz6tP-eboCXjWzKp",
  "rick-testimonial": "https://www.youtube.com/embed/5sbWbfe_4XU?si=c2RrfDYKn9kWqz7f",
};

// Function to disable scrolling
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























// Accordion

