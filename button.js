gsap.registerPlugin(MotionPathPlugin);

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function moveBlob(blob, widthRange, heightRange) {
  const randomPath = [
    { x: random(-20, widthRange), y: random(-10, heightRange) },
    { x: random(-20, widthRange), y: random(-10, heightRange) },
    { x: random(-20, widthRange), y: random(-10, heightRange) },
    { x: random(-20, widthRange), y: random(-10, heightRange) }
  ];

  gsap.to(blob, {
    motionPath: {
      path: randomPath,
      curviness: 1.5,
      autoRotate: false
    },
    duration: random(12, 20),
    ease: 'power6.in',
    onComplete: () => moveBlob(blob, widthRange, heightRange),
    repeat: 0
  });
}

function initializeBlobs(rectangle) {
  const blobs = rectangle.querySelectorAll('.blob');
  const { width, height } = rectangle.getBoundingClientRect();

  blobs.forEach(blob => {
    const size = random(30, 45);
    blob.style.width = `${size}px`;
    blob.style.height = `${size}px`;

    gsap.set(blob, {
      x: random(-20, width - size),
      y: random(-10, height - size)
    });

    moveBlob(blob, width - size, height - size);
  });

  if (window.innerWidth >= 768) {
    rectangle.addEventListener('mouseenter', () => moveToCursor(blobs, rectangle));
    rectangle.addEventListener('mouseleave', () => continueAnimation(blobs, rectangle));
  }

  rectangle.addEventListener('touchend', () => {
    rectangle.classList.remove('active');
    continueAnimation(blobs, rectangle);
  });
}


function moveToCursor(blobs, rectangle) {
  rectangle.addEventListener('mousemove', (event) => {
    const { left, top } = rectangle.getBoundingClientRect();
    const cursorX = event.clientX - left;
    const cursorY = event.clientY - top;

    blobs.forEach(blob => {
      gsap.to(blob, {
        x: cursorX - parseInt(blob.style.width) / 2,
        y: cursorY - parseInt(blob.style.height) / 2,
        duration: 3.0,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  });
}

function continueAnimation(blobs, rectangle) {
  const { width, height } = rectangle.getBoundingClientRect();

  blobs.forEach(blob => {
    const size = parseInt(blob.style.width);

    gsap.to(blob, {
      duration: 2.0,
      motionPath: {
        path: [
          { x: random(-20, width - size), y: random(-10, height - size) },
          { x: random(-20, width - size), y: random(-10, height - size) },
          { x: random(-20, width - size), y: random(-10, height - size) },
          { x: random(-20, width - size), y: random(-10, height - size) }
        ],
        curviness: 1.5,
        autoRotate: false
      },
      onComplete: () => moveBlob(blob, width - size, height - size)
    });
  });
}

function init() {
  document.querySelectorAll('.rectangle').forEach(initializeBlobs);
}

const buttons = document.querySelectorAll('.under-rectangle-layer');

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    gsap.to(button, {
      border: '1px solid hsla(240, 4%, 13%, 1)',
      boxShadow: '0px 0px 8px 0px rgba(175, 175, 182, 0.20) inset',
      duration: 0.15,
      ease: 'power1.out'
    });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      border: '1px solid var(--gray3)',
      boxShadow: '0px 0px 8px 3px rgba(175, 175, 182, 0.20) inset',
      duration: 0.15,
      ease: 'power1.out'
    });
  });

  button.addEventListener('mousedown', () => {
    gsap.to(button, {
      scale: 0.95,
      duration: 0.15,
      ease: 'power2.out'
    });

    gsap.to(button.querySelector('.rectangle'), {
      scale: 0.97,
      opacity: 0.7,
      duration: 0.15,
      ease: 'power2.out'
    });
  });

  button.addEventListener('touchstart', () => {
    gsap.to(button, {
      scale: 0.95,
      duration: 0.15,
      ease: 'power2.out'
    });
    gsap.to(button.querySelector('.rectangle'), {
      scale: 0.97,
      opacity: 0.7,
      duration: 0.15,
      ease: 'power2.out'
    });
  });

  const resetScale = () => {
    gsap.to(button, {
      scale: 1,
      duration: 0.15,
      ease: 'power2.out'
    });
    gsap.to(button.querySelector('.rectangle'), {
      scale: 1,
      opacity: 1,
      duration: 0.15,
      ease: 'power2.out'
    });
  };

  button.addEventListener('mouseup', resetScale);
  button.addEventListener('mouseleave', resetScale);
  button.addEventListener('touchend', resetScale);
});

