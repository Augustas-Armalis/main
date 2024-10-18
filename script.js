const formContainer = document.querySelector('.form-side-container');
const imageContainer = document.querySelector('.image-side-container');
const dragLineContainer = document.querySelector('.drag-line-container');
const dragLine = document.querySelector('.drag-line');

let isDragging = false;
let startY = 0;
let startHeight = 0;
let lastY = 0;
let velocity = 0;

const velocityDecay = 0.8; // Controls the decay of velocity over time
const bounceFactor = 0.8; // Reduced factor to amplify bounce effect

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

  lastY = startY;

  document.body.style.cursor = 'grabbing';
  e.preventDefault();

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
  const dy = startY - currentY; // Movement based on initial touch position

  const newHeight = startHeight + dy; // Update height based on movement

  const minHeight = window.innerHeight * 0.5; // 50% of viewport
  const maxHeight = window.innerHeight; // 100% of viewport

  // Dynamically update height as you drag
  if (newHeight >= minHeight - 20 && newHeight <= maxHeight + 20) {
    const newFlexBasis = (newHeight / window.innerHeight) * 100;

    // Use requestAnimationFrame for smoother updates
    window.requestAnimationFrame(() => {
      formContainer.style.flexBasis = `${newFlexBasis}%`;
      imageContainer.style.flexBasis = `${100 - newFlexBasis}%`;

      // Logic for border-radius change
      if (newFlexBasis < 49 && newFlexBasis >= 47) {
        formContainer.classList.add('in-radius');
      } else {
        formContainer.classList.remove('in-radius');
      }

      // Logic for full-open class
      if (newFlexBasis >= 87) {
        formContainer.classList.add('full-open');
      } else {
        formContainer.classList.remove('full-open');
      }
    });
  }

  e.preventDefault(); // Prevent unwanted behaviors
}

function endDrag() {
  if (!isDragging) return;

  // Restore transitions after dragging
  formContainer.style.transition = '';
  imageContainer.style.transition = '';

  // Apply snapping behavior based on last known flexBasis
  const formFlexBasis = parseFloat(getComputedStyle(formContainer).flexBasis);
  let targetHeight;

  // If in the 87-100% zone, fill to 100% smoothly
  if (formFlexBasis >= 87) {
    targetHeight = 100; // Set target height to 100%
    formContainer.classList.add('full-open'); // Ensure full-open class is added
  } else {
    targetHeight = formFlexBasis - (velocity * bounceFactor * 5); // Adjusted for reduced bounce effect
  }

  // Limit the target height
  if (targetHeight > 100) targetHeight = 100;
  else if (targetHeight < 50) targetHeight = 50;

  // Set the final height with transition
  formContainer.style.transition = 'flex-basis 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
  imageContainer.style.transition = 'flex-basis 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
  formContainer.style.flexBasis = `${targetHeight}%`;
  imageContainer.style.flexBasis = `${100 - targetHeight}%`;

  // Check if we need to reset the border radius
  if (targetHeight >= 50) {
    formContainer.classList.remove('in-radius'); // Remove radius class if height is back to 50%
  }

  // Inertia effect after drag ends
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
    } else {
      formContainer.classList.remove('in-radius'); // Remove class if outside the zone
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

// Add event listeners for both touch and mouse events
dragLineContainer.addEventListener('mousedown', startDrag);
dragLineContainer.addEventListener('touchstart', startDrag, { passive: false });
document.addEventListener('mousemove', onDrag);
document.addEventListener('touchmove', onDrag, { passive: false });
document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);
dragLineContainer.addEventListener('mouseenter', handleHover);
dragLineContainer.addEventListener('mouseleave', handleMouseLeave);

// Initialize layout on page load
window.addEventListener('load', initializeLayout);
