const imageSources = {
    desktop: 'images/desktop.webp',
    mobile: 'images/mobile.webp',
    thumbnail: 'images/thumbnail.webp'
  };
  
  const visitLink = 'https://sproutmarketing.xyz';
  const youtubeVideo = 'https://www.youtube.com/embed/G7qvBdtHAO4?autoplay=1&modestbranding=1&rel=0&controls=1&color=white';
  
  // ?autoplay=1&modestbranding=1&rel=0&controls=1&color=white
  
  document.querySelector('.website-desktop').src = imageSources.desktop;
  document.querySelector('.website-mobile').src = imageSources.mobile;
  document.querySelector('.video-thumbnail').src = imageSources.thumbnail;
  document.querySelector('.visit-button').href = visitLink;
  document.querySelector('#ytplayer').src = youtubeVideo;