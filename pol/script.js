const formContainer = document.querySelector('.form-side-container');
const imageContainer = document.querySelector('.image-side-container');
const dragLine = document.querySelector('.drag-line');

let isDragging = false;
let startY = 0;
let startHeight = 0;
let velocity = 0; // Velocity to simulate inertia
let isOvershooting = false; // Flag for overshooting effect

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
  if (newHeight >= minHeight - 20 && newHeight <= maxHeight + 20) { // Allow slight overshoot
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

  // Bounce effect based on velocity
  const bounceFactor = 0.2; // Increase bounce factor for a more pronounced effect
  let targetHeight = formFlexBasis + (velocity * bounceFactor); // Target height with bounce

  // Limit the target height
  if (targetHeight > 100) {
    targetHeight = 100;
    isOvershooting = true; // Mark that we've overshot
  } else if (targetHeight < 50) {
    targetHeight = 50;
    isOvershooting = true; // Mark that we've undershot
  } else {
    isOvershooting = false; // No overshoot
  }

  // Apply transition for smooth effect
  formContainer.style.transition = 'flex-basis 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
  imageContainer.style.transition = 'flex-basis 0.3s cubic-bezier(0.25, 1, 0.5, 1)';

  // Snap to 100% height if more than 87%
  if (formFlexBasis > 87) {
    formContainer.style.flexBasis = '100%';
    imageContainer.style.flexBasis = '0%';
  } else {
    // Set final height based on calculated bounce
    formContainer.style.flexBasis = `${targetHeight}%`;
    imageContainer.style.flexBasis = `${100 - targetHeight}%`;
  }

  // Implementing bounce back effect for compression
  if (isOvershooting) {
    setTimeout(() => {
      if (targetHeight < 50) {
        // Bounce back to 50%
        formContainer.style.transition = 'flex-basis 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
        formContainer.style.flexBasis = '50%';
        imageContainer.style.flexBasis = '50%';
      }
    }, 300); // This time should match the duration of the transition
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
