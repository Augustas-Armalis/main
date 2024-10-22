// Register the MotionPath plugin
gsap.registerPlugin(MotionPathPlugin);

// Function to generate a random number within a range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to move the blob to a new random position
function moveBlob(blob, widthRange, heightRange) {
  const randomPath = [
    { x: random(-20, widthRange), y: random(-10, heightRange) },
    { x: random(-20, widthRange), y: random(-10, heightRange) },
    { x: random(-20, widthRange), y: random(-10, heightRange) },
    { x: random(-20, widthRange), y: random(-10, heightRange) }
  ];

  // Animate the blob along a random smooth path
  gsap.to(blob, {
    motionPath: {
      path: randomPath,
      curviness: 1.5,
      autoRotate: false
    },
    duration: random(12, 20),  // Increased duration for random movement
    ease: 'power6.in',      // Smoother easing function
    onComplete: () => moveBlob(blob, widthRange, heightRange), // Continue moving after completion
    repeat: 0
  });
}

// Function to initialize blobs for a rectangle
function initializeBlobs(rectangle) {
  const blobs = rectangle.querySelectorAll('.blob'); // Select blobs within the rectangle
  const { width, height } = rectangle.getBoundingClientRect(); // Get rectangle dimensions

  blobs.forEach(blob => {
    const size = random(20, 45); // Set random size for the blobs
    blob.style.width = `${size}px`;
    blob.style.height = `${size}px`;

    // Set initial random position within the rectangle
    gsap.set(blob, {
      x: random(-20, width - size), // Adjusted for blob size
      y: random(-10, height - size) // Adjusted for blob size
    });

    // Start moving the blob
    moveBlob(blob, width - size, height - size); // Pass adjusted dimensions for movement
  });

  // Add hover event listeners only for mouse devices
  if (window.innerWidth >= 768) {
    rectangle.addEventListener('mouseenter', () => moveToCursor(blobs, rectangle));
    rectangle.addEventListener('mouseleave', () => continueAnimation(blobs, rectangle));
  }
}

// Function to move blobs to the cursor smoothly with a delay
function moveToCursor(blobs, rectangle) {
  rectangle.addEventListener('mousemove', (event) => {
    const { left, top } = rectangle.getBoundingClientRect();
    const cursorX = event.clientX - left;
    const cursorY = event.clientY - top;

    blobs.forEach(blob => {
      gsap.to(blob, {
        x: cursorX - parseInt(blob.style.width) / 2,
        y: cursorY - parseInt(blob.style.height) / 2,
        duration: 3.0, // Increased duration for even smoother following
        ease: 'power2.out', // Easing for more natural movement
        overwrite: 'auto' // Ensures that previous animations are overwritten
      });
    });
  });
}

// Function to continue blobs' random animation after mouse leaves
function continueAnimation(blobs, rectangle) {
  const { width, height } = rectangle.getBoundingClientRect(); // Get rectangle dimensions

  blobs.forEach(blob => {
    const size = parseInt(blob.style.width); // Get current blob size

    // Immediately start random motion without waiting, maintaining smoothness
    gsap.to(blob, {
      duration: 2.0, // Increased duration to transition smoothly back
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
      onComplete: () => moveBlob(blob, width - size, height - size) // Resume random motion
    });
  });
}

// Function to initialize blobs
function init() {
  document.querySelectorAll('.rectangle').forEach(initializeBlobs);
}

// Prevent touch events for blob following
window.addEventListener('touchstart', function (event) {
  event.preventDefault();
}, { passive: false });

// Initialize blobs for existing rectangles
init();
