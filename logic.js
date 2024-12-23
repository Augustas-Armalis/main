function executeAbove1064px() {
  if (window.innerWidth > 1064) {
    console.clear();
    const circleElement = document.querySelector('.circle');
    const mouse = { x: 0, y: 0 };
    const previousMouse = { x: 0, y: 0 };
    const circle = { x: 0, y: 0 };
    let currentScale = 0;
    let currentAngle = 0;
    let rotationEnabled = true;  // To track if rotation is enabled or not
    let rotationTimeout = null;  // To hold the timeout for resetting the rotation
    let hoverTimeoutActive = false; // To track whether the hover timeout is currently active

    const fadeInOnLoadDuration = 1;
    const fadeHoverDuration = 0.5;

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

      if (mouseVelocity > 20 && rotationEnabled) {
        currentAngle = angle;
      }

      const rotateTransform = rotationEnabled ? `rotate(${currentAngle}deg)` : '';  // Apply rotation if enabled
      circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
      window.requestAnimationFrame(tick);
    };

    tick();

    const targetContainers = document.querySelectorAll('.under-rectangle-layer, .arrows-testimonials-container, .dots, nav, .slide, .offer-main-button, #button-nav-container-pricing, .call-main-button, #button-nav-container-chat, .image-blog-container, .blog-dots, .blog-arrows-testimonials-container, input, .button-container-news');

    targetContainers.forEach(container => {
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

    const morphingContainers = document.querySelectorAll('.slide-hero');

    morphingContainers.forEach(container => {
      container.addEventListener('mouseenter', () => {

        // Get the current position of the circle relative to the document


        // Get the hover text for the rectangle state
        const hoverText = container.getAttribute('data-hover-text');

        // Get the circle's width dynamically
        const circleWidth = circleElement.Width;

        // Apply the morphing effect with an offset for the rectangle state
        gsap.to(circleElement, {
          width: "auto",            // Set width to auto for the rectangle state
          height: "auto",           // Set height to auto for the rectangle state
          borderRadius: "8px",      // Make it a rectangle
          duration: 0.2,            // Duration of morphing animation
          ease: "power2.inOut",     // Smooth transition
          top: -20,                 // Apply the top offset
          left: 10, // Apply the left offset (circle width + 20px)
        });
        // Set the text inside the circle when in rectangle state
        const textElement = circleElement.querySelector('.circle-text');
        textElement.textContent = hoverText;

        // Animate the text to be visible
        gsap.to(textElement, {
          opacity: 1,
          scale: 1,
          margin: "5px",
          duration: 0.2
        });

        // Disable rotation while hovering
        rotationEnabled = false;

        // Cancel any previous timeouts
        if (rotationTimeout) {
          clearTimeout(rotationTimeout);
        }
        hoverTimeoutActive = true;  // Mark the timeout as active
      });

      container.addEventListener('mouseleave', () => {
        // Reset the circle to its original state (size and position)
        gsap.to(circleElement, {
          width: "12px",        // Reset width to 12px (circle size)
          height: "12px",       // Reset height to 12px (circle size)
          borderRadius: "50%",  // Reset to a circle
          duration: 0.2,        // Duration of the reset animation
          ease: "power2.inOut", // Smooth transition
          top: -6,  // Reset to the original top position
          left: -6, // Reset to the original left position
        });

        // Animate the text to fade out when the hover ends
        const textElement = circleElement.querySelector('.circle-text');
        gsap.to(textElement, {
          opacity: 0,
          scale: 0,
          duration: 0.2
        });

        // Cancel the current timeout if any new hover event occurs before the delay
        if (rotationTimeout) {
          clearTimeout(rotationTimeout);
        }

        // Delay the rotation reset for 0.2 seconds after the hover ends
        rotationTimeout = setTimeout(() => {
          rotationEnabled = true;  // Re-enable rotation after 0.2s
          hoverTimeoutActive = false;  // Mark the timeout as no longer active
        }, 200);
      });
    });


    // Prevent re-enabling rotation if hovering again before timeout is finished
    document.querySelectorAll('.view-box, .read-box').forEach(container => {
      container.addEventListener('mouseenter', () => {
        if (hoverTimeoutActive) {
          clearTimeout(rotationTimeout);  // Clear the existing timeout to prevent rotation from being re-enabled too soon
          hoverTimeoutActive = false;  // Mark timeout as no longer active
        }
      });
    });
  }
}

executeAbove1064px();
window.addEventListener('resize', executeAbove1064px);




















// slider
// const sliderContainerHero = document.querySelector('.slider-container-hero');
// const sliderHero = document.querySelector('.slider-hero');

// let isDragging = false;
// let startX;
// let translateX = 0;
// let velocity = 0;
// let animationFrame;

// sliderContainerHero.addEventListener('mousedown', (e) => startDrag(e));
// sliderContainerHero.addEventListener('mouseup', stopDrag);
// sliderContainerHero.addEventListener('mouseleave', stopDrag);
// sliderContainerHero.addEventListener('mousemove', (e) => drag(e));

// sliderContainerHero.addEventListener('touchstart', (e) => startDrag(e));
// sliderContainerHero.addEventListener('touchend', stopDrag);
// sliderContainerHero.addEventListener('touchmove', (e) => drag(e));

// function startDrag(e) {

//   isDragging = true;
//   startX = getPositionX(e) - translateX;
//   sliderContainerHero.style.cursor = 'grabbing';
//   sliderHero.style.transition = 'none';
//   cancelAnimationFrame(animationFrame);
// }

// function stopDrag() {
//   if (!isDragging) return;
//   isDragging = false;
//   sliderContainerHero.style.cursor = 'grab';
//   applyInertia();
// }

// function drag(e) {
//   if (!isDragging) return;
//   const currentPosition = getPositionX(e);
//   velocity = currentPosition - startX - translateX; // Track velocity
//   translateX = currentPosition - startX;

//   // Prevent dragging past the bounds (left and right)
//   const maxMove = Math.min(0, sliderContainerHero.offsetWidth - sliderHero.scrollWidth);
//   translateX = Math.min(Math.max(translateX, maxMove), 0);

//   sliderHero.style.transform = `translateX(${translateX}px)`;
// }

// function applyInertia() {
//   const damping = 0.92;  // Higher damping for more sensitive inertia
//   const minVelocity = 0.2; // Minimum velocity before inertia stops

//   function animate() {
//     velocity *= damping;
//     translateX += velocity;

//     // Boundaries
//     const maxMove = Math.min(0, sliderContainerHero.offsetWidth - sliderHero.scrollWidth);

//     // Prevent going past bounds during inertia
//     if (translateX > 0 || translateX < maxMove) {
//       velocity = 0;  // Stop inertia when boundaries are reached
//     }

//     if (Math.abs(velocity) > minVelocity) {
//       sliderHero.style.transform = `translateX(${translateX}px)`;
//       animationFrame = requestAnimationFrame(animate);
//     } else {
//       cancelAnimationFrame(animationFrame);
//       applyBounds();
//     }
//   }

//   animate();
// }

// function applyBounds() {
//   const maxMove = Math.min(0, sliderContainerHero.offsetWidth - sliderHero.scrollWidth);

//   // Ensure the slider stops at the boundaries
//   if (translateX > 0) {
//     translateX = 0;
//   } else if (translateX < maxMove) {
//     translateX = maxMove;
//   }

//   sliderHero.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
//   sliderHero.style.transform = `translateX(${translateX}px)`;
// }

// function getPositionX(e) {
//   return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
// }
const sliderHero = document.querySelector('.slider-container-hero');
const slidesHero = document.querySelector('.slider-hero');
let isDraggingHero = false;
let startXHero, scrollLeftHero, lastXHero, velocityHero, momentumIntervalHero;

// Start dragging (mousedown event)
sliderHero.addEventListener('mousedown', (e) => {
  isDraggingHero = true;
  startXHero = e.pageX - sliderHero.offsetLeft; // Mouse's starting position
  scrollLeftHero = sliderHero.scrollLeft; // Current scroll position
  lastXHero = startXHero;
  velocityHero = 0;
  sliderHero.style.cursor = 'grabbing'; // Change cursor to grabbing while dragging
  sliderHero.classList.add('dragging-hero');
  cancelAnimationFrame(momentumIntervalHero); // Cancel any momentum that might be active
});

// Stop dragging (mouseup event)
sliderHero.addEventListener('mouseup', () => {
  if (isDraggingHero) {
    isDraggingHero = false;
    sliderHero.style.cursor = 'grab'; // Change cursor back to grab
    sliderHero.classList.remove('dragging-hero');
    // Start inertia after mouse release
    momentumHero();
  }
});

// Stop dragging when mouse leaves the container
sliderHero.addEventListener('mouseleave', () => {
  if (isDraggingHero) {
    isDraggingHero = false;
    sliderHero.style.cursor = 'grab'; // Change cursor back to grab
    sliderHero.classList.remove('dragging-hero');
    // Start inertia after mouse leaves
    momentumHero();
  }
});

// Handle mouse move during dragging
sliderHero.addEventListener('mousemove', (e) => {
  if (!isDraggingHero) return;

  const xHero = e.pageX - sliderHero.offsetLeft; // Calculate the new mouse position
  const walkHero = (xHero - startXHero); // Calculate how far the mouse has moved horizontally
  sliderHero.scrollLeft = scrollLeftHero - walkHero; // Update the scroll position based on the mouse movement
  velocityHero = xHero - lastXHero; // Calculate the speed of the movement
  lastXHero = xHero;
});

// Inertia simulation after mouse release (momentum)
function momentumHero() {
  let lastTimeHero = Date.now();
  let scrollSpeedHero = -velocityHero; // Reverse the direction of the inertia

  // Momentum function using requestAnimationFrame for smooth inertia
  function momentumStepHero() {
    const now = Date.now();
    const deltaTimeHero = now - lastTimeHero;
    lastTimeHero = now;

    if (Math.abs(scrollSpeedHero) > 0.5) { // If the speed is significant enough to keep moving
      sliderHero.scrollLeft += scrollSpeedHero; // Scroll based on current speed
      scrollSpeedHero *= 0.95; // Gradually decrease the speed to simulate inertia (friction)
      momentumIntervalHero = requestAnimationFrame(momentumStepHero); // Continue inertia
    }
  }

  momentumStepHero(); // Start the inertia
}





// Rename slides to slideElements
const slideElements = document.querySelectorAll('.slide-hero');

slideElements.forEach(slide => {
  let isMouseDown = false;
  let startX = 0;

  // Detect mouse down event
  slide.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX;
  });

  // Detect mouse up event
  slide.addEventListener('mouseup', (e) => {
    if (isMouseDown && Math.abs(startX - e.pageX) < 10) {  // check if mouse moved less than 10px
      const link = slide.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    }
    isMouseDown = false;
  });

  // Optional: Reset mouse down state if mouse leaves the slide
  slide.addEventListener('mouseleave', () => {
    isMouseDown = false;
  });
});































