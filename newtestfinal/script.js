const container = document.querySelector('.form-container-mobile');
const dragHandle = document.querySelector('.line-mobile');
const touchArea = document.querySelector('.touch-area');

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

        const currentTimestamp = performance.now();
        const deltaTime = currentTimestamp - lastTimestamp;

        if (deltaTime > 0) {
            velocity = (lastY - currentY) / deltaTime;
        }

        lastY = currentY;
        lastTimestamp = currentTimestamp;

        const heightPercentage = (newHeight / window.innerHeight) * 100;

        if (heightPercentage < 49 && heightPercentage >= 47) {
            const radius = 16 - (16 - 8) * ((49 - heightPercentage) / 2);
            container.style.borderTopLeftRadius = `${radius}px`;
            container.style.borderTopRightRadius = `${radius}px`;
        } else if (heightPercentage >= 85 && heightPercentage < 100) {
            const radius = 16 * ((100 - heightPercentage) / 15);
            container.style.borderTopLeftRadius = `${radius}px`;
            container.style.borderTopRightRadius = `${radius}px`;
        } else if (heightPercentage >= 100) {
            container.style.borderTopLeftRadius = '0px';
            container.style.borderTopRightRadius = '0px';
        } else {
            container.style.borderTopLeftRadius = '16px';
            container.style.borderTopRightRadius = '16px';
        }
    }

    e.preventDefault();
}

function endDrag() {
    if (!isDragging) return;

    container.style.transition = 'height 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-radius 0.3s ease';

    let targetHeight = container.offsetHeight + velocity * bounceFactor * 30;
    const minHeight = window.innerHeight * 0.5;
    const maxHeight = window.innerHeight;

    if (targetHeight > maxHeight) targetHeight = maxHeight;
    if (targetHeight < minHeight) targetHeight = minHeight;

    const snapZoneLower = maxHeight * 0.85;
    const snapZoneUpper = maxHeight;

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

            const radius = 8 + (16 - 8) * ((49 - (targetHeight / window.innerHeight) * 100) / 2);
            container.style.borderTopLeftRadius = `${radius}px`;
            container.style.borderTopRightRadius = `${radius}px`;
        }, 16);
    } else {
        container.style.height = `${targetHeight}px`;

        const heightPercentage = (targetHeight / window.innerHeight) * 100;

        if (heightPercentage < 49 && heightPercentage >= 47) {
            const radius = 16 - (16 - 8) * ((49 - heightPercentage) / 2);
            container.style.borderTopLeftRadius = `${radius}px`;
            container.style.borderTopRightRadius = `${radius}px`;
        } else if (heightPercentage >= 85 && heightPercentage < 100) {
            const radius = 16 * ((100 - heightPercentage) / 15);
            container.style.borderTopLeftRadius = `${radius}px`;
            container.style.borderTopRightRadius = `${radius}px`;
        } else if (heightPercentage >= 100) {
            container.style.borderTopLeftRadius = '0px';
            container.style.borderTopRightRadius = '0px';
        } else {
            container.style.borderTopLeftRadius = '16px';
            container.style.borderTopRightRadius = '16px';
        }
    }

    isDragging = false;
    document.body.style.cursor = 'default';
}

dragHandle.addEventListener('mousedown', startDrag);
dragHandle.addEventListener('touchstart', startDrag, { passive: false });
document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag, { passive: false });
document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

touchArea.addEventListener('mousedown', startDrag);
touchArea.addEventListener('touchstart', startDrag, { passive: false });

touchArea.addEventListener('mousedown', () => {
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