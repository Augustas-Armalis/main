const container = document.querySelector('.form-container-mobile');
const dragHandle = document.querySelector('.line-mobile');
const touchArea = document.querySelector('.touch-area');
const linkContainer = document.querySelector('.link-container-mobile'); // The clickable link container
const insideContent = document.querySelector('.inside-content'); // Inside content to fade out
const blackCurtains = document.querySelector('.form-container-mobile-black-curtains'); // Get the black curtains element

let isDragging = false;
let startY = 0;
let startHeight = 0;
let lastY = 0;
let lastTimestamp = 0;
let velocity = 0;

const velocityDecay = 0.8;
const bounceFactor = 0.8;

function startDrag(e) {
    e.preventDefault();
    isDragging = true;

    startY = e.touches ? e.touches[0].clientY : e.clientY;
    startHeight = container.offsetHeight;

    container.style.transition = 'none';
    lastY = startY;
    lastTimestamp = performance.now();
    document.body.style.cursor = 'grabbing';
}

function drag(e) {
    if (!isDragging) return;

    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const dy = startY - currentY;
    const newHeight = startHeight + dy;

    const minHeight = window.innerHeight * 0.5;
    const maxHeight = window.innerHeight;

    if (newHeight >= minHeight - 20 && newHeight <= maxHeight + 20) {
        container.style.height = `${newHeight}px`;

        const heightPercentage = (newHeight / window.innerHeight) * 100;

        // Set the black curtains opacity based on the height of the container
        let opacityValue = 0;

        if (heightPercentage <= 47) {
            opacityValue = 1; // Fully opaque when below or equal to 47%
        } else if (heightPercentage < 50) {
            opacityValue = (50 - heightPercentage) / 3; // Smooth transition to fully transparent
        }

        // Update black curtains opacity
        blackCurtains.style.opacity = `${opacityValue}`;  // Set opacity
        blackCurtains.style.display = opacityValue > 0 ? 'block' : 'none';

        const currentTimestamp = performance.now();
        const deltaTime = currentTimestamp - lastTimestamp;

        if (deltaTime > 0) {
            velocity = (lastY - currentY) / deltaTime;
        }

        lastY = currentY;
        lastTimestamp = currentTimestamp;

        // Adjust border radius based on height
        adjustBorderRadius(heightPercentage);
    }

    e.preventDefault();
}

function endDrag() {
    if (!isDragging) return;

    container.style.transition = 'height 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-radius 0.3s ease, border-width 0.3s ease';

    let targetHeight = container.offsetHeight + velocity * bounceFactor * 30;
    const minHeight = window.innerHeight * 0.5;
    const maxHeight = window.innerHeight;

    if (targetHeight > maxHeight) targetHeight = maxHeight;
    if (targetHeight < minHeight) targetHeight = minHeight;

    const snapZoneLower = maxHeight * 0.85;
    const snapZoneUpper = maxHeight;

    // Determine target height and border radius on snap
    if (targetHeight >= snapZoneLower && targetHeight <= snapZoneUpper) {
        targetHeight = maxHeight;
        container.style.borderTopLeftRadius = '0px';
        container.style.borderTopRightRadius = '0px';
    }

    const bounceZoneLower = minHeight;
    const bounceZoneUpper = minHeight * 0.94;

    if (targetHeight < bounceZoneUpper && targetHeight > bounceZoneLower) {
        const bounceInertia = setInterval(() => {
            if (targetHeight >= minHeight) {
                clearInterval(bounceInertia);
                return;
            }
            targetHeight += (bounceZoneUpper - targetHeight) * 0.2;
            container.style.height = `${targetHeight}px`;

            const heightPercentage = (targetHeight / window.innerHeight) * 100;
            adjustBorderRadius(heightPercentage);

            // Update black curtains opacity on bounce
            const opacityValue = Math.min(1, (50 - heightPercentage) / 10);
            blackCurtains.style.opacity = `${opacityValue}`;
            blackCurtains.style.display = opacityValue > 0 ? 'block' : 'none';
        }, 16);
    } else {
        container.style.height = `${targetHeight}px`;
        const heightPercentage = (targetHeight / window.innerHeight) * 100;
        adjustBorderRadius(heightPercentage);

        // Hide curtains if the height is above 50%
        if (heightPercentage >= 50) {
            blackCurtains.style.opacity = '0'; // Fade out
            setTimeout(() => blackCurtains.style.display = 'none', 300); // Hide after transition
        }
    }

    isDragging = false;
    document.body.style.cursor = 'default';
}

