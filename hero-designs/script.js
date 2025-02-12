// Function to duplicate the testimonial boxes
function duplicateTestimonials() {
    // Select the container and the wrapper
    const container = document.querySelector(".infinite-scroller-container");
    const wrapper = document.querySelector(".scroller-wrapper");

    // Clone all the testimonial boxes inside the wrapper
    const testimonials = wrapper.querySelectorAll(".testimonial-box");
    testimonials.forEach((testimonial) => {
      const clone = testimonial.cloneNode(true); // Deep clone the element
      wrapper.appendChild(clone); // Append the clone to the wrapper
    });
  }

  // Call the function to duplicate testimonials
  duplicateTestimonials();