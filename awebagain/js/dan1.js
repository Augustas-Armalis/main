// Counter up

const firstCard = 10000;
const secondCard = 100;
const thirdCard = 2;

const createOdometer = (el, value) => {
  const odometer = new Odometer({
    el: el,
    value: 0,
  });

  let hasRun = false;

  const options = {
    threshold: [0, 0.9],
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!hasRun) {
          odometer.update(value);
          hasRun = true;
        }
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(el);
};

const subscribersOdometer = document.querySelector(".first-odometer");
createOdometer(subscribersOdometer, firstCard);

const videosOdometer = document.querySelector(".second-odometer");
createOdometer(videosOdometer, secondCard);

const projectsOdometer = document.querySelector(".third-odometer");
createOdometer(projectsOdometer, thirdCard);

gsap.registerPlugin(ScrollTrigger);

const counterCards = document.querySelectorAll('.counter-card');

const animateCards = (card, index) => {
  gsap.fromTo(card,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      delay: isDesktop ? 0.1 * index : 0,
      scrollTrigger: {
        trigger: card,
        start: "top 100%",
        once: true
      }
    });
};

const isDesktop = window.innerWidth > 768;

counterCards.forEach((card, index) => {
  animateCards(card, index);
});
