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
