const container = document.querySelector('.form-container-mobile');
const dragHandle = document.querySelector('.line-mobile');
const touchArea = document.querySelector('.touch-area');
const textMobile = document.querySelector('.text-mobile-container');
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

document.addEventListener("DOMContentLoaded", () => {
    // Set the initial height based on fit-content
    const initialHeight = container.scrollHeight; // Get the height that fits the content
    container.style.height = `${initialHeight}px`; // Set this as the starting height

    // If you want to ensure black curtains are visible at the start
    blackCurtains.style.opacity = '1'; // Make black curtains fully opaque at the beginning
});

// New function to handle the click animation and redirect
function handleLinkClick() {
    // Set the transition for smooth height change
    container.style.transition = 'height 0.5s ease, opacity 0.5s ease, border-width 0.5s ease, border-radius 0.5s ease';

    // Get the current height based on fit-content
    const currentHeight = container.scrollHeight; // Get the height that fits the content
    container.style.height = `${currentHeight}px`; // Set height to current

    // Use requestAnimationFrame to ensure the transition to full height happens on the next frame
    requestAnimationFrame(() => {
        container.style.height = '100%'; // Then transition to full height
    });

    // Animate the border width
    container.style.borderWidth = '0px'; // Animate border to 0

    // Fade out inside content and touch area
    gsap.to(insideContent, { opacity: 0, duration: 0.5 });
    gsap.to(touchArea, { opacity: 0, duration: 0.5 });
    gsap.to(textMobile, { opacity: 0, duration: 0.5 });

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

// Event listener for link container click
linkContainer.addEventListener('click', handleLinkClick);

document.addEventListener("DOMContentLoaded", () => {
    // Get the initial height based on fit-content
    initialHeight = container.scrollHeight; // Store the initial height
    container.style.height = `${initialHeight}px`; // Set this as the starting height

    // If you want to ensure black curtains are visible at the start
    blackCurtains.style.opacity = '1'; // Make black curtains fully opaque at the beginning
});

document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
        resetNewsletter(); // Call the function to reset your newsletter state
    }
});

