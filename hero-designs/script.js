// Function to duplicate the testimonial boxes
function duplicateTestimonials() {
    // Select the container and the wrapper
    const container = document.querySelector(".infinite-scroller-container");
    const wrapper = document.querySelector(".scroller-wrapper");

    // Clone all the testimonial boxes inside the wrapper
    const testimonials = wrapper.querySelectorAll(".testimonial-box");
    testimonials.forEach((testimonial) => {
    const clone = testimonial.cloneNode(true); // Deep clone the element
    wrapper.appendChild(clone); // Append the clone to the wrapper
    });
}

// Call the function to duplicate testimonials
duplicateTestimonials();




document.addEventListener("DOMContentLoaded", function () {
    const homeBtn = document.querySelector(".nav-text:nth-child(1)");
    const designerBtn = document.querySelector(".nav-text:nth-child(2)");
    const homeContent = document.querySelector(".dissaper-to-designer");
    const designerContent = document.querySelector(".dissapear-to-home");

    function setActive(active) {
        if (active === "home") {
            designerContent.style.opacity = "0"; // Fade out designer
            setTimeout(() => {
                designerContent.style.display = "none"; // Hide after fade-out
                homeContent.style.display = "block"; // Show new content
                setTimeout(() => (homeContent.style.opacity = "1"), 20); // Fade in home
            }, 200); // 0.2s delay

            homeBtn.classList.add("active");
            designerBtn.classList.remove("active");
        } else {
            homeContent.style.opacity = "0"; // Fade out home
            setTimeout(() => {
                homeContent.style.display = "none"; // Hide after fade-out
                designerContent.style.display = "block"; // Show new content
                setTimeout(() => (designerContent.style.opacity = "1"), 20); // Fade in designer
            }, 200); // 0.2s delay

            designerBtn.classList.add("active");
            homeBtn.classList.remove("active");
        }
    }

    homeBtn.addEventListener("click", () => setActive("home"));
    designerBtn.addEventListener("click", () => setActive("designer"));

    // Set initial state
    homeContent.style.display = "block";
    homeContent.style.opacity = "1";
    designerContent.style.display = "none";
    designerContent.style.opacity = "0";

    // Set initial active class
    homeBtn.classList.add("active");
});




function toggleMode() {
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');
    const body = document.body;
  
    // Check if dark mode is currently active
    const isDarkMode = body.classList.contains('dark-mode');
  
    if (isDarkMode) {
      // Switching from dark mode to light mode
      // Step 1: Hide the moon (rotate 30deg and fade out)
      moon.style.opacity = '0';
      moon.style.transform = 'rotate(30deg)';
  
      // Step 2: After the moon fades out, show the sun (rotate from 180deg to 0deg and fade in)
      setTimeout(() => {
        moon.style.display = 'none'; // Hide moon after fade-out
        sun.style.display = 'block'; // Show sun
        setTimeout(() => {
          sun.style.opacity = '1';
          sun.style.transform = 'rotate(0deg)';
        }, 10); // Small delay to ensure display: block is applied before transitions
      }, 300); // Wait for the moon's fade-out transition to complete (0.3s)
  
      // Update mode and save preference
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      // Switching from light mode to dark mode
      // Step 1: Hide the sun (rotate 180deg and fade out)
      sun.style.opacity = '0';
      sun.style.transform = 'rotate(180deg)';
  
      // Step 2: After the sun fades out, show the moon (rotate from -30deg to 0deg and fade in)
      setTimeout(() => {
        sun.style.display = 'none'; // Hide sun after fade-out
        moon.style.display = 'block'; // Show moon
        setTimeout(() => {
          moon.style.opacity = '1';
          moon.style.transform = 'rotate(0deg)';
          moon.style.filter = 'brightness(20%)'; // Apply reduced brightness
        }, 10); // Small delay to ensure display: block is applied before transitions
      }, 300); // Wait for the sun's fade-out transition to complete (0.3s)
  
      // Update mode and save preference
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
  }
  
  // Initialize theme on page load
  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');
  
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
      sun.style.display = 'none';
      moon.style.display = 'block';
      moon.style.opacity = '1';
      moon.style.transform = 'rotate(0deg)';
      moon.style.filter = 'brightness(20%)'; // Set initial brightness for moon
    } else {
      body.classList.remove('dark-mode');
      sun.style.display = 'block';
      sun.style.opacity = '1';
      sun.style.transform = 'rotate(0deg)';
      moon.style.display = 'none';
    }
  }
  
  // Call initializeTheme when the page loads
  document.addEventListener('DOMContentLoaded', initializeTheme);