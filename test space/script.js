
// Testimonial section

const videoUrls = {
  "ares-testimonial": "https://www.youtube.com/embed/G7qvBdtHAO4?autoplay=1&modestbranding=1&rel=0&controls=1&color=white",
  "motiejus-testimonial": "https://www.youtube.com/embed/kZNutM6e_9c?si=hz6tP-eboCXjWzKp?autoplay=1&modestbranding=1&rel=0&controls=1&color=white",
  "rick-testimonial": "https://www.youtube.com/embed/5sbWbfe_4XU?si=c2RrfDYKn9kWqz7f?autoplay=1&modestbranding=1&rel=0&controls=1&color=white",
  "maj-testimonial": "https://www.youtube.com/embed/dtAoDQiWrgA?si=tVTKCkIM7mMt13V9?autoplay=1&modestbranding=1&rel=0&controls=1&color=white"
};

// ?autoplay=1&modestbranding=1&rel=0&controls=1&color=white

gsap.fromTo(
  ".carousel-container", 
  { x: 200, opacity: 0 }, 
  { 
    x: 0, 
    opacity: 1, 
    duration: 1, 
    ease: "power2.out", 
    stagger: 0.1, 
    scrollTrigger: {
      trigger: ".slide", 
      start: "top 90%", 
      once: true 
    }
  }
);

gsap.fromTo(
  ".dot", 
  { y: 50, opacity: 0 }, 
  { 
    y: 0, 
    opacity: 1, 
    duration: 1, 
    ease: "power2.out", 
    stagger: 0.1, 
    scrollTrigger: {
      trigger: ".bottom-navigation-container-tesimonials", 
      start: "top bottom", 
      once: true
    }
  }
);

gsap.fromTo(
  ".arrow", 
  { y: 50, opacity: 0 }, 
  { 
    y: 0, 
    opacity: 1, 
    duration: 1, 
    ease: "power2.out", 
    stagger: 0.1, 
    scrollTrigger: {
      trigger: ".bottom-navigation-container-tesimonials", 
      start: "top bottom", 
      once: true
    }
  }
);

document.addEventListener('DOMContentLoaded', () => {
  updateCarousel(); 
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
    if (currentIndex < 0) currentIndex = slides.length - 2; 
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

const videoContainer = document.querySelector(".video-container");
const closeButton = document.querySelector(".close-button");
const youtubePlayer = document.querySelector("#ytplayer");
const activators = document.querySelectorAll(".slide-activator-conatiner");

function disableScroll() {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
}

function enableScroll() {
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
  document.body.style.overflowX = "hidden";
  document.documentElement.style.overflowX = "hidden";
}

const showVideoContainer = (videoId) => {
  const videoUrl = videoUrls[videoId];
  if (videoUrl) {
    youtubePlayer.src = `${videoUrl}?autoplay=1`;
    videoContainer.style.display = "inherit";
    disableScroll();
  }
};

const hideVideoContainer = () => {
  youtubePlayer.src = "";
  videoContainer.style.display = "none";
  enableScroll();
};

activators.forEach((activator) => {
  activator.addEventListener("click", () => {
    const activatorId = activator.id;
    showVideoContainer(activatorId);
  });
});

closeButton.addEventListener("click", hideVideoContainer);

const playButtons = document.querySelectorAll(".slide-activator-conatiner");
const svg1Elements = document.querySelectorAll("#svg1");
const svg2Elements = document.querySelectorAll("#svg2");
const videoSliders = document.querySelectorAll(".on-top-of-video-slider");
const videos = document.querySelectorAll(".testimonial-video");

const changeSVG = (index) => {
  svg1Elements[index].style.opacity = "0";
  svg2Elements[index].style.opacity = "1";
  videoSliders[index].classList.add("hovered");
  videos[index].style.transition = "playback-rate 0.3s ease";
  videos[index].playbackRate = 0;
};

const restoreSVG = (index) => {
  svg1Elements[index].style.opacity = "1";
  svg2Elements[index].style.opacity = "0";
  videoSliders[index].classList.remove("hovered");
  videos[index].style.transition = "playback-rate 0.3s ease";
  videos[index].playbackRate = 1;
};

playButtons.forEach((playButton, index) => {
  playButton.addEventListener("mouseover", () => changeSVG(index));
  playButton.addEventListener("mouseout", () => restoreSVG(index));

  playButton.addEventListener("touchstart", (event) => {
    changeSVG(index);
    event.stopPropagation();
  });

  playButton.addEventListener("touchend", (event) => {
    restoreSVG(index);
    event.stopPropagation();
  });

  playButton.addEventListener("touchcancel", () => restoreSVG(index));
});

const observerOptions = {
  root: null,
  threshold: 0
};

const stopVideoWhenNotVisible = (entries, observer) => {
  entries.forEach(entry => {
    const video = entry.target;
    if (entry.isIntersecting) {
      video.play();
    } else {
      video.pause();
    }
  });
};

const observer = new IntersectionObserver(stopVideoWhenNotVisible, observerOptions);

videos.forEach(video => {
  observer.observe(video);
});

const arrows = document.querySelectorAll('.arrow');

arrows.forEach(arrow => {
  const arrowImage = arrow.querySelector('img');

  arrow.addEventListener('touchstart', function () {
    arrow.style.backgroundColor = 'rgb(255, 255, 255)';
    arrow.style.opacity = '0.9';
    if (arrowImage) {
      arrowImage.style.filter = 'brightness(0)';
    }
  });

  arrow.addEventListener('touchend', function () {
    arrow.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    arrow.style.opacity = '1';
    if (arrowImage) {
      arrowImage.style.filter = 'none';
    }
  });
});