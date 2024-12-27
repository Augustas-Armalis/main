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
      boxShadow: '0px 0px 8px 0px rgba(175, 175, 182, 0.20) inset',
      duration: 0.15,
      ease: 'power1.out'
    });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      boxShadow: '0px 0px 8px 3px rgba(175, 175, 182, 0.20) inset',
      duration: 0.15,
      ease: 'power1.out'
    });
  });

  button.addEventListener('mousedown', () => {
    gsap.to(button, {
      scale: 0.98,
      duration: 0.15,
      ease: 'power2.out'
    });

    gsap.to(button.querySelector('.rectangle'), {
      scale: 0.99,
      opacity: 0.7,
      duration: 0.15,
      ease: 'power2.out',
    });
  });

  button.addEventListener('touchstart', () => {
    gsap.to(button, {
      scale: 0.98,
      duration: 0.15,
      ease: 'power2.out',
    });
    gsap.to(button.querySelector('.rectangle'), {
      scale: 0.99,
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