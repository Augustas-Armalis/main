const formContainer = document.querySelector('.form-side-container');
const imageContainer = document.querySelector('.image-side-container');
const dragLine = document.querySelector('.drag-line');

let isDragging = false;
let startY = 0;
let startHeight = 0;
let velocity = 0; // Velocity to simulate inertia

// Start dragging
function startDrag(e) {
  if (window.innerWidth > 768) return; // Only enable drag on mobile/tablet
  isDragging = true;

  startY = e.touches ? e.touches[0].clientY : e.clientY;
  startHeight = formContainer.getBoundingClientRect().height; // Get the starting height

  // Disable transitions for smooth dragging
  formContainer.style.transition = 'none';
  imageContainer.style.transition = 'none';

  document.body.style.cursor = 'grabbing';
  e.preventDefault(); // Prevent text selection or scrolling while dragging
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
  if (newHeight >= minHeight && newHeight <= maxHeight) {
    const newFlexBasis = (newHeight / window.innerHeight) * 100;

    // Calculate velocity for inertia effect
    velocity = dy; // Store the drag distance to calculate velocity

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

  // Add bounce effect based on velocity
  const bounceFactor = 0.05; // Adjust this for more or less bounce
  const bounceHeight = velocity * bounceFactor;

  // Calculate new height based on formFlexBasis and bounce
  let targetHeight = formFlexBasis + bounceHeight;

  // Limit the target height
  if (targetHeight > 100) targetHeight = 100;
  if (targetHeight < 50) targetHeight = 50;

  // Apply transition for smooth effect
  formContainer.style.transition = 'flex-basis 0.5s ease';
  imageContainer.style.transition = 'flex-basis 0.5s ease';

  // If more than 87%, snap to 100% smoothly
  if (formFlexBasis > 87) {
    formContainer.style.flexBasis = '100%';
    imageContainer.style.flexBasis = '0%';
  } else {
    // Set final height based on calculated bounce
    formContainer.style.flexBasis = `${targetHeight}%`;
    imageContainer.style.flexBasis = `${100 - targetHeight}%`;
  }

  isDragging = false;
  document.body.style.cursor = 'default';
}

// Define options for non-passive event listeners
const nonPassiveOptions = { passive: false };

// Add event listeners for both touch and mouse events with non-passive option
dragLine.addEventListener('mousedown', startDrag);
dragLine.addEventListener('touchstart', startDrag, nonPassiveOptions);

document.addEventListener('mousemove', onDrag);
document.addEventListener('touchmove', onDrag, nonPassiveOptions);

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);
