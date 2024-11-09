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
  } else {
    rectangle.addEventListener('touchstart', (event) => {
      event.preventDefault();
      rectangle.classList.add('active');
      moveToCursor(blobs, rectangle);
    });

    rectangle.addEventListener('touchend', () => {
      rectangle.classList.remove('active');
      continueAnimation(blobs, rectangle);
    });
  }
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
  button.addEventListener('touchstart', function () {
    this.classList.add('active');
  });

  button.addEventListener('touchend', function () {
    this.classList.remove('active');
  });

  button.addEventListener('mousedown', function () {
    this.classList.add('active');
  });

  button.addEventListener('mouseup', function () {
    this.classList.remove('active');
  });
});

init();













// Slider

var copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);
copy.offsetHeight;  // Forces a reflow to update layout






var copy = document.querySelector(".logos-slide-opp").cloneNode(true);
document.querySelector(".logos-opp").appendChild(copy);
copy.offsetHeight;  // Forces a reflow to update layout





var copy = document.querySelector(".logos-slide-dbb").cloneNode(true);
document.querySelector(".logos-dbb").appendChild(copy);
copy.offsetHeight;  // Forces a reflow to update layout








document.querySelectorAll('.logos-slide img, .logos-slide-opp img, .logos-slide-dbb img').forEach((img) => {

  img.addEventListener('touchstart', () => {
    img.style.opacity = '0.7';
    img.style.transform = 'scale(0.99)';
  });

  img.addEventListener('touchend', () => {
    img.style.opacity = '';
    img.style.transform = '';
  });
});









// Black slider thing

const fadeOutContainer = document.querySelector('.black-bottom-fade-out-container');
const logosDbb = document.querySelector('.logos-dbb');

fadeOutContainer.addEventListener('mouseenter', () => {
  logosDbb.style.opacity = '0.6';
});

fadeOutContainer.addEventListener('mouseleave', () => {
  logosDbb.style.opacity = '1';
});

const button = document.querySelector('.white-btn-container');

button.addEventListener('touchstart', function () {
  button.style.backgroundColor = 'hsla(235, 5%, 70%, 1)';
  button.style.transform = 'scale(0.97) translateZ(0)';
  button.style.opacity = '0.9';
});

button.addEventListener('touchend', function () {
  button.style.backgroundColor = 'rgb(255, 255, 255)';
  button.style.transform = 'scale(1)';
  button.style.opacity = '1';
});
