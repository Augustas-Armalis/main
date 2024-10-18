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

const velocityDecay = 0.9;  // Adjusted for smoother velocity decay
const bounceFactor = 0.5;    // Toned down bounce effect

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
  lastTimestamp = performance.now();

  document.body.style.cursor = 'grabbing';
  e.preventDefault(); // Prevent default scroll behavior

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
  const dy = startY - currentY; // Change in Y position
  const newHeight = startHeight + dy;

  const minHeight = window.innerHeight * 0.5;
  const maxHeight = window.innerHeight;

  // Limit new height within bounds
  if (newHeight >= minHeight - 20 && newHeight <= maxHeight + 20) {
    const newFlexBasis = (newHeight / window.innerHeight) * 100;

    // Calculate velocity for inertia effect
    const currentTimestamp = performance.now();
    const deltaTime = currentTimestamp - lastTimestamp;

    if (deltaTime > 0) {
      // Update velocity
      velocity = (currentY - lastY) / deltaTime; // Pixels per millisecond
    }

    lastY = currentY;
    lastTimestamp = currentTimestamp;

    // Update styles smoothly with requestAnimationFrame
    window.requestAnimationFrame(() => {
      formContainer.style.flexBasis = `${newFlexBasis}%`;
      imageContainer.style.flexBasis = `${100 - newFlexBasis}%`;

      // Class management
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

  e.preventDefault(); // Prevent default scroll behavior
}

function endDrag() {
  if (!isDragging) return;

  // Re-enable transitions for smooth effect
  formContainer.style.transition = 'flex-basis 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
  imageContainer.style.transition = 'flex-basis 0.3s cubic-bezier(0.25, 1, 0.5, 1)';

  const formFlexBasis = parseFloat(getComputedStyle(formContainer).flexBasis);
  let targetHeight;

  // Target height calculation
  if (formFlexBasis >= 87) {
    targetHeight = 100;
    formContainer.classList.add('full-open');
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  } else {
    // Toned down bounce effect
    targetHeight = Math.max(50, Math.min(100, formFlexBasis - (velocity * bounceFactor * 5)));
  }

  // Smooth transition of drag line
  dragLine.style.transition = 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
  dragLine.style.width = '100px';
  dragLine.style.height = '5px';
  dragLine.style.backgroundColor = 'hsla(235, 5%, 25%, 1)';

  // Apply final height
  formContainer.style.flexBasis = `${targetHeight}%`;
  imageContainer.style.flexBasis = `${100 - targetHeight}%`;

  // Implement inertia with improved damping
  const inertiaInterval = setInterval(() => {
    if (Math.abs(velocity) < 0.1) {
      clearInterval(inertiaInterval);
      return;
    }

    targetHeight -= velocity * bounceFactor; // Apply velocity with bounce factor
    targetHeight = Math.min(Math.max(targetHeight, 50), 100); // Keep within bounds

    // Class management for radius effect
    if (targetHeight < 49 && targetHeight >= 47) {
      formContainer.classList.add('in-radius');
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    } else {
      formContainer.classList.remove('in-radius');
    }

    // Update the flex basis with animation
    formContainer.style.flexBasis = `${targetHeight}%`;
    imageContainer.style.flexBasis = `${100 - targetHeight}%`;

    // Dampen the velocity
    velocity *= velocityDecay;
  }, 16); // Roughly 60 FPS

  isDragging = false;
  document.body.style.cursor = 'default';
}

// Attach event listeners
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