// Hide/show the nav if scrolling
let lastScrollTop = 0;
const navis = document.querySelector('nav');
const heroSection = document.getElementById('hero-section-href');

// Initial animation for the nav
// gsap.fromTo(navis, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 2, ease: "power4.out" });

// Check if the hero section is in the viewport
function isHeroSectionVisible() {
  const rect = heroSection.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

window.addEventListener('scroll', () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (isHeroSectionVisible()) {
    // Keep the nav visible
    gsap.to(navis, { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" });
  } else {
    // Hide the nav if scrolling
    if (currentScroll > lastScrollTop) {
      gsap.to(navis, { y: -100, opacity: 0, duration: 0.6, ease: "power4.out" });
    } else {
      gsap.to(navis, { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" });
    }
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
          link.classList.add('active'); // Add active class when section is in view
        } else {
          link.classList.remove('active'); // Remove active class when section is out of view
        }
      }
    });
  },
  {
    threshold: [0], // Trigger when any part of the section crosses into the viewport
    rootMargin: '-5% 0px -50% 0px' // Adjust the root margin for top and bottom thresholds
  }
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

document.querySelectorAll('.question').forEach((question, index) => {
  const questionContainer = question.querySelector('.the-question-itself-container');
  const answerContainer = question.querySelector('.the-answer-itself-container');
  const arrow = question.querySelector('.faq-arrow');

  const initialHeight = questionContainer.scrollHeight;
  question.style.height = `${initialHeight}px`;

  // Make the first question open by default
  if (index === 0) {
    question.classList.add('active');  // Open the first question
    const contentHeight = initialHeight + answerContainer.scrollHeight;
    question.style.height = `${contentHeight}px`;  // Adjust height for the open state
    if (arrow) {
      arrow.style.transform = 'rotate(-180deg)';
      arrow.style.filter = 'brightness(200%)'; // Brighten the arrow
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
        arrow.style.filter = 'brightness(200%)'; // Brightens the arrow
      }
    } else {
      question.style.height = `${initialHeight}px`;
      question.style.transition = `height 0.5s cubic-bezier(0.22, 1, 0.36, 1)`;
      if (arrow) {
        arrow.style.transform = 'rotate(0deg)';
        arrow.style.filter = 'brightness(100%)'; // Resets to dimmer style
      }
    }
  });
});











































