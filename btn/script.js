const container = document.querySelector('.container'); // Your main draggable container
const dragHandle = document.querySelector('.drag-handle'); // The drag handle
const touchArea = document.querySelector('.touch-area'); // The touch area for better interaction

let isDragging = false;
let startY = 0;
let startHeight = 0;
let lastY = 0;
let lastTimestamp = 0;
let velocity = 0;

const velocityDecay = 0.8; // Adjust to control the velocity decay
const bounceFactor = 0.8; // Bounce effect strength

function startDrag(e) {
  e.preventDefault();
  isDragging = true;

  // Determine if it's touch or mouse input
  startY = e.touches ? e.touches[0].clientY : e.clientY;
  startHeight = container.offsetHeight;

  // Disable transitions for smooth dragging
  container.style.transition = 'none';

  lastY = startY;
  lastTimestamp = performance.now(); // Reset timestamps for velocity calculations

  document.body.style.cursor = 'grabbing'; // Change cursor style
}

function drag(e) {
  if (!isDragging) return;

  // Use the current touch or mouse position
  const currentY = e.touches ? e.touches[0].clientY : e.clientY;

  const dy = startY - currentY; // Change in Y position
  const newHeight = startHeight + dy;

  const minHeight = window.innerHeight * 0.5; // Minimum height (50% of viewport)
  const maxHeight = window.innerHeight; // Maximum height (100% of viewport)

  // Allow dragging below the minimum height for more interaction
  if (newHeight >= minHeight - 20 && newHeight <= maxHeight + 20) {
    // Update the container's height
    container.style.height = `${newHeight}px`;

    // Calculate velocity for inertia effect
    const currentTimestamp = performance.now();
    const deltaTime = currentTimestamp - lastTimestamp;

    if (deltaTime > 0) {
      // Update velocity based on time elapsed
      velocity = (lastY - currentY) / deltaTime; // Pixels per millisecond
    }

    lastY = currentY; // Update last Y position
    lastTimestamp = currentTimestamp; // Update last timestamp

    // Update border radius dynamically based on height
    const heightPercentage = (newHeight / window.innerHeight) * 100;

    // Change border radius based on height from 49% to 47%
    if (heightPercentage < 49 && heightPercentage >= 47) {
      const radius = 16 - (16 - 8) * ((49 - heightPercentage) / 2); // Calculate radius from 16px to 8px
      container.style.borderTopLeftRadius = `${radius}px`; // Set border-radius
      container.style.borderTopRightRadius = `${radius}px`; // Set border-radius
    } else if (heightPercentage >= 85 && heightPercentage < 100) {
      // Change border radius from 16px at 85% to 0px at 100%
      const radius = 16 * ((100 - heightPercentage) / 15); // Smooth transition
      container.style.borderTopLeftRadius = `${radius}px`; // Set border-radius
      container.style.borderTopRightRadius = `${radius}px`; // Set border-radius
    } else if (heightPercentage >= 100) {
      // Ensure border radius is 0px when at 100%
      container.style.borderTopLeftRadius = '0px';
      container.style.borderTopRightRadius = '0px';
    } else {
      // Reset to 16px if above 49% or below 85%
      container.style.borderTopLeftRadius = '16px';
      container.style.borderTopRightRadius = '16px';
    }
  }

  e.preventDefault(); // Prevent default scroll behavior
}

function endDrag() {
  if (!isDragging) return;

  // Enable transitions for the bounce effect
  container.style.transition = 'height 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-radius 0.3s ease'; // Enable border-radius transition

  // Calculate target height based on velocity
  let targetHeight = container.offsetHeight + velocity * bounceFactor * 30; // Adjust this factor for a stronger effect
  const minHeight = window.innerHeight * 0.5;
  const maxHeight = window.innerHeight;

  // Constrain target height
  if (targetHeight > maxHeight) targetHeight = maxHeight;
  if (targetHeight < minHeight) targetHeight = minHeight; // Ensure the final height respects the min height

  // Check if we are in the snap zone (85% to 100%)
  const snapZoneLower = maxHeight * 0.85;
  const snapZoneUpper = maxHeight;

  if (targetHeight >= snapZoneLower && targetHeight <= snapZoneUpper) {
    targetHeight = maxHeight; // Snap to 100%
    container.style.borderTopLeftRadius = '0px'; // Animate border-radius to 0px
    container.style.borderTopRightRadius = '0px'; // Animate border-radius to 0px
  }

  // Check for bouncing effect when released between 50% and 47%
  const bounceZoneLower = minHeight; // 50%
  const bounceZoneUpper = minHeight * 0.94; // 47%

  if (targetHeight < bounceZoneUpper && targetHeight > bounceZoneLower) {
    // Apply inertia for bouncing back
    const bounceInertia = setInterval(() => {
      if (targetHeight >= minHeight) {
        clearInterval(bounceInertia); // Stop bouncing when it reaches 50%
        return;
      }
      targetHeight += (bounceZoneUpper - targetHeight) * 0.2; // Bounce back towards 50%
      container.style.height = `${targetHeight}px`;

      // Calculate radius from 8px to 16px
      const radius = 8 + (16 - 8) * ((49 - (targetHeight / window.innerHeight) * 100) / 2);
      container.style.borderTopLeftRadius = `${radius}px`; // Set border-radius
      container.style.borderTopRightRadius = `${radius}px`; // Set border-radius
    }, 16); // Roughly 60 FPS
  } else {
    // Set the final height
    container.style.height = `${targetHeight}px`;

    // Animate border-radius for bounce effect
    const heightPercentage = (targetHeight / window.innerHeight) * 100;

    // Update border radius for bounce effect
    if (heightPercentage < 49 && heightPercentage >= 47) {
      const radius = 16 - (16 - 8) * ((49 - heightPercentage) / 2); // Calculate radius from 16px to 8px
      container.style.borderTopLeftRadius = `${radius}px`; // Set border-radius
      container.style.borderTopRightRadius = `${radius}px`; // Set border-radius
    } else if (heightPercentage >= 85 && heightPercentage < 100) {
      const radius = 16 * ((100 - heightPercentage) / 15); // Smooth transition to 0px
      container.style.borderTopLeftRadius = `${radius}px`; // Set border-radius
      container.style.borderTopRightRadius = `${radius}px`; // Set border-radius
    } else if (heightPercentage >= 100) {
      // Ensure border radius is 0px when at 100%
      container.style.borderTopLeftRadius = '0px';
      container.style.borderTopRightRadius = '0px';
    } else {
      // Reset to 16px if above 49% or below 85%
      container.style.borderTopLeftRadius = '16px';
      container.style.borderTopRightRadius = '16px';
    }
  }

  isDragging = false; // Reset dragging state
  document.body.style.cursor = 'default'; // Reset cursor style
}

// Event listeners
dragHandle.addEventListener('mousedown', startDrag);
dragHandle.addEventListener('touchstart', startDrag, { passive: false });
document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag, { passive: false });
document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

// Add touch event listeners for the touch area
touchArea.addEventListener('mousedown', startDrag);
touchArea.addEventListener('touchstart', startDrag, { passive: false });