function adjustBorderRadius(heightPercentage) {
    let borderRadius;

    if (heightPercentage < 49 && heightPercentage >= 47) {
        borderRadius = 16 - (16 - 8) * ((49 - heightPercentage) / 2);
    } else if (heightPercentage >= 85 && heightPercentage < 100) {
        borderRadius = 16 * ((100 - heightPercentage) / 15);
    } else if (heightPercentage >= 100) {
        borderRadius = 0; // Set to 0 when fully expanded
    } else {
        borderRadius = 16; // Reset to full radius if not fully expanded
    }

    // Apply border radius with a smooth transition
    container.style.borderTopLeftRadius = `${borderRadius}px`;
    container.style.borderTopRightRadius = `${borderRadius}px`;
}

// New function to handle the click animation and redirect
function handleLinkClick() {
    // Expand to full height
    container.style.transition = 'height 0.5s ease, opacity 0.5s ease, border-width 0.5s ease, border-radius 0.5s ease';
    container.style.height = '100%';
    container.style.borderWidth = '0px'; // Animate border to 0

    // Fade out inside content and touch area
    gsap.to(insideContent, { opacity: 0, duration: 0.5 });
    gsap.to(touchArea, { opacity: 0, duration: 0.5 });

    // Fly off the link container to the left
    gsap.to(linkContainer, {
        x: '-2000%', // Move completely off the screen
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
            const url = linkContainer.getAttribute('data-url'); // Get the URL from data attribute
            window.location.href = url; // Redirect to the URL
        }
    });

    // Fade out the border radius to 0px
    gsap.to(container, {
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
        duration: 0.5,
        ease: "power2.inOut"
    });
}

// Resetting page state when coming back
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
        resetNewsletter(); // Call the function to reset your newsletter state
    }
});

function resetNewsletter() {
    // Resetting the main container's properties
    container.style.height = '50%'; // Example: Reset to initial height
    container.style.borderWidth = '4px'; // Example: Reset border width
    container.style.borderTopLeftRadius = '16px'; // Reset border radius
    container.style.borderTopRightRadius = '16px'; // Reset border radius

    // Resetting the link container's styles
    gsap.killTweensOf(linkContainer); // Stop any ongoing animations
    linkContainer.classList.remove('active'); // Remove active state class
    linkContainer.style.transform = 'scale(1)'; // Reset scale to original size
    linkContainer.style.opacity = '1'; // Ensure it is fully visible
    linkContainer.style.transition = 'none'; // Disable transition for immediate reset

    // Move link container back into view
    gsap.set(linkContainer, { x: '0%', duration: 0 }); // Reset position instantly

    // Fade in inside content and touch area
    gsap.to(insideContent, { opacity: 1, duration: 0.5 }); // Fade in inside content
    gsap.to(touchArea, { opacity: 1, duration: 0.5 }); // Fade in touch area

    // Reset link container position
    linkContainer.style.transform = 'translateX(0)'; // Reset the link container position

    // Reset arrow styles if applicable
    const arrows = document.querySelectorAll('.arrow-mobile');
    arrows.forEach(arrow => {
        arrow.style.filter = 'brightness(1)'; // Reset brightness
    });

    // Reset link text styles
    const links = document.querySelectorAll('.link-mobile');
    links.forEach(link => {
        link.style.color = 'white'; // Reset link color
    });
}

// Event listeners
dragHandle.addEventListener('mousedown', startDrag);
dragHandle.addEventListener('touchstart', startDrag, { passive: false });
document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag, { passive: false });
document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

touchArea.addEventListener('mousedown', startDrag);
touchArea.addEventListener('touchstart', startDrag, { passive: false });

// Link container click event
linkContainer.addEventListener('click', handleLinkClick);


