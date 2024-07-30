function copyText(text, tooltipId) {
  // Create a temporary textarea to hold the text to copy
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);

  // Show the tooltip with fade-in effect
  const tooltip = document.getElementById(tooltipId);
  tooltip.classList.add('tooltip-visible');

  // Hide the tooltip with fade-out effect after 1 second
  setTimeout(() => {
    tooltip.classList.remove('tooltip-visible');
  }, 1000);
}
