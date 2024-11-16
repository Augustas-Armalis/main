// Function to change text based on screen width
function changeTextBasedOnWidth() {
  const frameworkText = document.getElementById('framework-change-text-framework');
  const developmentText = document.getElementById('framework-change-text-development');

  if (window.innerWidth < 1064) {
    // Change the text for small screens
    frameworkText.innerHTML = "Tailored framework design<br>For your unique business needs";
    developmentText.innerHTML = "Custom-coded website ensures<br>Fast and secure performance";
  } else {
    // Reset the text for larger screens
    frameworkText.innerHTML = "Compelling website design, done according<br>To your business’s preferences and wants";
    developmentText.innerHTML = "Custom-coded website assures speed, security<br>And the best quality amongst everybody else";
  }
}

// Run the function on page load and on window resize
window.addEventListener('load', changeTextBasedOnWidth);
window.addEventListener('resize', changeTextBasedOnWidth);