init();

// document.getElementById('button-nav-container-mobile').addEventListener('touchend', function (event) {
//   event.preventDefault();
//   window.location.href = "#pricing-section-href";
// });

// document.getElementById('button-nav-container-pricing').addEventListener('touchend', function (event) {
//   event.preventDefault();
//   window.location.href = "https://buy.stripe.com/6oEeX5c719sU2ME9AQ";
// });

// document.getElementById('load-in-btn-hero').addEventListener('touchend', function (event) {
//   event.preventDefault();
//   window.location.href = "#pricing-section-href";
// });

// const button = document.querySelector('.white-btn-container');

// button.addEventListener('touchstart', function () {
//   button.style.backgroundColor = 'hsla(235, 5%, 70%, 1)';
//   button.style.transform = 'scale(0.97) translateZ(0)';
//   button.style.opacity = '0.9';
// });

// button.addEventListener('touchend', function () {
//   button.style.backgroundColor = 'rgb(255, 255, 255)';
//   button.style.transform = 'scale(1)';
//   button.style.opacity = '1';
// });

// Get all the arrow buttons
const arrows = document.querySelectorAll('.arrow');

// Add touchstart and touchend event listeners for each arrow button
arrows.forEach(arrow => {
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




const buttonsas = document.querySelectorAll('.white-button-offer-container, .call-button-offer-container, .white-button-news-container');

buttonsas.forEach(button => {
  button.addEventListener('touchstart', function () {
    button.style.backgroundColor = 'hsla(235, 5%, 70%, 1)';
    button.style.transform = 'scale(0.99) translateZ(0)';
    button.style.opacity = '0.9';
  });

  button.addEventListener('touchend', function () {
    button.style.backgroundColor = 'rgb(255, 255, 255)';
    button.style.transform = 'scale(1)';
    button.style.opacity = '1';
  });
});













// blog for finger

// Get the elements
// Get the elements
// Select all the elements with the specified classes
const imageBlogContainers = document.querySelectorAll('.image-blog-container');

// Loop through each .image-blog-container element
imageBlogContainers.forEach(function (imageBlogContainer) {
  // Get the corresponding .text-bottom-blog-container and .cta-arrow-blog
  const textBottomBlogContainer = imageBlogContainer.nextElementSibling; // Assuming it's the next sibling
  const ctaArrowBlog = textBottomBlogContainer ? textBottomBlogContainer.querySelector('.cta-arrow-blog') : null;
  const textBlog = textBottomBlogContainer ? textBottomBlogContainer.querySelector('.text-blog') : null;

  // Add touchstart event listener for each .image-blog-container
  imageBlogContainer.addEventListener('touchstart', function () {
    // Change brightness for .image-blog-container and .text-blog
    imageBlogContainer.style.filter = 'brightness(60%)';
    if (textBlog) {
      textBlog.style.filter = 'brightness(60%)';
    }

    // Change gap for .cta-arrow-blog
    if (ctaArrowBlog) {
      ctaArrowBlog.style.gap = '12px';  // Adjust gap as needed
    }
  });

  // Add touchend event listener for each .image-blog-container
  imageBlogContainer.addEventListener('touchend', function () {
    // Reset brightness for .image-blog-container and .text-blog
    imageBlogContainer.style.filter = 'brightness(100%)';
    if (textBlog) {
      textBlog.style.filter = 'brightness(100%)';
    }

    // Reset gap for .cta-arrow-blog
    if (ctaArrowBlog) {
      ctaArrowBlog.style.gap = '';  // Reset to the original gap value
    }
  });
});
