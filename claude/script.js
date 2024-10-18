const formContainer = document.querySelector('.form-side-container');
const imageContainer = document.querySelector('.image-side-container');
const dragLineContainer = document.querySelector('.drag-line-container');
const dragLine = document.querySelector('.drag-line');

let isDragging = false;
let startY = 0;
let initialFormHeight = 0;
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
  if (!isDragging) {
    dragLine.style.backgroundColor = 'white';
    dragLine.style.width = '110px';
    dragLine.style.height = '6px';
  }
}

function handleMouseLeave() {
  if (!isDragging) {
    dragLine.style.backgroundColor = 'hsla(235, 5%, 25%, 1)';
    dragLine.style.width = '100px';
    dragLine.style.height = '5px';
  }
}

function startDrag(e) {
  if (window.innerWidth > 768) return;

  isDragging = true;
  // Store the initial touch/mouse position
  startY = e.touches ? e.touches[0].pageY : e.pageY;
  // Store the initial form container height
  initialFormHeight = formContainer.getBoundingClientRect().height;

  // Remove transitions for smooth dragging
  formContainer.style.transition = 'none';
  imageContainer.style.transition = 'none';

  lastY = startY;
  lastTimestamp = performance.now();

  // Visual feedback
  dragLine.style.backgroundColor = 'white';
  dragLine.style.width = '90px';
  dragLine.style.height = '3px';

  if (navigator.vibrate) {
    navigator.vibrate(50);
  }

  e.preventDefault();
}

function onDrag(e) {
  if (!isDragging || window.innerWidth > 768) return;

  const currentY = e.touches ? e.touches[0].pageY : e.pageY;
  const deltaY = startY - currentY;

  // Calculate new height based on initial height and movement
  const newHeight = initialFormHeight + deltaY;
  const windowHeight = window.innerHeight;

  // Convert to percentage and apply constraints
  let newFlexBasis = (newHeight / windowHeight) * 100;
  newFlexBasis = Math.max(50, Math.min(100, newFlexBasis));

  // Calculate velocity for inertia
  const currentTimestamp = performance.now();
  const deltaTime = currentTimestamp - lastTimestamp;

  if (deltaTime > 0) {
    velocity = (currentY - lastY) / deltaTime;
  }

  lastY = currentY;
  lastTimestamp = currentTimestamp;

  // Update container sizes
  requestAnimationFrame(() => {
    formContainer.style.flexBasis = `${newFlexBasis}%`;
    imageContainer.style.flexBasis = `${100 - newFlexBasis}%`;

    // Handle radius classes
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

  e.preventDefault();
}

function endDrag() {
  if (!isDragging) return;

  // Restore transitions
  formContainer.style.transition = 'flex-basis 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
  imageContainer.style.transition = 'flex-basis 0.3s cubic-bezier(0.25, 1, 0.5, 1)';

  const currentBasis = parseFloat(getComputedStyle(formContainer).flexBasis);
  let targetHeight = currentBasis - (velocity * bounceFactor * 5);

  // Constrain target height
  targetHeight = Math.max(50, Math.min(100, targetHeight));

  if (targetHeight >= 87) {
    targetHeight = 100;
    formContainer.classList.add('full-open');
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  }

  // Reset drag line appearance
  dragLine.style.transition = 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
  dragLine.style.width = '100px';
  dragLine.style.height = '5px';
  dragLine.style.backgroundColor = 'hsla(235, 5%, 25%, 1)';

  // Bounce animation
  dragLine.style.transform = 'scale(1.05, 1.05)';
  setTimeout(() => {
    dragLine.style.transform = 'scale(1, 1)';
  }, 150);

  // Apply final position
  formContainer.style.flexBasis = `${targetHeight}%`;
  imageContainer.style.flexBasis = `${100 - targetHeight}%`;

  isDragging = false;
}

// Event listeners with non-passive touch handling
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