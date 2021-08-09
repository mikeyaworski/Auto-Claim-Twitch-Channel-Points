let intervalId;

function teardownInterval() {
  log('Clearing interval', intervalId);
  if (intervalId) {
    clearInterval(intervalId);
  }
}

function createInterval() {
  intervalId = setInterval(() => {
    const element = document.querySelector('.community-points-summary > *:nth-child(2) button');
    if (element) {
      log('Claiming bonus', bonusBtn);
      element.click();
    }
  }, 1000);
  log('Created interval', intervalId);
}

