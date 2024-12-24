const imageSources = {
  desktop: 'images/desktop.webp',
  mobile: 'images/mobile.webp',
  thumbnail: 'images/thumbnail.webp'
};

const visitLink = 'https://example.com';
const youtubeVideo = 'https://www.youtube.com/embed/5sbWbfe_4XU?si=c2RrfDYKn9kWqz7f';

document.querySelector('.website-desktop').src = imageSources.desktop;
document.querySelector('.website-mobile').src = imageSources.mobile;
document.querySelector('.video-thumbnail').src = imageSources.thumbnail;
document.querySelector('.visit-button').href = visitLink;
document.querySelector('#ytplayer').src = youtubeVideo;

// ---------------------------------------------------------------------

const videoContainer = document.querySelector(".video-container");
const closeButton = document.querySelector(".close-button");
const youtubePlayer = document.querySelector("#ytplayer");
const desktopButton = document.getElementById("desktop-button");
const mobileButton = document.getElementById("mobile-button");
const desktopImage = document.querySelector(".website-desktop");
const mobileImage = document.querySelector(".website-mobile");
const backHomeButton = document.querySelector('.back-home-button-holder');

// Function to toggle scrolling
const toggleScroll = (disable) => {
  const overflowValue = disable ? "hidden" : "";
  document.body.style.overflow = overflowValue;
  document.documentElement.style.overflow = overflowValue;
  document.body.style.overflowX = overflowValue;
  document.documentElement.style.overflowX = overflowValue;
};

// Function to toggle video container visibility
const toggleVideoContainer = (show) => {
  videoContainer.style.display = show ? "inherit" : "none";
  toggleScroll(show);
};

// Event listener for closing the video container
closeButton.addEventListener("click", () => toggleVideoContainer(false));

// Event listeners for showing the video container
document.querySelectorAll(".video-itself-container").forEach((videoElement) => {
  videoElement.addEventListener("click", () => toggleVideoContainer(true));
});

// Event listener for the back home button
backHomeButton.addEventListener('click', () => window.location.href = 'https://augustas.co/');

// Function to activate mobile/desktop buttons
const activateButton = (activeBtn, inactiveBtn, showImg, hideImg) => {
  activeBtn.classList.add("active");
  inactiveBtn.classList.remove("active");
  showImg.style.display = "block";
  hideImg.style.display = "none";
};

// Function to handle button activation on page load and resize
const setupButtons = () => {
  if (window.innerWidth < 555) {
    activateButton(mobileButton, desktopButton, mobileImage, desktopImage);
  } else {
    activateButton(desktopButton, mobileButton, desktopImage, mobileImage);
  }

  desktopButton.addEventListener("click", () => activateButton(desktopButton, mobileButton, desktopImage, mobileImage));
  mobileButton.addEventListener("click", () => activateButton(mobileButton, desktopButton, mobileImage, desktopImage));
};

// Hover effect function
const addHoverEffect = (element) => {
  const hoverIn = () => element.style.backgroundColor = "var(--gray3)";
  const hoverOut = () => element.style.backgroundColor = "transparent";
  
  element.addEventListener("mouseenter", hoverIn);
  element.addEventListener("mouseleave", hoverOut);
  element.addEventListener("touchstart", hoverIn);
  element.addEventListener("touchend", hoverOut);
};

// GSAP Animations for content and buttons
gsap.fromTo(".left-content-container", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" });
gsap.fromTo(".right-content-container", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.1 });
gsap.fromTo(".back-home-buttom-container", { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.1 });

// GSAP animations for video thumbnail hover/touch
gsap.utils.toArray('.video-itself-container').forEach((container) => {
  const thumbnail = container.querySelector('.video-thumbnail');
  const playButton = container.querySelector('.play-button-cont');
  const playButtonImg = playButton.querySelector('img');

  const triggerEnter = () => {
    gsap.to(thumbnail, { opacity: 0.7, duration: 0 });
    gsap.to(playButton, { backgroundColor: 'white', borderColor: 'white', duration: 0 });
    gsap.to(playButtonImg, { filter: 'brightness(0%)', duration: 0 });
  };

  const triggerLeave = () => {
    gsap.to(thumbnail, { opacity: 1, duration: 0 });
    gsap.to(playButton, { backgroundColor: 'rgba(0, 0, 0, 0.70)', borderColor: 'var(--gray2)', duration: 0 });
    gsap.to(playButtonImg, { filter: 'brightness(100%)', duration: 0 });
  };

  container.addEventListener('mouseover', triggerEnter);
  container.addEventListener('touchstart', triggerEnter);
  container.addEventListener('mouseleave', triggerLeave);
  container.addEventListener('touchend', triggerLeave);
});

document.addEventListener("DOMContentLoaded", () => {
  setupButtons();
  addHoverEffect(desktopButton);
  addHoverEffect(mobileButton);
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
    let rotationEnabled = true;
    let rotationTimeout = null;
    let hoverTimeoutActive = false;

    const fadeInOnLoadDuration = 0.2; // Shortened fade-in time
    const fadeHoverDuration = 0.2; // Shortened fade-in/out time
    const rectangleShowUpTo = '.video-itself-container, .desktop-button, .mobile-button';  // Renamed variable
    const circleDissapearTo = document.querySelectorAll('.visit-button, .template-button, .website-view-container, .back-home-button-holder');  // Renamed variable

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

      const rotateTransform = rotationEnabled ? `rotate(${currentAngle}deg)` : '';
      circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
      window.requestAnimationFrame(tick);
    };

    tick();

    // Reuse the rectangleShowUpTo variable here
    circleDissapearTo.forEach(container => {
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

    const morphingContainers = document.querySelectorAll(rectangleShowUpTo);  // Reuse again
    morphingContainers.forEach(container => {
      container.addEventListener('mouseenter', () => {
        const hoverText = container.getAttribute('data-hover-text');
        const circleWidth = circleElement.Width;

        gsap.to(circleElement, {
          width: "auto",
          height: "auto",
          borderRadius: "8px",
          duration: 0.2,
          ease: "power2.inOut",
          top: -20,
          left: 10,
        });

        const textElement = circleElement.querySelector('.circle-text');
        textElement.textContent = hoverText;

        gsap.to(textElement, {
          opacity: 1,
          scale: 1,
          margin: "5px",
          duration: 0.2
        });

        rotationEnabled = false;

        if (rotationTimeout) {
          clearTimeout(rotationTimeout);
        }
        hoverTimeoutActive = true;
      });

      container.addEventListener('mouseleave', () => {
        gsap.to(circleElement, {
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          duration: 0.2,
          ease: "power2.inOut",
          top: -6,
          left: -6,
        });

        const textElement = circleElement.querySelector('.circle-text');
        gsap.to(textElement, {
          opacity: 0,
          scale: 0,
          duration: 0.2
        });

        if (rotationTimeout) {
          clearTimeout(rotationTimeout);
        }

        rotationTimeout = setTimeout(() => {
          rotationEnabled = true;
          hoverTimeoutActive = false;
        }, 200);
      });
    });

    // Prevent re-enabling rotation if hovering again before timeout is finished
    document.querySelectorAll(rectangleShowUpTo).forEach(container => {
      container.addEventListener('mouseenter', () => {
        if (hoverTimeoutActive) {
          clearTimeout(rotationTimeout);
          hoverTimeoutActive = false;
        }
      });
    });
  }
}

executeAbove1064px();
window.addEventListener('resize', executeAbove1064px);
