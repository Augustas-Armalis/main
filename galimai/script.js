const container = document.querySelector('.container');
const dragHandle = document.querySelector('.drag-handle');

let isDragging = false;

dragHandle.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDrag);

// Handle touch events for mobile
dragHandle.addEventListener('touchstart', startDrag);
document.addEventListener('touchmove', drag);
document.addEventListener('touchend', stopDrag);

function startDrag(e) {
  e.preventDefault();
  isDragging = true;
}

function drag(e) {
  if (!isDragging) return;

  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const viewportHeight = window.innerHeight;

  // Calculate the new height
  let newHeight = viewportHeight - clientY;

  // Constrain the height between 50% and 100% of the viewport
  newHeight = Math.max(viewportHeight * 0.5, Math.min(newHeight, viewportHeight));

  container.style.height = `${newHeight}px`;
}

function stopDrag() {
  isDragging = false;
}