// Existing touch area animations
touchArea.addEventListener('mousedown', () => {
    gsap.killTweensOf(dragHandle);
    gsap.to(dragHandle, {
        width: '90px',
        height: '3px',
        duration: 0.25,
        ease: "power2.out"
    });
    gsap.to(dragHandle, {
        backgroundColor: '#D0D1D5',
        duration: 0.15,
        ease: "cubic-bezier(0.25, 0.1, 0.25, 1)"
    });
});

touchArea.addEventListener('mouseup', () => {
    gsap.killTweensOf(dragHandle);
    gsap.to(dragHandle, {
        width: '100px',
        height: '5px',
        duration: 0.6,
        ease: "elastic.out(0.2, 0.1)"
    });
    gsap.to(dragHandle, {
        backgroundColor: '#3D3D42',
        duration: 0.3,
        ease: "cubic-bezier(0.25, 0.1, 0.25, 1)"
    });
});

touchArea.addEventListener('touchstart', () => {
    gsap.killTweensOf(dragHandle);
    gsap.to(dragHandle, {
        width: '90px',
        height: '3px',
        duration: 0.25,
        ease: "power2.inOut"
    });
    gsap.to(dragHandle, {
        backgroundColor: '#D0D1D5',
        duration: 0.15,
        ease: "cubic-bezier(0.25, 0.1, 0.25, 1)"
    });
});

touchArea.addEventListener('touchend', () => {
    gsap.killTweensOf(dragHandle);
    gsap.to(dragHandle, {
        width: '100px',
        height: '5px',
        duration: 0.6,
        ease: "elastic.out(0.5, 0.2)"
    });
    gsap.to(dragHandle, {
        backgroundColor: '#3D3D42',
        duration: 0.3,
        ease: "cubic-bezier(0.25, 0.1, 0.25, 1)"
    });
});

touchArea.addEventListener('mouseenter', () => {
    gsap.killTweensOf(dragHandle);
    gsap.to(dragHandle, {
        width: '110px',
        height: '7px',
        duration: 0.25,
        ease: "power2.out"
    });
    gsap.to(dragHandle, {
        backgroundColor: '#ffffff',
        duration: 0.2,
        ease: "cubic-bezier(0.25, 0.1, 0.25, 1)"
    });
});

touchArea.addEventListener('mouseleave', () => {
    gsap.killTweensOf(dragHandle);
    gsap.to(dragHandle, {
        width: '100px',
        height: '5px',
        duration: 0.3,
        ease: "power2.out"
    });
    gsap.to(dragHandle, {
        backgroundColor: '#3D3D42',
        duration: 0.25,
        ease: "cubic-bezier(0.25, 0.1, 0.25, 1)"
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const linkContainer = document.querySelector(".link-container-mobile");

    linkContainer.addEventListener("mouse", function () {
        // Toggle the active class on click
        this.classList.toggle("active");

        // Optionally redirect to the URL if needed
        // window.location.href = this.getAttribute('data-url');
    });
});










// GSAP Blob Movement
gsap.registerPlugin(MotionPathPlugin);

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function moveBlob(blob, widthRange, heightRange) {
    const randomPath = [
        { x: random(-20, widthRange), y: random(-10, heightRange) },
        { x: random(-20, widthRange), y: random(-10, heightRange) },
        { x: random(-20, widthRange), y: random(-10, heightRange) },
        { x: random(-20, widthRange), y: random(-10, heightRange) }
    ];

    gsap.to(blob, {
        motionPath: {
            path: randomPath,
            curviness: 1.5,
            autoRotate: false
        },
        duration: random(12, 20),
        ease: 'power6.in',
        onComplete: () => moveBlob(blob, widthRange, heightRange),
        repeat: 0
    });
}

function initializeBlobs(rectangle) {
    const blobs = rectangle.querySelectorAll('.blob');
    const { width, height } = rectangle.getBoundingClientRect();

    blobs.forEach(blob => {
        const size = random(20, 45);
        blob.style.width = `${size}px`;
        blob.style.height = `${size}px`;

        gsap.set(blob, {
            x: random(-20, width - size),
            y: random(-10, height - size)
        });

        moveBlob(blob, width - size, height - size);
    });
}

function init() {
    document.querySelectorAll('.rectangle').forEach(initializeBlobs);
}

// Initialize Blobs on page load
init();