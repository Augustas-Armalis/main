document.addEventListener('DOMContentLoaded', () => {
  updateBlogCarousel();
});

let currentBlogIndex = 0;
const blogSlides = document.querySelectorAll('.blog-slide');
const blogDots = document.querySelectorAll('.blog-dot');
const blogCarousel = document.querySelector('.blog-carousel');

function getActiveSlideCount() {
  if (window.innerWidth > 1064) return 3;
  if (window.innerWidth > 700) return 2;
  return 1;
}

function moveBlogSlide(direction) {
  const activeSlideCount = getActiveSlideCount();
  currentBlogIndex += direction;

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
  const blogCarouselWidth = blogCarousel.offsetWidth;
  let gap;
  if (window.innerWidth > 1064) {
    gap = 4;
  } else if (window.innerWidth > 700) {
    gap = 8;
  } else {
    gap = 16;
  }

  const activeSlideCount = getActiveSlideCount();
  const slideWidth = blogCarouselWidth / activeSlideCount;
  const newTransform = -(currentBlogIndex * (slideWidth + gap));

  blogCarousel.style.transform = `translateX(${newTransform}px)`;

  blogSlides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index >= currentBlogIndex && index < currentBlogIndex + activeSlideCount) {
      slide.classList.add('active');
    }
  });

  blogDots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index >= currentBlogIndex && index < currentBlogIndex + activeSlideCount) {
      dot.classList.add('active');
    }
  });
}

window.addEventListener('resize', () => {
  updateBlogCarousel();
});

const blogPlayButtons = document.querySelectorAll(".blog-slide-activator-container");
const blogSvg1Elements = document.querySelectorAll("#blog-svg1");
const blogSvg2Elements = document.querySelectorAll("#blog-svg2");
const blogVideoSliders = document.querySelectorAll(".blog-on-top-of-video-slider");
const blogVideos = document.querySelectorAll(".blog-testimonial-video");

const changeBlogSVG = (index) => {
  blogSvg1Elements[index].style.opacity = "0";
  blogSvg2Elements[index].style.opacity = "1";
  blogVideoSliders[index].classList.add("hovered");
  blogVideos[index].style.transition = "playback-rate 0.3s ease";
  blogVideos[index].playbackRate = 0;
};

const restoreBlogSVG = (index) => {
  blogSvg1Elements[index].style.opacity = "1";
  blogSvg2Elements[index].style.opacity = "0";
  blogVideoSliders[index].classList.remove("hovered");
  blogVideos[index].style.transition = "playback-rate 0 .3s ease";
  blogVideos[index].playbackRate = 1;
};

blogPlayButtons.forEach((playButton, index) => {
  playButton.addEventListener("mouseover", () => changeBlogSVG(index));
  playButton.addEventListener("mouseout", () => restoreBlogSVG(index));
  playButton.addEventListener("touchstart", (event) => {
    changeBlogSVG(index);
    event.stopPropagation();
  });
  playButton.addEventListener("touchend", (event) => {
    restoreBlogSVG(index);
    event.stopPropagation();
  });
  playButton.addEventListener("touchcancel", () => restoreBlogSVG(index));
});

const blogArrows = document.querySelectorAll('.blog-arrow');

blogArrows.forEach(arrow => {
  const arrowImage = arrow.querySelector('img');
  arrow.addEventListener('touchstart', function () {
    arrow.style.backgroundColor = 'rgb(255, 255, 255)';
    arrow.style.transform = 'scale(0.95) translateZ(0)';
    arrow.style.opacity = '0.9';
    if (arrowImage) {
      arrowImage.style.filter = 'brightness(0)';
    }
  });

  arrow.addEventListener('touchend', function () {
    arrow.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    arrow.style.transform = 'scale(1)';
    arrow.style.opacity = '1';
    if (arrowImage) {
      arrowImage.style.filter = 'none';
    }
  });
});
