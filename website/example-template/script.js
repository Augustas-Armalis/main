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