function resetNewsletter() {
    // Set a transition for smooth height change
    container.style.transition = 'height 0.5s ease'; // Set transition

    // Transition from 100% to initial height
    container.style.height = `${initialHeight}px`; // Animate back to the initial height

    // Resetting the main container's other properties
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






















// eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMTE4ZGJlYTk5OWMzNjkwYjY5MWYxODJiNmVhMjBmMDY5YjJlYTFhYThiNGViZjNmMDkxYmM3N2E0NmI3ZjEwYmRkNGU5MjgzNTE5MTY1OTMiLCJpYXQiOjE3MDg2ODg2MzcuNzUwMTQsIm5iZiI6MTcwODY4ODYzNy43NTAxNDQsImV4cCI6NDg2NDM2MjIzNy43NDUyOTUsInN1YiI6IjgzNzU4OCIsInNjb3BlcyI6W119.w-4-JmwM5gOZFBlQ3rbRPAt8YVb13MVH2xw0HvHfHVFNtJJEW5xhrTbQ14_JDsYWFNL-sOkHygbtfyOZVa1lO0EG25hwInANzN3d2q730CvfH3lRPZaoHl12HTRtTh1CprsKvuW5J_NMNxfY78R9TJv6MGkKZ6p2RD0oW-eyiu_feYUNUrC62P8P77kIRHLKn_JlqOVnpoB3cN4OSYL28cRZfls4geMj7d_2gOA8XOBIcGjZEqyGCMM145KOc30rAQsWymGD8vpifD8Jd-0UG6Y_J6NW0JcLr-o5ZrJfG8YqztS1Ls88A92ynSw2a-BgexwdXuNQw94_jCiq2MFQMHkptR0pW4G2kDk1b_fxqS5BarndnXOyj5_QtQ9X_f9oO5EF95Cb7sUgYN0n0GBszZL4-tDO1hIeYmjwz2Sba4aNMOtnwmatDW2Y4ynq_mOB2TsOe48Nbg91qyF4aCcx6T9riODAlMsV0E4kUUfPMM6LJyn-LLZ1WZ4x4mk24IsSZoFGg4fTkFkvE7yMem9q4IU4zdZ08n7ZYjTpf2vVvsT7a6uded-mb5dChiS6K2LriyjrsDbcQ74tQy1F7m8t0TdksZntVW_Vz0W_waUHH6SjBsDllmI5rL48wLC2O2lSd_pu22At3eLtSViMV80L3pLK61DPq39pRmuWL4oUBzM








document.getElementById("subscriptionForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMTE4ZGJlYTk5OWMzNjkwYjY5MWYxODJiNmVhMjBmMDY5YjJlYTFhYThiNGViZjNmMDkxYmM3N2E0NmI3ZjEwYmRkNGU5MjgzNTE5MTY1OTMiLCJpYXQiOjE3MDg2ODg2MzcuNzUwMTQsIm5iZiI6MTcwODY4ODYzNy43NTAxNDQsImV4cCI6NDg2NDM2MjIzNy43NDUyOTUsInN1YiI6IjgzNzU4OCIsInNjb3BlcyI6W119.w-4-JmwM5gOZFBlQ3rbRPAt8YVb13MVH2xw0HvHfHVFNtJJEW5xhrTbQ14_JDsYWFNL-sOkHygbtfyOZVa1lO0EG25hwInANzN3d2q730CvfH3lRPZaoHl12HTRtTh1CprsKvuW5J_NMNxfY78R9TJv6MGkKZ6p2RD0oW-eyiu_feYUNUrC62P8P77kIRHLKn_JlqOVnpoB3cN4OSYL28cRZfls4geMj7d_2gOA8XOBIcGjZEqyGCMM145KOc30rAQsWymGD8vpifD8Jd-0UG6Y_J6NW0JcLr-o5ZrJfG8YqztS1Ls88A92ynSw2a-BgexwdXuNQw94_jCiq2MFQMHkptR0pW4G2kDk1b_fxqS5BarndnXOyj5_QtQ9X_f9oO5EF95Cb7sUgYN0n0GBszZL4-tDO1hIeYmjwz2Sba4aNMOtnwmatDW2Y4ynq_mOB2TsOe48Nbg91qyF4aCcx6T9riODAlMsV0E4kUUfPMM6LJyn-LLZ1WZ4x4mk24IsSZoFGg4fTkFkvE7yMem9q4IU4zdZ08n7ZYjTpf2vVvsT7a6uded-mb5dChiS6K2LriyjrsDbcQ74tQy1F7m8t0TdksZntVW_Vz0W_waUHH6SjBsDllmI5rL48wLC2O2lSd_pu22At3eLtSViMV80L3pLK61DPq39pRmuWL4oUBzM"; // Replace with your actual API key

    // Prepare to hide the existing containers with a fade-out effect
    const textMobileContainer = document.querySelector('.text-mobile-container');
    const insideContent = document.querySelector('.inside-content');
    const afterSubscriptionContainer = document.querySelector('.container-after-subscribtion');

    // Fade out effect for the original containers
    textMobileContainer.classList.add('fade-out');
    insideContent.classList.add('fade-out');

    // Wait 0.3 seconds before performing the hiding action
    setTimeout(() => {
        // Hide the original containers
        textMobileContainer.style.display = 'none';
        insideContent.style.display = 'none';

        // Make the after subscription container visible
        afterSubscriptionContainer.style.display = 'block';

        // Reset fade-out class for this container
        afterSubscriptionContainer.classList.remove('fade-out');

        // Set opacity to 0 before applying fade-in effect
        afterSubscriptionContainer.style.opacity = 0;

        // Trigger a reflow/repaint to ensure the opacity change is recognized
        void afterSubscriptionContainer.offsetWidth;

        // Apply fade-in class to start the fade-in animation
        afterSubscriptionContainer.classList.add('fade-in');

        // After a short delay, set opacity to 1 to make it visible
        setTimeout(() => {
            afterSubscriptionContainer.style.opacity = 1;
        }, 20); // Small delay for the fade-in effect
    }, 300); // 300 milliseconds delay

    // Fetch the group information from MailerLite
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

            // Subscribe the user
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
                    document.getElementById('afterSubText').textContent = 'Thank you! Your subscription was successful.';
                    document.getElementById('afterSubButtonContainer').innerHTML = `
                        
                        <div class="link-container-mobile-sub" id="gmailButton">
        <a class="link-mobile-sub">Go to Gmail</a>
        <img class="arrow-mobile-sub" src="images/Arrow-mobile-flipped.svg">
      </div>
                    `;
                    addGmailButtonEvent(); // Add event for Gmail button
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('afterSubText').textContent = 'Subscription failed.';
                    document.getElementById('afterSubButtonContainer').innerHTML = `
                        
                                                <div class="link-container-mobile-sub" id="resetButton">
        <a class="link-mobile-sub">Try again</a>
        <img class="arrow-mobile-sub" src="images/Arrow-mobile-again.svg">
      </div>
                    `;
                    addResetButtonEvent();
                });
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('afterSubText').textContent = 'Failed to retrieve group information.';
            document.getElementById('afterSubButtonContainer').innerHTML = `
                <div class="link-container-mobile-sub" id="resetButton">
        <a class="link-mobile-sub">Try again</a>
        <img class="arrow-mobile-sub" src="images/Arrow-mobile-again.svg">
      </div>
            `;
            addResetButtonEvent();
        });
});

// Change from button to div click event
document.getElementById("submitDiv").addEventListener("click", function () {
    document.getElementById("subscriptionForm").dispatchEvent(new Event('submit'));
});

// Function to add event listener for the reset button
function addResetButtonEvent() {
    document.getElementById("resetButton").addEventListener("click", function () {
        // Hide the after subscription container with a fade-out effect
        const afterSubscriptionContainer = document.querySelector('.container-after-subscribtion');
        afterSubscriptionContainer.classList.add('fade-out');

        // Wait for the fade-out transition to complete
        setTimeout(() => {
            // Hide the after subscription container
            afterSubscriptionContainer.style.display = 'none';

            // Show the original containers again with fade-in effect
            const textMobileContainer = document.querySelector('.text-mobile-container');
            const insideContent = document.querySelector('.inside-content');

            textMobileContainer.style.display = 'block';
            insideContent.style.display = 'block';

            // Reset fade-out class for these containers
            textMobileContainer.classList.remove('fade-out');
            insideContent.classList.remove('fade-out');

            // Clear the input fields
            document.getElementById("name").value = '';
            document.getElementById("email").value = '';
        }, 500); // Wait for 0.5 seconds for the fade-out to finish before hiding
    });
}

// Function to add event listener for the Gmail button
function addGmailButtonEvent() {
    document.getElementById("gmailButton").addEventListener("click", function () {
        window.open("https://mail.google.com", "_blank"); // Opens Gmail in a new tab
    });
}