document.addEventListener('DOMContentLoaded', () => {
  updateBlogCarousel(); // Ensure the carousel is set up correctly on page load
});

// Testimonials section
let currentBlogIndex = 0;
const blogSlides = document.querySelectorAll('.blog-slide');
const blogDots = document.querySelectorAll('.blog-dot');
const blogCarousel = document.querySelector('.blog-carousel');

// Determine active slide count based on screen width
function getActiveSlideCount() {
  if (window.innerWidth > 1064) return 3; // 3 slides for large screens
  if (window.innerWidth > 700) return 2;  // 2 slides for medium screens
  return 1; // 1 slide for small screens
}

function moveBlogSlide(direction) {
  const activeSlideCount = getActiveSlideCount();
  currentBlogIndex += direction;

  // Wrap around logic for different active slide counts
  if (currentBlogIndex < 0) currentBlogIndex = blogSlides.length - activeSlideCount;
  if (currentBlogIndex >= blogSlides.length - (activeSlideCount - 1)) currentBlogIndex = 0;

  updateBlogCarousel();
}

function goToBlogSlide(index) {
  const activeSlideCount = getActiveSlideCount();
  currentBlogIndex = index % (blogSlides.length - (activeSlideCount - 1));
  updateBlogCarousel();
}

function updateBlogCarousel() {
  // Get the carousel's width in pixels
  const blogCarouselWidth = blogCarousel.offsetWidth;

  // Dynamically determine the gap size
  let gap; // Use 'let' so the value can change dynamically
  if (window.innerWidth > 1064) {
    gap = 4; // Gap for large screens (adjust as needed)
  } else if (window.innerWidth > 700) {
    gap = 8; // Gap for medium screens
  } else {
    gap = 16; // Gap for small screens
  }

  // Get the number of active slides
  const activeSlideCount = getActiveSlideCount();

  // Calculate the slide width based on active slide count
  const slideWidth = blogCarouselWidth / activeSlideCount;

  // Calculate the transform value in pixels
  const newTransform = -(currentBlogIndex * (slideWidth + gap));

  // Apply the transform
  blogCarousel.style.transform = `translateX(${newTransform}px)`;

  // Update slide classes
  blogSlides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (
      index >= currentBlogIndex &&
      index < currentBlogIndex + activeSlideCount
    ) {
      slide.classList.add('active');
    }
  });

  // Update dot classes
  blogDots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (
      index >= currentBlogIndex &&
      index < currentBlogIndex + activeSlideCount
    ) {
      dot.classList.add('active');
    }
  });
}

