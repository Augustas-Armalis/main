const videoContainer = document.querySelector(".video-container");
const closeButton = document.querySelector(".close-button");
const youtubePlayer = document.querySelector("#ytplayer");

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

// Function to show the video container
const showVideoContainer = () => {
  videoContainer.style.display = "inherit"; // Show video container
  disableScroll(); // Disable scrolling
};

// Function to hide the video container
const hideVideoContainer = () => {
  videoContainer.style.display = "none"; // Hide video container
  enableScroll(); // Enable scrolling
};

// Event listener for the close button
closeButton.addEventListener("click", hideVideoContainer);

// Event listener for the video element to show the video container
document.querySelectorAll(".video-itself-container").forEach((videoElement) => {
  videoElement.addEventListener("click", showVideoContainer);
});


document.querySelector('.back-home-button-holder').addEventListener('click', function() {
    window.location.href = 'https://augustas.co/';
});








document.addEventListener("DOMContentLoaded", () => {
  const desktopButton = document.getElementById("desktop-button");
  const mobileButton = document.getElementById("mobile-button");
  const desktopImage = document.querySelector(".website-desktop");
  const mobileImage = document.querySelector(".website-mobile");

  const activateButton = (buttonToActivate, buttonToDeactivate, imageToShow, imageToHide) => {
    buttonToActivate.classList.add("active");
    buttonToDeactivate.classList.remove("active");
    imageToShow.style.display = "block";
    imageToHide.style.display = "none";
  };

  // Check initial window width and set initial state
  if (window.innerWidth < 555) {
    activateButton(mobileButton, desktopButton, mobileImage, desktopImage);
  } else {
    activateButton(desktopButton, mobileButton, desktopImage, mobileImage);
  }

  desktopButton.addEventListener("click", () => {
    activateButton(desktopButton, mobileButton, desktopImage, mobileImage);
  });

  mobileButton.addEventListener("click", () => {
    activateButton(mobileButton, desktopButton, mobileImage, desktopImage);
  });
});





document.addEventListener("DOMContentLoaded", () => {
  const desktopButton = document.getElementById("desktop-button");
  const mobileButton = document.getElementById("mobile-button");

  // Add hover effect using pure JavaScript (only for mouse, not touch)
  const addMouseHoverEffect = (element) => {
    element.addEventListener("mouseenter", () => {
      if (!('ontouchstart' in window)) {  // Ensure it's not a touch device
        element.style.backgroundColor = "var(--gray3)"; // On mouse enter, change background color
      }
    });

    element.addEventListener("mouseleave", () => {
      element.style.backgroundColor = "transparent"; // On mouse leave, revert background color
    });
  };

  // Apply hover effect to both buttons
  addMouseHoverEffect(desktopButton);
  addMouseHoverEffect(mobileButton);
});










window.onload = function() {
  gsap.fromTo(".left-content-container",
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.1 }
  );

  gsap.fromTo(".right-content-container",
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
  );

  gsap.fromTo(".back-home-buttom-container",
    { y: -60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
  );
};




// GSAP animation for hover and touchstart
gsap.utils.toArray('.video-itself-container').forEach((container) => {
  const thumbnail = container.querySelector('.video-thumbnail');
  const playButton = container.querySelector('.play-button-cont');
  const playButtonImg = playButton.querySelector('img');

  // Mouseover and touchstart trigger
  const triggerEnter = () => {
      gsap.to(thumbnail, {
          opacity: 0.7,
          duration: 0,
          ease: "none"  // Smooth and fast ease
      });
      gsap.to(playButton, {
          backgroundColor: 'white',
          borderColor: 'white',
          duration: 0,
          ease: "none"  // Smooth and fast ease
      });
      gsap.to(playButtonImg, {
          filter: 'brightness(0%)',
          duration: 0,
          ease: "none"  // Smooth and fast ease
      });
  };

  // Mouseleave and touchend trigger
  const triggerLeave = () => {
      gsap.to(thumbnail, {
          opacity: 1,
          duration: 0,
          ease: "none"  // Smooth and fast ease
      });
      gsap.to(playButton, {
          backgroundColor: 'rgba(0, 0, 0, 0.70)',
          borderColor: 'var(--gray2)',
          duration: 0,
          ease: "none"  // Smooth and fast ease
      });
      gsap.to(playButtonImg, {
          filter: 'brightness(100%)',
          duration: 0,
          ease: "none"  // Smooth and fast ease
      });
  };

  // Add event listeners
  container.addEventListener('mouseover', triggerEnter);
  container.addEventListener('touchstart', triggerEnter);
  container.addEventListener('mouseleave', triggerLeave);
  container.addEventListener('touchend', triggerLeave);
});












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

    const targetContainers = document.querySelectorAll('.visit-button, .template-button, .website-view-container, .back-home-button-holder');

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

    const morphingContainers = document.querySelectorAll('.video-itself-container, .desktop-button, .mobile-button');

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
    document.querySelectorAll('.video-itself-container, .desktop-button, .mobile-button').forEach(container => {
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

