let documentObserver;
let summaryObserver;
let lastSummaryContainer;

// Add a 2 second delay between clicks
let lastClick = 0;
const CLICK_DELAY_MS = 2000;

// This list gets updated live and is a performant way to create new mutation observers
const summaryClasses = document.getElementsByClassName('community-points-summary');

function clickBonusButton() {
  if (!summaryClasses[0]) return;
  const bonusBtn = getClaimBonusButton(summaryClasses[0]);
  if (bonusBtn && Date.now() - lastClick > CLICK_DELAY_MS) {
    lastClick = Date.now();
    log('Claiming bonus', bonusBtn);
    bonusBtn.click();
  }
}

function observeBonus() {
  const summaryContainer = summaryClasses[0];
  if (!summaryContainer) return;
  log('Creating mutation observer on points summary section', summaryContainer);
  lastSummaryContainer = summaryContainer;
  clickBonusButton();
  if (summaryObserver) summaryObserver.disconnect();
  summaryObserver = new MutationObserver(() => {
    clickBonusButton();
  });
  summaryObserver.observe(summaryContainer, { childList: true, subtree: true });
}

function createObservers() {
  if (summaryClasses[0]) observeBonus();

  log('Creating document mutation observer');
  if (documentObserver) documentObserver.disconnect();
  documentObserver = new MutationObserver(() => {
    const summaryContainer = summaryClasses[0];
    if (summaryContainer && summaryContainer !== lastSummaryContainer) {
      observeBonus();
    }
  });
  documentObserver.observe(document.body, { subtree: true, childList: true });
}

function teardownObservers() {
  log('Clearing mutation observers');
  if (documentObserver) {
    documentObserver.disconnect();
    documentObserver = null;
  }
  if (summaryObserver) {
    summaryObserver.disconnect();
    summaryObserver = null;
  }
}
