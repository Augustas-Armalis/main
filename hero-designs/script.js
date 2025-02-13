// Don't touch

document.getElementById('year').textContent = new Date().getFullYear();

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

// Touch below :D

const images = document.querySelectorAll(".web-img");
let index = 0;

function showNextImage() {
  images.forEach(img => img.style.display = "none");
  images[index].style.display = "block";
  index = (index + 1) % images.length;
}

setInterval(showNextImage, 1000);

showNextImage();

function duplicateTestimonials() {
  const container = document.querySelector(".infinite-scroller-container");
  const wrapper = document.querySelector(".scroller-wrapper");
  const testimonials = wrapper.querySelectorAll(".testimonial-box");
  testimonials.forEach((testimonial) => {
    const clone = testimonial.cloneNode(true);
    wrapper.appendChild(clone);
  });
}

duplicateTestimonials();

document.addEventListener("DOMContentLoaded", function () {
  const homeBtn = document.querySelector(".nav-text:nth-child(1)");
  const designerBtn = document.querySelector(".nav-text:nth-child(2)");
  const homeContent = document.querySelector(".dissaper-to-designer");
  const designerContent = document.querySelector(".dissapear-to-home");

  function setActive(active) {
    if (active === "home") {
      designerContent.style.opacity = "0";
      setTimeout(() => {
        designerContent.style.display = "none";
        homeContent.style.display = "block";
        setTimeout(() => (homeContent.style.opacity = "1"), 20);
      }, 200);
      homeBtn.classList.add("active");
      designerBtn.classList.remove("active");
    } else {
      homeContent.style.opacity = "0";
      setTimeout(() => {
        homeContent.style.display = "none";
        designerContent.style.display = "block";
        setTimeout(() => (designerContent.style.opacity = "1"), 20);
      }, 200);
      designerBtn.classList.add("active");
      homeBtn.classList.remove("active");
    }
  }

  homeBtn.addEventListener("click", () => setActive("home"));
  designerBtn.addEventListener("click", () => setActive("designer"));

  homeContent.style.display = "block";
  homeContent.style.opacity = "1";
  designerContent.style.display = "none";
  designerContent.style.opacity = "0";
  homeBtn.classList.add("active");
});

function toggleMode() {
  const sun = document.querySelector(".sun");
  const moon = document.querySelector(".moon");
  const body = document.body;
  const isDarkMode = body.classList.contains("dark-mode");

  if (isDarkMode) {
    moon.style.opacity = "0";
    moon.style.transform = "rotate(30deg)";
    setTimeout(() => {
      moon.style.display = "none";
      sun.style.display = "block";
      setTimeout(() => {
        sun.style.opacity = "1";
        sun.style.transform = "rotate(0deg)";
      }, 10);
    }, 300);
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  } else {
    sun.style.opacity = "0";
    sun.style.transform = "rotate(180deg)";
    setTimeout(() => {
      sun.style.display = "none";
      moon.style.display = "block";
      setTimeout(() => {
        moon.style.opacity = "1";
        moon.style.transform = "rotate(0deg)";
        moon.style.filter = "brightness(20%)";
      }, 10);
    }, 300);
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme");
  const body = document.body;
  const sun = document.querySelector(".sun");
  const moon = document.querySelector(".moon");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    sun.style.display = "none";
    moon.style.display = "block";
    moon.style.opacity = "1";
    moon.style.transform = "rotate(0deg)";
    moon.style.filter = "brightness(20%)";
  } else {
    body.classList.remove("dark-mode");
    sun.style.display = "block";
    sun.style.opacity = "1";
    sun.style.transform = "rotate(0deg)";
    moon.style.display = "none";
  }
});