const formContainer = document.querySelector('.form-side-container');
const imageContainer = document.querySelector('.image-side-container');
const dragLineContainer = document.querySelector('.drag-line-container'); // Select the container
const dragLine = document.querySelector('.drag-line');

let isDragging = false;
let startY = 0;
let startHeight = 0;
let lastY = 0; // Last Y position for velocity calculation
let lastTimestamp = 0; // Last timestamp for calculating speed
let velocity = 0; // Velocity to simulate inertia

// Define a velocity threshold for smoother inertia effect
const velocityDecay = 0.8; // Controls the decay of velocity over time
const bounceFactor = 0.8; // Reduced factor to amplify bounce effect

// Function to handle mouse hover
function handleHover() {
  dragLine.style.backgroundColor = 'white'; // Change color on hover
  dragLine.style.width = '110px'; // Increase width on hover
  dragLine.style.height = '6px'; // Increase height on hover
}

// Function to handle mouse leave
function handleMouseLeave() {
  dragLine.style.backgroundColor = 'hsla(235, 5%, 25%, 1)'; // Change back to original color
  dragLine.style.width = '100px'; // Reset width
  dragLine.style.height = '5px'; // Reset height
}

// Start dragging
function startDrag(e) {
  if (window.innerWidth > 768) return; // Only enable drag on mobile/tablet
  isDragging = true;

  startY = e.touches ? e.touches[0].clientY : e.clientY;
  startHeight = formContainer.getBoundingClientRect().height; // Get the starting height

  // Disable transitions for smooth dragging
  formContainer.style.transition = 'none';
  imageContainer.style.transition = 'none';

  lastY = startY; // Initialize last Y position
  lastTimestamp = performance.now(); // Initialize the timestamp

  document.body.style.cursor = 'grabbing';
  e.preventDefault(); // Prevent text selection or scrolling while dragging

  // Change the drag line color to white when dragging starts
  dragLine.style.backgroundColor = 'white'; // Change color on press
  dragLine.style.width = '90px'; // Change width on press
  dragLine.style.height = '3px'; // Change height on press
}

// Handle dragging movement
function onDrag(e) {
  if (!isDragging || window.innerWidth > 768) return;

  const currentY = e.touches ? e.touches[0].clientY : e.clientY;
  const dy = startY - currentY; // Adjust dy to be negative for dragging up
  const newHeight = startHeight + dy; // Calculate the new height based on drag distance

  const minHeight = window.innerHeight * 0.5; // 50% of viewport
  const maxHeight = window.innerHeight; // Maximum height is 100% of viewport

  // Dynamically update height as you drag
  if (newHeight >= minHeight - 20 && newHeight <= maxHeight + 20) { // Allow slight overshoot
    const newFlexBasis = (newHeight / window.innerHeight) * 100;

    // Calculate velocity for inertia effect
    const currentTimestamp = performance.now();
    const deltaTime = currentTimestamp - lastTimestamp;

    if (deltaTime > 0) {
      // Calculate velocity in pixels per millisecond
      velocity = (currentY - lastY) / deltaTime; // Velocity in pixels per millisecond
    }

    lastY = currentY; // Update last Y position
    lastTimestamp = currentTimestamp;

    // Use requestAnimationFrame for smoother updates
    window.requestAnimationFrame(() => {
      formContainer.style.flexBasis = `${newFlexBasis}%`;
      imageContainer.style.flexBasis = `${100 - newFlexBasis}%`;
    });
  }

  e.preventDefault(); // Prevent unwanted behaviors like page scrolling
}

// End dragging (snapping behavior)
function endDrag() {
  if (!isDragging) return;

  // Restore transitions after dragging
  formContainer.style.transition = '';
  imageContainer.style.transition = '';

  const formFlexBasis = parseFloat(getComputedStyle(formContainer).flexBasis);

  // Apply inertia effect based on velocity
  let targetHeight = formFlexBasis - (velocity * bounceFactor * 5); // Adjusted factor for reduced bounce effect

  // Limit the target height
  if (targetHeight > 100) {
    targetHeight = 100; // Cap the target height at 100%
  } else if (targetHeight < 50) {
    targetHeight = 50; // Cap the target height at 50%
  }

  // Reset the line to original color and start bounce effect
  dragLine.style.transition = 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'; // Add bounce transition
  dragLine.style.width = '100px'; // Reset width
  dragLine.style.height = '5px'; // Reset height
  dragLine.style.backgroundColor = 'hsla(235, 5%, 25%, 1)'; // Reset color

  // Add bounce effect
  dragLine.style.transform = 'scale(1.05, 1.05)'; // Scale slightly
  setTimeout(() => {
    dragLine.style.transform = 'scale(1, 1)'; // Scale back to original size
  }, 150); // Adjust the timing as needed

  // Apply transition for smooth effect
  formContainer.style.transition = 'flex-basis 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
  imageContainer.style.transition = 'flex-basis 0.3s cubic-bezier(0.25, 1, 0.5, 1)';

  // Smoothly fill to 100% if in the 87% zone or above
  if (formFlexBasis >= 87) {
    targetHeight = 100; // Set target height to 100% directly
  } else if (formFlexBasis < 50) {
    // If below 50%, snap back to 50%
    targetHeight = 50;
  }

  // Set final height based on calculated target height
  formContainer.style.flexBasis = `${targetHeight}%`;
  imageContainer.style.flexBasis = `${100 - targetHeight}%`;

  // Reduce velocity gradually to simulate inertia
  const inertiaInterval = setInterval(() => {
    if (Math.abs(velocity) < 0.1) {
      clearInterval(inertiaInterval);
      return; // Stop when velocity is small
    }

    targetHeight -= velocity * bounceFactor; // Apply inverted inertia

    // Cap the targetHeight at 100% and 50%
    if (targetHeight > 100) {
      targetHeight = 100; // Limit to 100%
    } else if (targetHeight < 50) {
      targetHeight = 50; // Limit to 50%
    }

    // Update height with transition
    formContainer.style.flexBasis = `${targetHeight}%`;
    imageContainer.style.flexBasis = `${100 - targetHeight}%`;

    // Reduce velocity
    velocity *= velocityDecay; // Gradually reduce velocity
  }, 16); // Roughly 60 FPS

  isDragging = false;
  document.body.style.cursor = 'default';
}

// Define options for non-passive event listeners
const nonPassiveOptions = { passive: false };

// Add event listeners for both touch and mouse events with non-passive option
dragLineContainer.addEventListener('mousedown', startDrag);
dragLineContainer.addEventListener('touchstart', startDrag, nonPassiveOptions);
document.addEventListener('mousemove', onDrag);
document.addEventListener('touchmove', onDrag, nonPassiveOptions);
document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

// Add mouseover and mouseout event listeners for hover effects
dragLineContainer.addEventListener('mouseover', handleHover);
dragLineContainer.addEventListener('mouseout', handleMouseLeave);
