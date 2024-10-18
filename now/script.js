const formContainer = document.querySelector('.form-side-container');
const imageContainer = document.querySelector('.image-side-container');
const dragLine = document.querySelector('.drag-line');

let isDragging = false;
let startY = 0;
let startHeight = 0;

// Start dragging
function startDrag(e) {
  if (window.innerWidth > 768) return; // Only enable drag on mobile/tablet
  isDragging = true;

  startY = e.touches ? e.touches[0].clientY : e.clientY;
  startHeight = formContainer.getBoundingClientRect().height; // Get the starting height

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

    formContainer.style.flexBasis = `${newFlexBasis}%`;
    imageContainer.style.flexBasis = `${100 - newFlexBasis}%`;
  }

  e.preventDefault(); // Prevent unwanted behaviors like page scrolling
}

// End dragging (snapping behavior)
function endDrag() {
  if (!isDragging) return;

  const formFlexBasis = parseFloat(getComputedStyle(formContainer).flexBasis);

  if (formFlexBasis > 80) {
    // If more than 80%, snap to 100% smoothly
    formContainer.style.flexBasis = '100%';
    imageContainer.style.flexBasis = '0%';
  } else {
    // Keep wherever user left it, unless it's less than 50%
    if (formFlexBasis < 50) {
      formContainer.style.flexBasis = '50%';
      imageContainer.style.flexBasis = '50%';
    }
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
