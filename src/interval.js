let intervalId;

function teardownInterval() {
  log('Clearing interval', intervalId);
  if (intervalId) {
    clearInterval(intervalId);
  }
}

function createInterval() {
  intervalId = setInterval(() => {
    const bonusBtn = getClaimBonusButton();
    if (bonusBtn) {
      log('Claiming bonus', bonusBtn);
      bonusBtn.click();
    }
  }, 1000);
  log('Created interval', intervalId);
}

