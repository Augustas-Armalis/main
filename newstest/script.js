const formContainer = document.querySelector('.form-side-container');
const imageContainer = document.querySelector('.image-side-container');
const dragLineContainer = document.querySelector('.drag-line-container');
const dragLine = document.querySelector('.drag-line');

let isDragging = false;
let startY = 0;
let startHeight = 0;
let lastY = 0;
let lastTimestamp = 0;
let velocity = 0;

const velocityDecay = 0.8;
const bounceFactor = 0.8;

function initializeLayout() {
  formContainer.style.flexBasis = '50%';
  imageContainer.style.flexBasis = '50%';
}

function handleHover() {
  dragLine.style.backgroundColor = 'white';
  dragLine.style.width = '110px';
  dragLine.style.height = '6px';
}

function handleMouseLeave() {
  dragLine.style.backgroundColor = 'hsla(235, 5%, 25%, 1)';
  dragLine.style.width = '100px';
  dragLine.style.height = '5px';
}

function startDrag(e) {
  if (window.innerWidth > 768) return;

  isDragging = true;
  startY = e.touches ? e.touches[0].clientY : e.clientY;
  startHeight = formContainer.getBoundingClientRect().height;

  // Disable transitions for smooth dragging
  formContainer.style.transition = 'none';
  imageContainer.style.transition = 'none';

  lastY = startY; // Initialize lastY with the starting position
  lastTimestamp = performance.now(); // Get the current timestamp

  document.body.style.cursor = 'grabbing'; // Change cursor
  e.preventDefault(); // Prevent default behavior

  // Change drag line style
  dragLine.style.backgroundColor = 'white';
  dragLine.style.width = '90px';
  dragLine.style.height = '3px';

  // Trigger vibration effect on press
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
}

function onDrag(e) {
  if (!isDragging || window.innerWidth > 768) return;

  const currentY = e.touches ? e.touches[0].clientY : e.clientY;

  // Calculate the change in Y position (dy)
  const dy = startY - currentY; // Calculate the difference
  const newHeight = startHeight + dy; // Update the new height based on dy

  const minHeight = window.innerHeight * 0.5; // Minimum height is 50% of the viewport
  const maxHeight = window.innerHeight; // Maximum height is 100% of the viewport

  // Check if the new height is within bounds
  if (newHeight >= minHeight - 20 && newHeight <= maxHeight + 20) {
    const newFlexBasis = (newHeight / window.innerHeight) * 100;

    // Use requestAnimationFrame for smoother updates
    window.requestAnimationFrame(() => {
      formContainer.style.flexBasis = `${newFlexBasis}%`;
      imageContainer.style.flexBasis = `${100 - newFlexBasis}%`;

      // Handle border radius based on flex-basis
      if (newFlexBasis < 49 && newFlexBasis >= 47) {
        formContainer.classList.add('in-radius');
      } else {
        formContainer.classList.remove('in-radius');
      }

      // Handle full-open class based on flex-basis
      if (newFlexBasis >= 87) {
        formContainer.classList.add('full-open');
      } else {
        formContainer.classList.remove('full-open');
      }
    });
  }

  e.preventDefault(); // Prevent unwanted behaviors like page scrolling
}

function endDrag() {
  if (!isDragging) return;

  formContainer.style.transition = '';
  imageContainer.style.transition = '';

  const formFlexBasis = parseFloat(getComputedStyle(formContainer).flexBasis);
  let targetHeight;

  // Check if we should fill to 100%
  if (formFlexBasis >= 87) {
    targetHeight = 100; // Set target height to 100%
    formContainer.classList.add('full-open'); // Ensure full-open class is added
    // Trigger vibration effect when reaching 100%
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  } else {
    targetHeight = formFlexBasis - (velocity * bounceFactor * 5); // Adjust target height based on velocity
  }

  // Limit the target height
  if (targetHeight > 100) {
    targetHeight = 100;
  } else if (targetHeight < 50) {
    targetHeight = 50;
  }

  // Set the drag line to original color and start bounce effect
  dragLine.style.transition = 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
  dragLine.style.width = '100px';
  dragLine.style.height = '5px';
  dragLine.style.backgroundColor = 'hsla(235, 5%, 25%, 1)';

  // Add bounce effect
  dragLine.style.transform = 'scale(1.05, 1.05)';
  setTimeout(() => {
    dragLine.style.transform = 'scale(1, 1)';
  }, 150); // Adjust timing as needed

  // Apply transition for smooth effect
  formContainer.style.transition = 'flex-basis 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
  imageContainer.style.transition = 'flex-basis 0.3s cubic-bezier(0.25, 1, 0.5, 1)';

  // Set final height based on calculated target height
  formContainer.style.flexBasis = `${targetHeight}%`;
  imageContainer.style.flexBasis = `${100 - targetHeight}%`;

  // Inertia effect for smoothness
  const inertiaInterval = setInterval(() => {
    if (Math.abs(velocity) < 0.1) {
      clearInterval(inertiaInterval);
      return; // Stop when velocity is small
    }

    targetHeight -= velocity * bounceFactor; // Apply inverted inertia

    // Cap the targetHeight at 100% and 50%
    if (targetHeight > 100) {
      targetHeight = 100; // Limit to 100%
      formContainer.classList.add('full-open'); // Ensure the class is added when fully open
    } else if (targetHeight < 50) {
      targetHeight = 50; // Limit to 50%
      formContainer.classList.remove('full-open'); // Remove class if not fully open
      formContainer.classList.add('full-down'); // Add class when below 50%
    } else {
      formContainer.classList.remove('full-down'); // Remove class when above 50%
    }

    // Check for the 47% to 49% zone for border radius
    if (targetHeight < 49 && targetHeight >= 47) {
      formContainer.classList.add('in-radius'); // Add class to round the corners
      if (navigator.vibrate) {
        navigator.vibrate(100); // Trigger vibration when reaching the radius zone
      }
    } else {
      formContainer.classList.remove('in-radius'); // Remove class if outside the zone
    }

    // Update height with transition
    formContainer.style.flexBasis = `${targetHeight}%`;
    imageContainer.style.flexBasis = `${100 - targetHeight}%`;

    // Reduce velocity
    velocity *= velocityDecay; // Gradually reduce velocity
  }, 16); // Roughly 60 FPS

  isDragging = false; // Reset dragging state
  document.body.style.cursor = 'default'; // Reset cursor
}

const nonPassiveOptions = { passive: false };

// Add event listeners for both touch and mouse events with non-passive option
dragLineContainer.addEventListener('mousedown', startDrag);
dragLineContainer.addEventListener('touchstart', startDrag, nonPassiveOptions);
document.addEventListener('mousemove', onDrag);
document.addEventListener('touchmove', onDrag, nonPassiveOptions);
document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);
dragLineContainer.addEventListener('mouseenter', handleHover);
dragLineContainer.addEventListener('mouseleave', handleMouseLeave);

// Initialize layout on page load
window.addEventListener('load', initializeLayout);