// Make sure the carousel updates on window resize
window.addEventListener('resize', () => {
  updateBlogCarousel();
});






// Testimonials

// Select all instances of the elements
const blogPlayButtons = document.querySelectorAll(".blog-slide-activator-container");
const blogSvg1Elements = document.querySelectorAll("#blog-svg1");
const blogSvg2Elements = document.querySelectorAll("#blog-svg2");
const blogVideoSliders = document.querySelectorAll(".blog-on-top-of-video-slider");
const blogVideos = document.querySelectorAll(".blog-testimonial-video");

// Function to change the SVG and slow down the video
const changeBlogSVG = (index) => {
  blogSvg1Elements[index].style.opacity = "0";  // Fade out the first SVG
  blogSvg2Elements[index].style.opacity = "1";  // Fade in the second SVG
  blogVideoSliders[index].classList.add("hovered"); // Add class for background change and height increase

  // Slow down the video playback (transition it to a stop)
  blogVideos[index].style.transition = "playback-rate 0.3s ease"; // Transition for playbackRate
  blogVideos[index].playbackRate = 0;  // Slow down the video to a complete stop
};

// Function to restore to the first SVG and reset the video speed
const restoreBlogSVG = (index) => {
  blogSvg1Elements[index].style.opacity = "1";  // Fade in the first SVG
  blogSvg2Elements[index].style.opacity = "0";  // Fade out the second SVG
  blogVideoSliders[index].classList.remove("hovered"); // Remove class for background and height reset

  // Gradually reset the video playback to normal speed
  blogVideos[index].style.transition = "playback-rate 0 .3s ease"; // Transition for playbackRate
  blogVideos[index].playbackRate = 1;  // Reset the video speed to normal
};

