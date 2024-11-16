document.getElementById('download-btn').addEventListener('click', () => {
    const downloadBtn = document.getElementById('download-btn');
    const thankYouMsg = document.getElementById('thank-you-msg');
    
    // Hide the download button
    downloadBtn.classList.add('hidden');
    
    // Show the thank-you message
    thankYouMsg.classList.remove('hidden');
  });
  