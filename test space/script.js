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

const subscribersOdometer = document.querySelector(".odometer");
createOdometer(subscribersOdometer, 10000);

const videosOdometer = document.querySelector(".second-odometer");
createOdometer(videosOdometer, 100);

const projectsOdometer = document.querySelector(".third-odometer");
createOdometer(projectsOdometer, 3);