// Add event listeners for hover and touch events for each element
blogPlayButtons.forEach((playButton, index) => {
  playButton.addEventListener("mouseover", () => changeBlogSVG(index));
  playButton.addEventListener("mouseout", () => restoreBlogSVG(index));

  // For touch interactions (touchstart and touchend) on each play button
  playButton.addEventListener("touchstart", (event) => {
    changeBlogSVG(index);
    // Prevent only the default action of touchstart if necessary, to avoid conflicting behavior.
    event.stopPropagation(); // Stop event from bubbling, but don't prevent default
  });

  playButton.addEventListener("touchend", (event) => {
    restoreBlogSVG(index);
    // Prevent only the default action of touchend if necessary, to avoid conflicting behavior.
    event.stopPropagation(); // Stop event from bubbling, but don't prevent default
  });

  // Optional: Handle touchcancel as a fallback (e.g., when touch is interrupted)
  playButton.addEventListener("touchcancel", () => restoreBlogSVG(index));
});

// Get all the arrow buttons
const blogArrows = document.querySelectorAll('.blog-arrow');

// Add touchstart and touchend event listeners for each arrow button
blogArrows.forEach(arrow => {
  const arrowImage = arrow.querySelector('img'); // Get the SVG image inside the button

  // Handle touchstart
  arrow.addEventListener('touchstart', function () {
    // Apply styles to the button when touched
    arrow.style.backgroundColor = 'rgb(255, 255, 255)'; // Slight gray background
    arrow.style.transform = 'scale(0.95) translateZ(0)'; // Slight shrink effect
    arrow.style.opacity = '0.9'; // Dim the opacity slightly

    // Apply styles to the SVG (image inside the button)
    if (arrowImage) {
      arrowImage.style.filter = 'brightness(0)'; // Change SVG color to black
    }
  });

  // Handle touchend
  arrow.addEventListener('touchend', function () {
    // Reset button styles back to normal
    arrow.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Original background color
    arrow.style.transform = 'scale(1)'; // Reset the scale
    arrow.style.opacity = '1'; // Reset the opacity

    // Reset the SVG styles to normal
    if (arrowImage) {
      arrowImage.style.filter = 'none'; // Remove the filter, resetting the SVG color
    }
  });
});