const formContainer = document.querySelector('.form-side-container');
const imageContainer = document.querySelector('.image-side-container');
const dragLineContainer = document.querySelector('.drag-line-container');
const dragLine = document.querySelector('.drag-line');

let isDragging = false;
let startY = 0;
let initialHeight = 0;
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
  e.preventDefault();

  if (window.innerWidth > 768) return; // Only enable for mobile width

  isDragging = true;

  // Get touch or mouse coordinates
  startY = e.touches ? e.touches[0].clientY : e.clientY;

  // Get the height of the form container relative to the parent (window height)
  const formRect = formContainer.getBoundingClientRect();
  initialHeight = formRect.height; // Save the initial height of the container

  lastY = startY;
  lastTimestamp = performance.now();

  // Disable transitions for smooth dragging
  formContainer.style.transition = 'none';
  imageContainer.style.transition = 'none';

  document.body.style.cursor = 'grabbing';

  // Change drag line style
  dragLine.style.backgroundColor = 'white';
  dragLine.style.width = '90px';
  dragLine.style.height = '3px';
}

function onDrag(e) {
  if (!isDragging || window.innerWidth > 768) return; // Only allow dragging for mobile view

  e.preventDefault();

  // Get current touch or mouse Y position
  const currentY = e.touches ? e.touches[0].clientY : e.clientY;

  // Calculate the difference in Y position (inverted for up direction)
  const dy = startY - currentY;
  const newHeight = initialHeight + dy; // Subtract to move up, add to move down

  const minHeight = window.innerHeight * 0.3; // Minimum height for the form container (30% of the viewport)
  const maxHeight = window.innerHeight * 0.9; // Maximum height (90%)

  if (newHeight >= minHeight && newHeight <= maxHeight) {
    // Calculate new percentage height based on the container's height
    const newFlexBasis = (newHeight / window.innerHeight) * 100;

    // Calculate velocity for inertia effect
    const currentTimestamp = performance.now();
    const deltaTime = currentTimestamp - lastTimestamp;

    if (deltaTime > 0) {
      velocity = (currentY - lastY) / deltaTime; // Update velocity based on drag speed
    }

    lastY = currentY;
    lastTimestamp = currentTimestamp;

    // Update the container heights smoothly using requestAnimationFrame
    window.requestAnimationFrame(() => {
      formContainer.style.flexBasis = `${newFlexBasis}%`;
      imageContainer.style.flexBasis = `${100 - newFlexBasis}%`;

      // Add or remove classes based on the height for specific states
      if (newFlexBasis < 49 && newFlexBasis >= 47) {
        formContainer.classList.add('in-radius');
      } else {
        formContainer.classList.remove('in-radius');
      }

      if (newFlexBasis >= 87) {
        formContainer.classList.add('full-open');
      } else {
        formContainer.classList.remove('full-open');
      }
    });
  }
}

function endDrag() {
  if (!isDragging) return;

  // Re-enable transitions for smoother end animations
  formContainer.style.transition = '';
  imageContainer.style.transition = '';

  const formFlexBasis = parseFloat(getComputedStyle(formContainer).flexBasis);
  let targetHeight;

  if (formFlexBasis >= 87) {
    targetHeight = 100;
    formContainer.classList.add('full-open');
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  } else {
    targetHeight = formFlexBasis - (velocity * bounceFactor * 5); // Use velocity for bounce effect
  }

  // Clamp targetHeight to the valid range
  if (targetHeight > 100) targetHeight = 100;
  if (targetHeight < 30) targetHeight = 30;

  // Reset the drag line style to default
  dragLine.style.transition = 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
  dragLine.style.width = '100px';
  dragLine.style.height = '5px';
  dragLine.style.backgroundColor = 'hsla(235, 5%, 25%, 1)';

  dragLine.style.transform = 'scale(1.05, 1.05)';
  setTimeout(() => {
    dragLine.style.transform = 'scale(1, 1)';
  }, 150);

  formContainer.style.transition = 'flex-basis 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
  imageContainer.style.transition = 'flex-basis 0.3s cubic-bezier(0.25, 1, 0.5, 1)';

  // Set the final container height based on the calculated target height
  formContainer.style.flexBasis = `${targetHeight}%`;
  imageContainer.style.flexBasis = `${100 - targetHeight}%`;

  // Implement inertia to animate the height if necessary
  const inertiaInterval = setInterval(() => {
    if (Math.abs(velocity) < 0.1) {
      clearInterval(inertiaInterval);
      return;
    }

    targetHeight -= velocity * bounceFactor;

    if (targetHeight > 100) {
      targetHeight = 100;
      formContainer.classList.add('full-open');
    } else if (targetHeight < 30) {
      targetHeight = 30;
      formContainer.classList.remove('full-open');
      formContainer.classList.add('full-down');
    } else {
      formContainer.classList.remove('full-down');
    }

    if (targetHeight < 49 && targetHeight >= 47) {
      formContainer.classList.add('in-radius');
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    } else {
      formContainer.classList.remove('in-radius');
    }

    formContainer.style.flexBasis = `${targetHeight}%`;
    imageContainer.style.flexBasis = `${100 - targetHeight}%`;

    velocity *= velocityDecay; // Apply velocity decay for inertia effect
  }, 16); // Roughly 60 FPS

  isDragging = false;
  document.body.style.cursor = 'default';
}

const nonPassiveOptions = { passive: false };

dragLineContainer.addEventListener('mousedown', startDrag);
dragLineContainer.addEventListener('touchstart', startDrag, nonPassiveOptions);
document.addEventListener('mousemove', onDrag);
document.addEventListener('touchmove', onDrag, nonPassiveOptions);
document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);
dragLineContainer.addEventListener('mouseenter', handleHover);
dragLineContainer.addEventListener('mouseleave', handleMouseLeave);

window.addEventListener('load', initializeLayout);
