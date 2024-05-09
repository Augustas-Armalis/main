document.addEventListener("DOMContentLoaded", function () {
  document.body.style.overflow = "hidden";
  setTimeout(function () {
    document.body.style.overflow = "auto";
  }, 4000);
});

window.onload = function () {
  const bars = document.querySelector(".bars");
  const menu = document.querySelector(".menu");
  const navItems = document.querySelectorAll(".navigation-item");
  let menuOpen = false;
  let lenisInstance;

  function initializeLenis() {
    lenisInstance = new Lenis();
    lenisInstance.on('scroll', (e) => {
      console.log(e);
    });
    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  setTimeout(initializeLenis, 5000);

  bars.addEventListener("click", function (e) {
    this.classList.toggle("active");
    menuOpen = !menuOpen;
    if (menuOpen) {
      gsap.to(".menu", {
        duration: 1,
        display: "flex",
        ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
      });
      gsap.fromTo(".nav", {
        marginTop: "-100vh"
      }, {
        duration: 1,
        marginTop: "0",
        ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
        onComplete: function () {
          gsap.to(".navigation-item", {
            duration: 0,
            opacity: 1
          });
          gsap.to(".navigation-item", {
            duration: 0.6,
            y: 0,
            ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
            stagger: 0.1
          });
        }
      });
      document.body.style.overflow = 'hidden';
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
    } else {
      gsap.to(".navigation-item", {
        duration: 0.5,
        y: "-100%",
        ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
        stagger: 0.1,
        onComplete: function () {
          gsap.to(".navigation", {
            duration: 0,
            opacity: 0
          });
          gsap.to(".nav", {
            duration: 1,
            marginTop: "-100vh",
            ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
          });
          gsap.to(".menu", {
            duration: 1,
            display: "none",
            ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
          });
        }
      });
      document.body.style.overflow = 'auto';
      initializeLenis();
    }
  });
};

gsap.from(".split", {
  yPercent: 100,
  duration: 0.5,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.05,
  delay: 1,
  onComplete: function () {
    gsap.to(".split", {
      yPercent: 1000,
      duration: 1,
      delay: 1,
      ease: "power1.inOut"
    });
  }
});

gsap.set(".agency-a", { x: -160 });
gsap.to(".agency-a", {
  x: 0,
  duration: 1,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  delay: 4.4,
  onComplete: function () {
    gsap.to(".agency-a", {
      y: 0,
      duration: 1,
      ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
    });
  }
});

gsap.set(".plans", { x: -130 });
gsap.to(".plans", {
  x: 0,
  duration: 1,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  delay: 4.4,
  onComplete: function () {
    gsap.to(".plans", {
      y: 0,
      duration: 1,
      ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
    });
  }
});

gsap.set(".bars", { x: 100 });
gsap.to(".bars", {
  x: 0,
  duration: 1.5,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  delay: 4,
  onComplete: function () {
    gsap.to(".bars", {
      y: 0,
      duration: 1,
      ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
    });
  }
});

gsap.set(".agency-a1", { x: -130 });
gsap.to(".agency-a1", {
  x: 0,
  duration: 1,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  delay: 5,
  onComplete: function () {
    gsap.to(".agency-a1", {
      y: 0,
      duration: 1,
      ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
    });
  }
});

gsap.set(".bars1", { x: 270 });
gsap.to(".bars1", {
  x: 0,
  duration: 1.2,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  delay: 5,
  onComplete: function () {
    gsap.to(".bars1", {
      y: 0,
      duration: 1,
      ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
    });
  }
});

gsap.from(".land1", {
  yPercent: 100,
  duration: 0.5,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.05,
  delay: 4,
  onComplete: function () {
    gsap.to(".land1", {
      duration: 1,
      delay: 1,
      ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
    });
  }
});

gsap.from(".land2", {
  yPercent: 100,
  duration: 0.5,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: {
    amount: 0.5,
    from: "end",
    staggerDirection: -1
  },
  delay: 4,
  onComplete: function () {
    gsap.to(".land2", {
      duration: 1,
      delay: 1,
      ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
    });
  }
});

gsap.from(".land3", {
  yPercent: 100,
  duration: 0.5,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.05,
  delay: 4,
  onComplete: function () {
    gsap.to(".land3", {
      duration: 1,
      delay: 1,
      ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
    });
  }
});

gsap.from(".shiner-grider1", {
  yPercent: -100,
  duration: 1,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.05,
  delay: 4.2,
  onComplete: function () {
    gsap.to(".shiner-grider1", {
      duration: 1,
      delay: 1,
      ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
    });
  }
});

gsap.from(".shiner-grider2", {
  xPercent: -100,
  duration: 1,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.05,
  delay: 4.2,
  onComplete: function () {
    gsap.to(".shiner-grider2", {
      duration: 1,
      delay: 1,
      ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
    });
  }
});

const video = document.getElementById('bgVideo', 'bgVideo-foto');
gsap.set(video, { opacity: 0 });
const fadeInAnimation = () => {
  gsap.to(video, { duration: 2, opacity: 1, ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)" });
};
const delay = 5;
gsap.delayedCall(delay, fadeInAnimation);

const arrow = document.querySelector('.arrow');
gsap.set(arrow, { opacity: 0 });
const fadeInArrow = () => {
  gsap.to(arrow, { duration: 2, opacity: 1, ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)" });
};
const arrowDelay = 6.6;
gsap.delayedCall(arrowDelay, fadeInArrow);

const circleAppear = document.querySelector('.circle');
gsap.set(circleAppear, { opacity: 0 });
const circleFadeInAnimation = () => {
  gsap.to(circleAppear, { duration: 1, opacity: 1, ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)" });
};
const circleDelay = 4;
gsap.delayedCall(circleDelay, circleFadeInAnimation);

const circleElement = document.querySelector('.circle');
const mouse = { x: 0, y: 0 };
const previousMouse = { x: 0, y: 0 };
const circle = { x: 0, y: 0 };
let currentScale = 0;
let currentAngle = 0;

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

const speed = 0.4;

const tick = () => {
  circle.x += (mouse.x - circle.x) * speed;
  circle.y += (mouse.y - circle.y) * speed;

  const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

  const deltaMouseX = mouse.x - previousMouse.x;
  const deltaMouseY = mouse.y - previousMouse.y;
  previousMouse.x = mouse.x;
  previousMouse.y = mouse.y;
  const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 10, 150);
  const scaleValue = (mouseVelocity / 150) * 0.5;
  currentScale += (scaleValue - currentScale) * speed;
  const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

  const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
  if (mouseVelocity > 20) {
    currentAngle = angle;
  }
  const rotateTransform = `rotate(${currentAngle}deg)`;

  circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

  window.requestAnimationFrame(tick);
}

tick();

const bgVideo = document.getElementById('bgVideo');
gsap.set(bgVideo, { opacity: 0 });
const fadeInVideo = () => {
  gsap.to(bgVideo, { duration: 2, opacity: 1, ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)" });
};
const fadeInDelay = 5;
gsap.delayedCall(fadeInDelay, fadeInVideo);
const pauseVideo = () => {
  bgVideo.pause();
};
const playVideo = () => {
  bgVideo.play();
};
let isVideoPlaying = false;
let mouseX = 0;
let mouseY = 0;
let prevMouseX = 0;
let prevMouseY = 0;
let mouseVelocity = 0;
window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});
window.addEventListener('mouseout', () => {
  pauseVideo();
  isVideoPlaying = false;
});
const calculateMouseVelocity = () => {
  const deltaX = mouseX - prevMouseX;
  const deltaY = mouseY - prevMouseY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const elapsedTime = 0.016;
  mouseVelocity = distance / elapsedTime;
  prevMouseX = mouseX;
  prevMouseY = mouseY;
};
const updatePlaybackRate = () => {
  const maxVelocity = 100;
  const minPlaybackRate = 0.5;
  const maxPlaybackRate = 1;
  calculateMouseVelocity();
  const newPlaybackRate = minPlaybackRate + (mouseVelocity / maxVelocity) * (maxPlaybackRate - minPlaybackRate) * 0.05;
  gsap.to(bgVideo, { playbackRate: newPlaybackRate, duration: 0.5 });
};
const handleMouseMovement = () => {
  if (!isVideoPlaying) {
    playVideo();
    isVideoPlaying = true;
  }
  clearTimeout(window.mouseMoveTimeout);
  window.mouseMoveTimeout = setTimeout(() => {
    pauseVideo();
    isVideoPlaying = false;
  }, 100);
};
window.addEventListener('mousemove', () => {
  updatePlaybackRate();
  handleMouseMovement();
});
const backgroundVideo = document.getElementById('bgVideo');
const pauseBackgroundVideo = () => {
  backgroundVideo.pause();
};
const playBackgroundVideo = () => {
  backgroundVideo.play();
};
window.addEventListener('touchstart', () => {
  playBackgroundVideo();
});
window.addEventListener('touchend', () => {
  pauseBackgroundVideo();
});

const spinningImg = document.querySelector('#spinning-img');
const img = spinningImg.querySelector('img');
const hoverTrigger = document.querySelector('#hover-trigger');

const initialRotation = gsap.to(img, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed1(speed) {
  gsap.to(initialRotation, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTrigger.addEventListener('mouseenter', () => {
  changeSpeed1(4);
});

hoverTrigger.addEventListener('mouseleave', () => {
  changeSpeed1(1);
});

const spinner = document.querySelector('#spinning-img1');
const image = spinner.querySelector('img');
const trigger = document.querySelector('#hover-trigger1');

const rotationAnimation = gsap.to(image, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed2(speed) {
  gsap.to(rotationAnimation, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

trigger.addEventListener('mouseenter', () => {
  changeSpeed2(4);
});

trigger.addEventListener('mouseleave', () => {
  changeSpeed2(1);
});

const spinnerCopy1 = document.querySelector('#spinning-img15');
const imageCopy1 = spinnerCopy1.querySelector('img');
const triggerCopy1 = document.querySelector('#hover-trigger15');

const rotationAnimationCopy1 = gsap.to(imageCopy1, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeedCopy1(speed) {
  gsap.to(rotationAnimationCopy1, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

triggerCopy1.addEventListener('mouseenter', () => {
  changeSpeedCopy1(4);
});

triggerCopy1.addEventListener('mouseleave', () => {
  changeSpeedCopy1(1);
});

const spinnerCopy2 = document.querySelector('#spinning-img16');
const imageCopy2 = spinnerCopy2.querySelector('img');
const triggerCopy2 = document.querySelector('#hover-trigger16');

const rotationAnimationCopy2 = gsap.to(imageCopy2, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeedCopy2(speed) {
  gsap.to(rotationAnimationCopy2, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

triggerCopy2.addEventListener('mouseenter', () => {
  changeSpeedCopy2(4);
});

triggerCopy2.addEventListener('mouseleave', () => {
  changeSpeedCopy2(1);
});

const spinningImgPlans1 = document.querySelector('#plans-spinning-img1');
const imgPlans1 = spinningImgPlans1.querySelector('img');
const hoverTriggerPlans1 = document.querySelector('#plans-hover-trigger1');

const initialRotationPlans1 = gsap.to(imgPlans1, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed3(speed) {
  gsap.to(initialRotationPlans1, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans1.addEventListener('mouseenter', () => {
  changeSpeed3(4);
});

hoverTriggerPlans1.addEventListener('mouseleave', () => {
  changeSpeed3(1);
});

const spinningImgPlans2 = document.querySelector('#plans-spinning-img2');
const imgPlans2 = spinningImgPlans2.querySelector('img');
const hoverTriggerPlans2 = document.querySelector('#plans-hover-trigger2');

const initialRotationPlans2 = gsap.to(imgPlans2, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed4(speed) {
  gsap.to(initialRotationPlans2, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans2.addEventListener('mouseenter', () => {
  changeSpeed4(4);
});

hoverTriggerPlans2.addEventListener('mouseleave', () => {
  changeSpeed4(1);
});

const spinningImgPlans3 = document.querySelector('#plans-spinning-img3');
const imgPlans3 = spinningImgPlans3.querySelector('img');
const hoverTriggerPlans3 = document.querySelector('#plans-hover-trigger3');

const initialRotationPlans3 = gsap.to(imgPlans3, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed5(speed) {
  gsap.to(initialRotationPlans3, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans3.addEventListener('mouseenter', () => {
  changeSpeed5(4);
});

hoverTriggerPlans3.addEventListener('mouseleave', () => {
  changeSpeed5(1);
});

const spinningImgPlans4 = document.querySelector('#plans-spinning-img4');
const imgPlans4 = spinningImgPlans4.querySelector('img');
const hoverTriggerPlans4 = document.querySelector('#plans-hover-trigger4');

const initialRotationPlans4 = gsap.to(imgPlans4, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed6(speed) {
  gsap.to(initialRotationPlans4, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans4.addEventListener('mouseenter', () => {
  changeSpeed6(4);
});

hoverTriggerPlans4.addEventListener('mouseleave', () => {
  changeSpeed6(1);
});

const spinningImgPlans5 = document.querySelector('#plans-spinning-img5');
const imgPlans5 = spinningImgPlans5.querySelector('img');
const hoverTriggerPlans5 = document.querySelector('#plans-hover-trigger5');

const initialRotationPlans5 = gsap.to(imgPlans5, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed7(speed) {
  gsap.to(initialRotationPlans5, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans5.addEventListener('mouseenter', () => {
  changeSpeed7(4);
});

hoverTriggerPlans5.addEventListener('mouseleave', () => {
  changeSpeed7(1);
});

const spinningImgPlans6 = document.querySelector('#plans-spinning-img6');
const imgPlans6 = spinningImgPlans6.querySelector('img');
const hoverTriggerPlans6 = document.querySelector('#plans-hover-trigger6');

const initialRotationPlans6 = gsap.to(imgPlans6, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed8(speed) {
  gsap.to(initialRotationPlans6, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans6.addEventListener('mouseenter', () => {
  changeSpeed8(4);
});

hoverTriggerPlans6.addEventListener('mouseleave', () => {
  changeSpeed8(1);
});

const spinningImgPlans7 = document.querySelector('#plans-spinning-img7');
const imgPlans7 = spinningImgPlans7.querySelector('img');
const hoverTriggerPlans7 = document.querySelector('#plans-hover-trigger7');

const initialRotationPlans7 = gsap.to(imgPlans7, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed9(speed) {
  gsap.to(initialRotationPlans7, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans7.addEventListener('mouseenter', () => {
  changeSpeed9(4);
});

hoverTriggerPlans7.addEventListener('mouseleave', () => {
  changeSpeed9(1);
});

const spinningImgPlans8 = document.querySelector('#plans-spinning-img8');
const imgPlans8 = spinningImgPlans8.querySelector('img');
const hoverTriggerPlans8 = document.querySelector('#plans-hover-trigger8');

const initialRotationPlans8 = gsap.to(imgPlans8, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed10(speed) {
  gsap.to(initialRotationPlans8, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans8.addEventListener('mouseenter', () => {
  changeSpeed10(4);
});

hoverTriggerPlans8.addEventListener('mouseleave', () => {
  changeSpeed10(1);
});

const spinningImgPlans9 = document.querySelector('#plans-spinning-img9');
const imgPlans9 = spinningImgPlans9.querySelector('img');
const hoverTriggerPlans9 = document.querySelector('#plans-hover-trigger9');

const initialRotationPlans9 = gsap.to(imgPlans9, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed11(speed) {
  gsap.to(initialRotationPlans9, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans9.addEventListener('mouseenter', () => {
  changeSpeed11(4);
});

hoverTriggerPlans9.addEventListener('mouseleave', () => {
  changeSpeed11(1);
});

const spinningImgPlans10 = document.querySelector('#plans-spinning-img10');
const imgPlans10 = spinningImgPlans10.querySelector('img');
const hoverTriggerPlans10 = document.querySelector('#plans-hover-trigger10');

const initialRotationPlans10 = gsap.to(imgPlans10, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed12(speed) {
  gsap.to(initialRotationPlans10, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans10.addEventListener('mouseenter', () => {
  changeSpeed12(4);
});

hoverTriggerPlans10.addEventListener('mouseleave', () => {
  changeSpeed12(1);
});

const spinningImgPlans11 = document.querySelector('#plans-spinning-img11');
const imgPlans11 = spinningImgPlans11.querySelector('img');
const hoverTriggerPlans11 = document.querySelector('#plans-hover-trigger11');

const initialRotationPlans11 = gsap.to(imgPlans11, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed13(speed) {
  gsap.to(initialRotationPlans11, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans11.addEventListener('mouseenter', () => {
  changeSpeed13(4);
});

hoverTriggerPlans11.addEventListener('mouseleave', () => {
  changeSpeed13(1);
});

const spinningImgPlans12 = document.querySelector('#plans-spinning-img12');
const imgPlans12 = spinningImgPlans12.querySelector('img');
const hoverTriggerPlans12 = document.querySelector('#plans-hover-trigger12');

const initialRotationPlans12 = gsap.to(imgPlans12, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed14(speed) {
  gsap.to(initialRotationPlans12, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans12.addEventListener('mouseenter', () => {
  changeSpeed14(4);
});

hoverTriggerPlans12.addEventListener('mouseleave', () => {
  changeSpeed14(1);
});

const spinningImgPlans13 = document.querySelector('#plans-spinning-img13');
const imgPlans13 = spinningImgPlans13.querySelector('img');
const hoverTriggerPlans13 = document.querySelector('#plans-hover-trigger13');

const initialRotationPlans13 = gsap.to(imgPlans13, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed15(speed) {
  gsap.to(initialRotationPlans13, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans13.addEventListener('mouseenter', () => {
  changeSpeed15(4);
});

hoverTriggerPlans13.addEventListener('mouseleave', () => {
  changeSpeed15(1);
});

const spinningImgPlans14 = document.querySelector('#plans-spinning-img14');
const imgPlans14 = spinningImgPlans14.querySelector('img');
const hoverTriggerPlans14 = document.querySelector('#plans-hover-trigger14');

const initialRotationPlans14 = gsap.to(imgPlans14, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed16(speed) {
  gsap.to(initialRotationPlans14, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans14.addEventListener('mouseenter', () => {
  changeSpeed16(4);
});

hoverTriggerPlans14.addEventListener('mouseleave', () => {
  changeSpeed16(1);
});

const spinningImgPlans15 = document.querySelector('#plans-spinning-img15');
const imgPlans15 = spinningImgPlans15.querySelector('img');
const hoverTriggerPlans15 = document.querySelector('#plans-hover-trigger15');

const initialRotationPlans15 = gsap.to(imgPlans15, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed17(speed) {
  gsap.to(initialRotationPlans15, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans15.addEventListener('mouseenter', () => {
  changeSpeed17(4);
});

hoverTriggerPlans15.addEventListener('mouseleave', () => {
  changeSpeed17(1);
});

const spinningImgPlans16 = document.querySelector('#plans-spinning-img16');
const imgPlans16 = spinningImgPlans16.querySelector('img');
const hoverTriggerPlans16 = document.querySelector('#plans-hover-trigger16');

const initialRotationPlans16 = gsap.to(imgPlans16, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed18(speed) {
  gsap.to(initialRotationPlans16, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans16.addEventListener('mouseenter', () => {
  changeSpeed18(4);
});

hoverTriggerPlans16.addEventListener('mouseleave', () => {
  changeSpeed18(1);
});

const spinningImgPlans17 = document.querySelector('#plans-spinning-img17');
const imgPlans17 = spinningImgPlans17.querySelector('img');
const hoverTriggerPlans17 = document.querySelector('#plans-hover-trigger17');

const initialRotationPlans17 = gsap.to(imgPlans17, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed19(speed) {
  gsap.to(initialRotationPlans17, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans17.addEventListener('mouseenter', () => {
  changeSpeed19(4);
});

hoverTriggerPlans17.addEventListener('mouseleave', () => {
  changeSpeed19(1);
});

const spinningImgPlans18 = document.querySelector('#plans-spinning-img18');
const imgPlans18 = spinningImgPlans18.querySelector('img');
const hoverTriggerPlans18 = document.querySelector('#plans-hover-trigger18');

const initialRotationPlans18 = gsap.to(imgPlans18, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed20(speed) {
  gsap.to(initialRotationPlans18, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans18.addEventListener('mouseenter', () => {
  changeSpeed20(4);
});

hoverTriggerPlans18.addEventListener('mouseleave', () => {
  changeSpeed20(1);
});

const spinningImgPlans19 = document.querySelector('#plans-spinning-img19');
const imgPlans19 = spinningImgPlans19.querySelector('img');
const hoverTriggerPlans19 = document.querySelector('#plans-hover-trigger19');

const initialRotationPlans19 = gsap.to(imgPlans19, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed21(speed) {
  gsap.to(initialRotationPlans19, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans19.addEventListener('mouseenter', () => {
  changeSpeed21(4);
});

hoverTriggerPlans19.addEventListener('mouseleave', () => {
  changeSpeed21(1);
});

const spinningImgPlans20 = document.querySelector('#plans-spinning-special1');
const imgPlans20 = spinningImgPlans20.querySelector('img');
const hoverTriggerPlans20 = document.querySelector('.plans-container-inside1');

const initialRotationPlans20 = gsap.to(imgPlans20, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed22(speed) {
  gsap.to(initialRotationPlans20, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans20.addEventListener('mouseenter', () => {
  changeSpeed22(4);
});

hoverTriggerPlans20.addEventListener('mouseleave', () => {
  changeSpeed22(1);
});

const spinningImgPlans21 = document.querySelector('#plans-spinning-special2');
const imgPlans21 = spinningImgPlans21.querySelector('img');
const hoverTriggerPlans21 = document.querySelector('.plans-container-inside2');

const initialRotationPlans21 = gsap.to(imgPlans21, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed23(speed) {
  gsap.to(initialRotationPlans21, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans21.addEventListener('mouseenter', () => {
  changeSpeed23(4);
});

hoverTriggerPlans21.addEventListener('mouseleave', () => {
  changeSpeed23(1);
});

const spinningImgPlans22 = document.querySelector('#plans-spinning-special3');
const imgPlans22 = spinningImgPlans22.querySelector('img');
const hoverTriggerPlans22 = document.querySelector('.plans-container-inside3');

const initialRotationPlans22 = gsap.to(imgPlans22, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed24(speed) {
  gsap.to(initialRotationPlans22, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans22.addEventListener('mouseenter', () => {
  changeSpeed24(4);
});

hoverTriggerPlans22.addEventListener('mouseleave', () => {
  changeSpeed24(1);
});

const spinningImgPlans23 = document.querySelector('#plans-spinning-special4');
const imgPlans23 = spinningImgPlans23.querySelector('img');
const hoverTriggerPlans23 = document.querySelector('.plans-container-inside4');

const initialRotationPlans23 = gsap.to(imgPlans23, {
  rotation: 360,
  duration: 4,
  repeat: -1,
  ease: "linear"
});

function changeSpeed25(speed) {
  gsap.to(initialRotationPlans23, {
    timeScale: speed,
    duration: 0.25,
    ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
  });
}

hoverTriggerPlans23.addEventListener('mouseenter', () => {
  changeSpeed25(4);
});

hoverTriggerPlans23.addEventListener('mouseleave', () => {
  changeSpeed25(1);
});

const containerWidth = document.querySelector(".first-container").offsetWidth;
const textWidth = document.querySelector(".moving-sideways").offsetWidth;

let multiplier;
if (window.innerWidth <= 768) {
  multiplier = 4;
} else {
  multiplier = 1.5;
}

let sliderWidth;
if (window.innerWidth <= 768) {
  sliderWidth = 500;
} else {
  sliderWidth = 1100;
}

const initialX = containerWidth + sliderWidth;
gsap.set(".moving-sideways", { x: initialX });

gsap.to(".moving-sideways", {
  scrollTrigger: {
    trigger: ".first-container",
    start: "top",
    end: () => "+=" + (containerWidth * multiplier),
    scrub: 1,
    pin: ".first-container"
  },
  x: -textWidth + 20,
  ease: "none",
  duration: 5
});

let multipliertext;
if (window.innerWidth <= 768) {
  multipliertext = 3;
} else {
  multipliertext = 1.1;
}

const splitTypes = document.querySelectorAll('.reveal-type')

splitTypes.forEach((char, i) => {

  const bg = char.dataset.bgColor
  const fg = char.dataset.fgColor

  const text = new SplitType(char, { types: 'chars' })

  gsap.fromTo(text.chars,
    {
      color: bg,
    },
    {
      color: fg,
      duration: 0.9,
      stagger: 1,
      scrollTrigger: {
        trigger: ".second-container",
        start: "top",
        pin: true,
        end: () => "+=" + (containerWidth * multipliertext),
        scrub: true,
        markers: false,
        toggleActions: 'play play reverse reverse'
      }
    })
})

gsap.from(".title", {
  scrollTrigger: {
    trigger: ".title",
    toggleActions: "restart none reverse restart"
  },
  yPercent: 100,
  duration: 0.4,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.2,
});

gsap.from(".below-sideways-moving-text", {
  delay: 0.5,
  scrollTrigger: {
    trigger: ".below-sideways-moving-text",
    toggleActions: "restart none reverse restart"
  },
  opacity: 0,
  duration: 1,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.5,
});

let cardSmth;
if (window.innerWidth <= 768) {
  cardSmth = 6;
} else {
  cardSmth = 1;
}

gsap.set(".flying-card", { yPercent: 130 });

gsap.to(".flying-card", {
  scrollTrigger: {
    trigger: ".third-container",
    start: "top",
    end: () => "+=" + (containerWidth * cardSmth),
    scrub: 1,
    pin: ".third-container"
  },
  yPercent: 0,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  duration: 1,
  stagger: 1,
});

gsap.set(".flying-card1", { yPercent: 130 });

gsap.to(".flying-card1", {
  scrollTrigger: {
    trigger: ".third-container1",
    start: "top",
    end: () => "+=" + (containerWidth * cardSmth),
    scrub: 1,
    pin: ".third-container1"
  },
  yPercent: 0,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  duration: 1,
  stagger: 1,
});

gsap.from(".title4", {
  scrollTrigger: {
    trigger: ".title4",
    toggleActions: "restart none restart reverse"
  },
  yPercent: 100,
  duration: 0.4,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.2,
});

gsap.from(".title41", {
  scrollTrigger: {
    trigger: ".title41",
    toggleActions: "restart none restart reverse"
  },
  yPercent: 100,
  duration: 0.4,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.2,
});

gsap.from(".title42", {
  scrollTrigger: {
    trigger: ".title42",
    toggleActions: "restart none restart reverse"
  },
  yPercent: 100,
  duration: 0.4,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.2,
});

gsap.from(".title43", {
  scrollTrigger: {
    trigger: ".title43",
    toggleActions: "restart none restart reverse"
  },
  yPercent: 100,
  duration: 0.4,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.2,
});

gsap.from(".title44", {
  scrollTrigger: {
    trigger: ".title44",
    toggleActions: "restart none restart reverse"
  },
  yPercent: 100,
  duration: 0.4,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.2,
});

gsap.from(".title45", {
  scrollTrigger: {
    trigger: ".title45",
    toggleActions: "restart none restart reverse"
  },
  yPercent: 100,
  duration: 0.4,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.2,
});

gsap.from(".title46", {
  scrollTrigger: {
    trigger: ".title46",
    toggleActions: "restart none restart reverse"
  },
  yPercent: 100,
  duration: 0.4,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.2,
});

gsap.from(".title47", {
  scrollTrigger: {
    trigger: ".title47",
    toggleActions: "restart none restart reverse"
  },
  yPercent: 100,
  duration: 0.4,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.2,
});

gsap.from(".title50", {
  scrollTrigger: {
    trigger: ".title50",
    toggleActions: "restart none restart reverse"
  },
  yPercent: 100,
  duration: 0.4,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.2,
});

gsap.from(".title51", {
  scrollTrigger: {
    trigger: ".title51",
    toggleActions: "restart none restart reverse"
  },
  yPercent: 100,
  duration: 0.4,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.2,
});

gsap.from(".title52", {
  scrollTrigger: {
    trigger: ".title52",
    toggleActions: "restart none restart reverse"
  },
  yPercent: 100,
  duration: 0.4,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.2,
});

gsap.from(".fourth-text", {
  delay: 0.5,
  scrollTrigger: {
    trigger: ".fourth-text",
    toggleActions: "restart none restart restart"
  },
  opacity: 0,
  duration: 1,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.5,
});

gsap.from(".fourth-text1", {
  delay: 0.5,
  scrollTrigger: {
    trigger: ".fourth-text1",
    toggleActions: "restart none restart restart"
  },
  opacity: 0,
  duration: 1,
  ease: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  stagger: 0.5,
});

let currentScroll = 0;
let isScrollingDown = true;
let tween;
let isDragging = false;
let initialDragX = 0;
let dragPercentage = 100;
let currentDirection = 1;

const marqueeWidth = document.querySelector('.marquee-inner').offsetWidth;

let scrollImageEx;
if (window.innerWidth <= 768) {
  scrollImageEx = 9;
} else {
  scrollImageEx = 15;
}

function createAnimation() {
  tween = gsap.to(".marquee-inner", {
    x: -marqueeWidth / 2,
    repeat: -1,
    duration: scrollImageEx,
    ease: "linear",
  }).totalProgress(0.5);
}

createAnimation();

function startDrag(event) {
  if (event.target.classList.contains('marquee-part')) {
    isDragging = true;
    initialDragX = event.clientX || event.touches[0].clientX;
    gsap.set(tween, { timeScale: 0 });
  }
}

function drag(event) {
  if (isDragging) {
    const clientX = event.clientX || event.touches[0].clientX;
    const dragDistance = clientX - initialDragX;
    let sensitivity = 1;
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      sensitivity = 5;
    }
    dragPercentage = dragDistance / (window.innerWidth * sensitivity);
    tween.progress(tween.progress() - dragPercentage);
    initialDragX = clientX;
  }
}

function endDrag() {
  if (isDragging) {
    isDragging = false;
    currentDirection = dragPercentage > 0 ? -1 : 1;
    gsap.to(tween, {
      timeScale: currentDirection,
      duration: 0,
      onComplete: () => {
        tween.progress(tween.progress() - dragPercentage);
        dragPercentage = 0;
      }
    });
  }
}

window.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', drag);
window.addEventListener('mouseup', endDrag);

window.addEventListener('touchstart', startDrag);
window.addEventListener('touchmove', drag);
window.addEventListener('touchend', endDrag);

window.addEventListener("scroll", function () {
  if (window.pageYOffset > currentScroll) {
    isScrollingDown = true;
  } else {
    isScrollingDown = false;
  }

  gsap.to(tween, {
    timeScale: isScrollingDown ? 1 : -1,
  });

  currentScroll = window.pageYOffset;
});

const secondaryVideo = document.getElementById('bgVideo-foto');

const pauseSecondaryVideo = () => {
  secondaryVideo.pause();
};
const playSecondaryVideo = () => {
  secondaryVideo.play();
};
let isSecondaryVideoPlaying = false;
let mouseXSecondary = 0;
let mouseYSecondary = 0;
let prevMouseXSecondary = 0;
let prevMouseYSecondary = 0;
let mouseVelocitySecondary = 0;
window.addEventListener('mousemove', (event) => {
  mouseXSecondary = event.clientX;
  mouseYSecondary = event.clientY;
});
window.addEventListener('mouseout', () => {
  pauseSecondaryVideo();
  isSecondaryVideoPlaying = false;
});
const calculateMouseVelocitySecondary = () => {
  const deltaXSecondary = mouseXSecondary - prevMouseXSecondary;
  const deltaYSecondary = mouseYSecondary - prevMouseYSecondary;
  const distanceSecondary = Math.sqrt(deltaXSecondary * deltaXSecondary + deltaYSecondary * deltaYSecondary);
  const elapsedTimeSecondary = 0.016;
  mouseVelocitySecondary = distanceSecondary / elapsedTimeSecondary;
  prevMouseXSecondary = mouseXSecondary;
  prevMouseYSecondary = mouseYSecondary;
};
const updatePlaybackRateSecondary = () => {
  const maxVelocitySecondary = 100;
  const minPlaybackRateSecondary = 0.5;
  const maxPlaybackRateSecondary = 1;
  calculateMouseVelocitySecondary();
  const newPlaybackRateSecondary = minPlaybackRateSecondary + (mouseVelocitySecondary / maxVelocitySecondary) * (maxPlaybackRateSecondary - minPlaybackRateSecondary) * 0.05;
  gsap.to(secondaryVideo, { playbackRate: newPlaybackRateSecondary, duration: 0.5 });
};
const handleMouseMovementSecondary = () => {
  if (!isSecondaryVideoPlaying) {
    playSecondaryVideo();
    isSecondaryVideoPlaying = true;
  }
  clearTimeout(window.mouseMoveTimeoutSecondary);
  window.mouseMoveTimeoutSecondary = setTimeout(() => {
    pauseSecondaryVideo();
    isSecondaryVideoPlaying = false;
  }, 100);
};
window.addEventListener('mousemove', () => {
  updatePlaybackRateSecondary();
  handleMouseMovementSecondary();
});
const backgroundVideoSecondary = document.getElementById('bgVideo-foto');
const pauseBackgroundVideoSecondary = () => {
  backgroundVideoSecondary.pause();
};
const playBackgroundVideoSecondary = () => {
  backgroundVideoSecondary.play();
};
window.addEventListener('touchstart', () => {
  playBackgroundVideoSecondary();
});
window.addEventListener('touchend', () => {
  pauseBackgroundVideoSecondary();
});

const thirdVideo = document.getElementById('bgVideo-design');

const pauseThirdVideo = () => {
  thirdVideo.pause();
};

const playThirdVideo = () => {
  thirdVideo.play();
};

let isThirdVideoPlaying = false;
let mouseXThird = 0;
let mouseYThird = 0;
let prevMouseXThird = 0;
let prevMouseYThird = 0;
let mouseVelocityThird = 0;

window.addEventListener('mousemove', (event) => {
  mouseXThird = event.clientX;
  mouseYThird = event.clientY;
});

window.addEventListener('mouseout', () => {
  pauseThirdVideo();
  isThirdVideoPlaying = false;
});

const calculateMouseVelocityThird = () => {
  const deltaXThird = mouseXThird - prevMouseXThird;
  const deltaYThird = mouseYThird - prevMouseYThird;
  const distanceThird = Math.sqrt(deltaXThird * deltaXThird + deltaYThird * deltaYThird);
  const elapsedTimeThird = 0.016;
  mouseVelocityThird = distanceThird / elapsedTimeThird;
  prevMouseXThird = mouseXThird;
  prevMouseYThird = mouseYThird;
};

const updatePlaybackRateThird = () => {
  const maxVelocityThird = 100;
  const minPlaybackRateThird = 0.5;
  const maxPlaybackRateThird = 1;
  calculateMouseVelocityThird();
  const newPlaybackRateThird = minPlaybackRateThird + (mouseVelocityThird / maxVelocityThird) * (maxPlaybackRateThird - minPlaybackRateThird) * 0.05;
  gsap.to(thirdVideo, { playbackRate: newPlaybackRateThird, duration: 0.5 });
};

const handleMouseMovementThird = () => {
  if (!isThirdVideoPlaying) {
    playThirdVideo();
    isThirdVideoPlaying = true;
  }
  clearTimeout(window.mouseMoveTimeoutThird);
  window.mouseMoveTimeoutThird = setTimeout(() => {
    pauseThirdVideo();
    isThirdVideoPlaying = false;
  }, 100);
};

window.addEventListener('mousemove', () => {
  updatePlaybackRateThird();
  handleMouseMovementThird();
});

const backgroundVideoThird = document.getElementById('bgVideo-design');

const pauseBackgroundVideoThird = () => {
  backgroundVideoThird.pause();
};

const playBackgroundVideoThird = () => {
  backgroundVideoThird.play();
};

window.addEventListener('touchstart', () => {
  playBackgroundVideoThird();
});

window.addEventListener('touchend', () => {
  pauseBackgroundVideoThird();
});

let verticalPosition = 0;
let scrollingDownIs = true;
let animationProgression;
let isUserInteracting = false;
let initialInteractionX = 0;
let interactionPercent = 100;
let currentOrientation = 1;

function initializeAnimation() {
  const contentWidth = document.querySelector('.marquee-inner2').offsetWidth;

  animationProgression = gsap.to(".marquee-inner2", {
    x: -contentWidth / 2,
    repeat: -1,
    duration: 20,
    ease: "linear",
  }).totalProgress(0.5);
}

window.addEventListener('load', initializeAnimation);

function startInteraction(event) {
  if (event.target.classList.contains('marquee-part3')) {
    isUserInteracting = true;
    initialInteractionX = event.clientX || event.touches[0].clientX;
    gsap.set(animationProgression, { timeScale: 0 });
  }
}

function continueInteraction(event) {
  if (isUserInteracting) {
    const clientX = event.clientX || event.touches[0].clientX;
    const interactionDistance = clientX - initialInteractionX;
    let sensitivity = 2;
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      sensitivity = 8;
    }
    interactionPercent = interactionDistance / (window.innerWidth * sensitivity);
    animationProgression.progress(animationProgression.progress() - interactionPercent);
    initialInteractionX = clientX;
  }
}

function endInteraction() {
  if (isUserInteracting) {
    isUserInteracting = false;
    currentOrientation = interactionPercent > 0 ? -1 : 1;
    gsap.to(animationProgression, {
      timeScale: currentOrientation,
      duration: 0,
      onComplete: () => {
        animationProgression.progress(animationProgression.progress() - interactionPercent);
        interactionPercent = 0;
      }
    });
  }
}

window.addEventListener('mousedown', startInteraction);
window.addEventListener('mousemove', continueInteraction);
window.addEventListener('mouseup', endInteraction);

window.addEventListener('touchstart', startInteraction);
window.addEventListener('touchmove', continueInteraction);
window.addEventListener('touchend', endInteraction);

window.addEventListener("scroll", function () {
  if (window.pageYOffset > verticalPosition) {
    scrollingDownIs = true;
  } else {
    scrollingDownIs = false;
  }

  gsap.to(animationProgression, {
    timeScale: scrollingDownIs ? -1 : 1,
  });

  verticalPosition = window.pageYOffset;
});

let currentPosition = 0;
let isMovingForward = true;
let animationSequence;
let isDraggingNow = false;
let initialDragPos = 0;
let currentDragPercent = 100;
let currentMotionDirection = 1;

function initializeSequence() {
  const marqueeWidth = document.querySelector('.marquee-inner3').offsetWidth;

  animationSequence = gsap.to(".marquee-inner3", {
    x: -marqueeWidth / 2,
    repeat: -1,
    duration: 20,
    ease: "linear",
  }).totalProgress(0.5);
}

window.addEventListener('load', initializeSequence);

function beginDragging(event) {
  if (event.target.classList.contains('marquee-part4')) {
    isDraggingNow = true;
    initialDragPos = event.clientX || event.touches[0].clientX;
    gsap.set(animationSequence, { timeScale: 0 });
  }
}

function dragEvent(event) {
  if (isDraggingNow) {
    const clientX = event.clientX || event.touches[0].clientX;
    const dragDistance = clientX - initialDragPos;
    let sensitivity = 2;
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      sensitivity = 8;
    }
    currentDragPercent = dragDistance / (window.innerWidth * sensitivity);
    animationSequence.progress(animationSequence.progress() - currentDragPercent);
    initialDragPos = clientX;
  }
}

function endDraggingEvent() {
  if (isDraggingNow) {
    isDraggingNow = false;
    currentMotionDirection = currentDragPercent > 0 ? -1 : 1;
    gsap.to(animationSequence, {
      timeScale: currentMotionDirection,
      duration: 0,
      onComplete: () => {
        animationSequence.progress(animationSequence.progress() - currentDragPercent);
        currentDragPercent = 0;
      }
    });
  }
}

window.addEventListener('mousedown', beginDragging);
window.addEventListener('mousemove', dragEvent);
window.addEventListener('mouseup', endDraggingEvent);

window.addEventListener('touchstart', beginDragging);
window.addEventListener('touchmove', dragEvent);
window.addEventListener('touchend', endDraggingEvent);

window.addEventListener("scroll", function () {
  if (window.pageYOffset > currentPosition) {
    isMovingForward = true;
  } else {
    isMovingForward = false;
  }

  gsap.to(animationSequence, {
    timeScale: isMovingForward ? 1 : -1,
  });

  currentPosition = window.pageYOffset;
});

let yPosCustom = 0;
let isScrollingForwardCustom = true;
let tweenAnimationCustom;
let isDraggingCustom = false;
let initialDragXCustom = 0;
let dragPercentCustom = 100;
let currentDirectionCustom = 1;

function initiateTweenCustom() {
  const marqueeWidthCustom = document.querySelector('.marquee-inner4').offsetWidth;

  tweenAnimationCustom = gsap.to(".marquee-inner4", {
    x: -marqueeWidthCustom / 2,
    repeat: -1,
    duration: 20,
    ease: "linear",
  }).totalProgress(0.5);
}

window.addEventListener('load', initiateTweenCustom);

function beginDragCustom(event) {
  if (event.target.classList.contains('marquee-part5')) {
    isDraggingCustom = true;
    initialDragXCustom = event.clientX || event.touches[0].clientX;
    gsap.set(tweenAnimationCustom, { timeScale: 0 });
  }
}

function dragCustom(event) {
  if (isDraggingCustom) {
    const clientXCustom = event.clientX || event.touches[0].clientX;
    const dragDistanceCustom = clientXCustom - initialDragXCustom;
    let sensitivityCustom = 2;
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      sensitivityCustom = 8;
    }
    dragPercentCustom = dragDistanceCustom / (window.innerWidth * sensitivityCustom);
    tweenAnimationCustom.progress(tweenAnimationCustom.progress() - dragPercentCustom);
    initialDragXCustom = clientXCustom;
  }
}

function endDraggingCustom() {
  if (isDraggingCustom) {
    isDraggingCustom = false;
    currentDirectionCustom = dragPercentCustom > 0 ? -1 : 1;
    gsap.to(tweenAnimationCustom, {
      timeScale: currentDirectionCustom,
      duration: 0,
      onComplete: () => {
        tweenAnimationCustom.progress(tweenAnimationCustom.progress() - dragPercentCustom);
        dragPercentCustom = 0;
      }
    });
  }
}

window.addEventListener('mousedown', beginDragCustom);
window.addEventListener('mousemove', dragCustom);
window.addEventListener('mouseup', endDraggingCustom);

window.addEventListener('touchstart', beginDragCustom);
window.addEventListener('touchmove', dragCustom);
window.addEventListener('touchend', endDraggingCustom);

window.addEventListener("scroll", function () {
  if (window.pageYOffset > yPosCustom) {
    isScrollingForwardCustom = true;
  } else {
    isScrollingForwardCustom = false;
  }

  gsap.to(tweenAnimationCustom, {
    timeScale: isScrollingForwardCustom ? -1 : 1,
  });

  yPosCustom = window.pageYOffset;
});

const toggle = document.getElementById('toggle');
const container1 = document.getElementById('container1');
const container2 = document.getElementById('container2');
const container3 = document.getElementById('container3');
const container4 = document.getElementById('container4');

container2.style.opacity = 0;
container4.style.opacity = 0;

toggle.addEventListener('change', function () {
  if (this.checked) {
    gsap.to(container1, {
      opacity: 0, duration: 0.5, onComplete: () => {
        container1.classList.add('hidden');
        gsap.to(container2, { opacity: 1, duration: 0.5 });
        container2.classList.remove('hidden');
      }
    });
    gsap.to(container3, {
      opacity: 0, duration: 0.5, onComplete: () => {
        container3.classList.add('hidden');
        gsap.to(container4, { opacity: 1, duration: 0.5 });
        container4.classList.remove('hidden');
      }
    });
  } else {
    gsap.to(container2, {
      opacity: 0, duration: 0.5, onComplete: () => {
        container2.classList.add('hidden');
        gsap.to(container1, { opacity: 1, duration: 0.5 });
        container1.classList.remove('hidden');
      }
    });
    gsap.to(container4, {
      opacity: 0, duration: 0.5, onComplete: () => {
        container4.classList.add('hidden');
        gsap.to(container3, { opacity: 1, duration: 0.5 });
        container3.classList.remove('hidden');
      }
    });
  }
});

const newToggle = document.getElementById('new-toggle');
const newContainer1 = document.getElementById('new-container1');
const newContainer2 = document.getElementById('new-container2');
const newContainer3 = document.getElementById('new-container3');
const newContainer4 = document.getElementById('new-container4');

newContainer2.style.opacity = 0;
newContainer4.style.opacity = 0;

newToggle.addEventListener('change', function () {
  if (this.checked) {
    gsap.to(newContainer1, {
      opacity: 0, duration: 0.5, onComplete: () => {
        newContainer1.classList.add('hidden');
        gsap.to(newContainer2, { opacity: 1, duration: 0.5 });
        newContainer2.classList.remove('hidden');
      }
    });
    gsap.to(newContainer3, {
      opacity: 0, duration: 0.5, onComplete: () => {
        newContainer3.classList.add('hidden');
        gsap.to(newContainer4, { opacity: 1, duration: 0.5 });
        newContainer4.classList.remove('hidden');
      }
    });
  } else {
    gsap.to(newContainer2, {
      opacity: 0, duration: 0.5, onComplete: () => {
        newContainer2.classList.add('hidden');
        gsap.to(newContainer1, { opacity: 1, duration: 0.5 });
        newContainer1.classList.remove('hidden');
      }
    });
    gsap.to(newContainer4, {
      opacity: 0, duration: 0.5, onComplete: () => {
        newContainer4.classList.add('hidden');
        gsap.to(newContainer3, { opacity: 1, duration: 0.5 });
        newContainer3.classList.remove('hidden');
      }
    });
  }
});

newToggle.checked = true;
newToggle.dispatchEvent(new Event('change'));

function animateGrowingCircle() {
  gsap.fromTo('.growing-circle', {
    scale: 0.7, opacity: 1
  }, {
    duration: 1, scale: 1.7, opacity: 0,
    ease: "power1.inOut",
    onComplete: animateGrowingCircle
  });
}

animateGrowingCircle();

function redirectToLink(url) {
  window.location.href = url;
}

function animateGrowingCircleras() {
  gsap.fromTo('.growing-circle2', {
    scale: 0.7, opacity: 1
  }, {
    duration: 1, scale: 1.7, opacity: 0,
    ease: "power1.inOut",
    onComplete: animateGrowingCircleras
  });
}

animateGrowingCircleras();

function animateGrowingCirclerasas() {
  gsap.fromTo('.growing-circle4', {
    scale: 0.7, opacity: 1
  }, {
    duration: 1, scale: 1.7, opacity: 0,
    ease: "power1.inOut",
    onComplete: animateGrowingCirclerasas
  });
}

animateGrowingCirclerasas();

function animateGrowingCircleraspop() {
  gsap.fromTo('.growing-circle3', {
    scale: 0.7, opacity: 1
  }, {
    duration: 1, scale: 1.7, opacity: 0,
    ease: "power1.inOut",
    onComplete: animateGrowingCircleraspop
  });
}

animateGrowingCircleraspop();

const timeline = gsap.to(".star-absolute-free1", {
  rotation: 360,
  duration: 10,
  ease: "none",
  repeat: -1,
});

document.getElementById("new-container1").addEventListener("mouseenter", () => {
  gsap.to(timeline, { duration: 0.5, timeScale: 5 });
});

document.getElementById("new-container1").addEventListener("mouseleave", () => {
  gsap.to(timeline, { duration: 0.5, timeScale: 1 });
});

const timelineras = gsap.to(".star-absolute-free2", {
  rotation: 360,
  duration: 10,
  ease: "none",
  repeat: -1,
});

document.getElementById("new-container2").addEventListener("mouseenter", () => {
  gsap.to(timelineras, { duration: 0.5, timeScale: 5 });
});

document.getElementById("new-container2").addEventListener("mouseleave", () => {
  gsap.to(timelineras, { duration: 0.5, timeScale: 1 });
});

document.querySelectorAll('.faq li .question').forEach(question => {
  const toggle = question.querySelector('.plus-minus-toggle');
  const answer = question.nextElementSibling;

  answer.style.maxHeight = 0;
  answer.style.paddingBottom = 0;
  toggle.classList.add('collapsed');

  question.addEventListener('click', function () {
    const isCollapsed = toggle.classList.contains('collapsed');

    if (isCollapsed) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      answer.style.paddingBottom = '25px';
    } else {
      answer.style.maxHeight = 0;
      answer.style.paddingBottom = 0;
    }

    toggle.classList.toggle('collapsed');
    this.parentNode.classList.toggle('active');
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const loadMoreBtnContainer = document.querySelector(".Choose-text-content-faq-load-more");
  const showLessBtnContainer = document.querySelector(".Choose-text-content-faq-close-all");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const showLessBtn = document.getElementById("show-less-btn");
  const faqList = document.querySelector(".faq");
  const faqItems = faqList.querySelectorAll("li");
  const maxItemsToShow = 5;
  let visibleItemCount = maxItemsToShow;

  faqItems.forEach((item, index) => {
    if (index >= maxItemsToShow) {
      item.style.display = "none";
    }
  });

  function allItemsVisible() {
    return visibleItemCount >= faqItems.length;
  }

  function toggleButtons() {
    loadMoreBtnContainer.style.display = allItemsVisible() ? "none" : "block";
    showLessBtnContainer.style.display = allItemsVisible() ? "block" : "none";
  }

  loadMoreBtn.addEventListener("click", function () {
    let itemsToShow = maxItemsToShow;
    if (visibleItemCount + maxItemsToShow > faqItems.length) {
      itemsToShow = faqItems.length - visibleItemCount;
    }
    for (let i = visibleItemCount; i < visibleItemCount + itemsToShow; i++) {
      if (faqItems[i]) {
        faqItems[i].style.display = "block";
      }
    }
    visibleItemCount += itemsToShow;

    toggleButtons();
  });

  showLessBtn.addEventListener("click", function () {
    faqItems.forEach((item, index) => {
      if (index >= maxItemsToShow) {
        item.style.display = "none";
      }
    });
    visibleItemCount = maxItemsToShow;

    toggleButtons();
  });

  toggleButtons();
});

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector('.show-more-button');
  const hiddenText = document.querySelector('.hidden-text');

  button.addEventListener('click', function () {
    hiddenText.classList.toggle('show');
    if (hiddenText.classList.contains('show')) {
      hiddenText.style.display = 'block';
      button.textContent = 'Show Less';
    } else {
      hiddenText.style.display = 'none';
      button.textContent = 'Show More';
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector('.show-more-button2');
  const hiddenText = document.querySelector('.hidden-text2');

  button.addEventListener('click', function () {
    hiddenText.classList.toggle('show');
    if (hiddenText.classList.contains('show')) {
      hiddenText.style.display = 'block';
      button.textContent = 'Show Less';
    } else {
      hiddenText.style.display = 'none';
      button.textContent = 'Read More';
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector('.show-more-button3');
  const hiddenText = document.querySelector('.hidden-text3');

  button.addEventListener('click', function () {
    hiddenText.classList.toggle('show');
    if (hiddenText.classList.contains('show')) {
      hiddenText.style.display = 'block';
      button.textContent = 'Show Less';
    } else {
      hiddenText.style.display = 'none';
      button.textContent = 'Read More';
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector('.show-more-button4');
  const hiddenText = document.querySelector('.hidden-text4');

  button.addEventListener('click', function () {
    hiddenText.classList.toggle('show');
    if (hiddenText.classList.contains('show')) {
      hiddenText.style.display = 'block';
      button.textContent = 'Show Less';
    } else {
      hiddenText.style.display = 'none';
      button.textContent = 'Read More';
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector('.show-more-button5');
  const hiddenText = document.querySelector('.hidden-text5');

  button.addEventListener('click', function () {
    hiddenText.classList.toggle('show');
    if (hiddenText.classList.contains('show')) {
      hiddenText.style.display = 'block';
      button.textContent = 'Show Less';
    } else {
      hiddenText.style.display = 'none';
      button.textContent = 'Read More';
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector('.show-more-button6');
  const hiddenText = document.querySelector('.hidden-text6');

  button.addEventListener('click', function () {
    hiddenText.classList.toggle('show');
    if (hiddenText.classList.contains('show')) {
      hiddenText.style.display = 'block';
      button.textContent = 'Show Less';
    } else {
      hiddenText.style.display = 'none';
      button.textContent = 'Read More';
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const showMoreButton = document.getElementById("show-more-buttonas");
  const buttonTextElement = showMoreButton.querySelector("p");
  const hiddenTestimonials = document.querySelectorAll(".Choose-card-testimonial.hidden");
  let isOpen = false;

  function toggleTestimonials() {
    hiddenTestimonials.forEach(function (testimonial) {
      testimonial.classList.toggle("hidden");
    });
    isOpen = !isOpen;
    buttonTextElement.textContent = isOpen ? "Close All" : "More";
  }

  hiddenTestimonials.forEach(function (testimonial, index) {
    if (index >= 3) {
      testimonial.classList.add("hidden");
    }
  });

  showMoreButton.addEventListener("click", function () {
    toggleTestimonials();
  });
});

document.getElementById("subscriptionForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMTE4ZGJlYTk5OWMzNjkwYjY5MWYxODJiNmVhMjBmMDY5YjJlYTFhYThiNGViZjNmMDkxYmM3N2E0NmI3ZjEwYmRkNGU5MjgzNTE5MTY1OTMiLCJpYXQiOjE3MDg2ODg2MzcuNzUwMTQsIm5iZiI6MTcwODY4ODYzNy43NTAxNDQsImV4cCI6NDg2NDM2MjIzNy43NDUyOTUsInN1YiI6IjgzNzU4OCIsInNjb3BlcyI6W119.w-4-JmwM5gOZFBlQ3rbRPAt8YVb13MVH2xw0HvHfHVFNtJJEW5xhrTbQ14_JDsYWFNL-sOkHygbtfyOZVa1lO0EG25hwInANzN3d2q730CvfH3lRPZaoHl12HTRtTh1CprsKvuW5J_NMNxfY78R9TJv6MGkKZ6p2RD0oW-eyiu_feYUNUrC62P8P77kIRHLKn_JlqOVnpoB3cN4OSYL28cRZfls4geMj7d_2gOA8XOBIcGjZEqyGCMM145KOc30rAQsWymGD8vpifD8Jd-0UG6Y_J6NW0JcLr-o5ZrJfG8YqztS1Ls88A92ynSw2a-BgexwdXuNQw94_jCiq2MFQMHkptR0pW4G2kDk1b_fxqS5BarndnXOyj5_QtQ9X_f9oO5EF95Cb7sUgYN0n0GBszZL4-tDO1hIeYmjwz2Sba4aNMOtnwmatDW2Y4ynq_mOB2TsOe48Nbg91qyF4aCcx6T9riODAlMsV0E4kUUfPMM6LJyn-LLZ1WZ4x4mk24IsSZoFGg4fTkFkvE7yMem9q4IU4zdZ08n7ZYjTpf2vVvsT7a6uded-mb5dChiS6K2LriyjrsDbcQ74tQy1F7m8t0TdksZntVW_Vz0W_waUHH6SjBsDllmI5rL48wLC2O2lSd_pu22At3eLtSViMV80L3pLK61DPq39pRmuWL4oUBzM";

  fetch('https://connect.mailerlite.com/api/groups?filter[name]=Newsletter', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to retrieve group information');
      }
      return response.json();
    })
    .then(data => {
      const groupId = data.data[0].id;

      fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          email: email,
          fields: {
            name: name
          },
          groups: [groupId]
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Subscription failed');
          }
          console.log('Subscription successful');

          alert('Thank you! Your subscription was successful.');
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Subscription failed');
        });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to retrieve group information');
    });
});

const timelinerasas = gsap.to(".star-absolute-free3", {
  rotation: 360,
  duration: 10,
  ease: "none",
  repeat: -1,
});

document.getElementById("subsribe-hover-on").addEventListener("mouseenter", () => {
  gsap.to(timelinerasas, { duration: 0.5, timeScale: 5 });
});

document.getElementById("subsribe-hover-on").addEventListener("mouseleave", () => {
  gsap.to(timelinerasas, { duration: 0.5, timeScale: 1 });
});