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
