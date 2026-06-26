let observers = [];

let lastPointsSummarySection;
let lastClick = 0;

// This list gets updated live and is a performant way to create new mutation observers
const summaryClasses = document.getElementsByClassName('community-points-summary');

function clickBonusButton() {
  if (!summaryClasses[0]) return;
  const bonusBtn = getClaimBonusButton(summaryClasses[0]);
  // Add a 2 second delay between clicks
  if (bonusBtn && Date.now() - lastClick > 2000) {
    lastClick = Date.now();
    log('Claiming bonus', bonusBtn);
    bonusBtn.click();
  }
}

function observeBonus() {
  log('Creating mutation obvserver on points summary section', summaryClasses[0]);
  lastPointsSummarySection = summaryClasses[0];
  clickBonusButton();
  const observer = new MutationObserver(() => {
    clickBonusButton();
  });
  observer.observe(summaryClasses[0], { childList: true, subtree: true });
  observers.push(observer);
}


function createObservers() {
  if (summaryClasses[0]) observeBonus();

  log('Creating document mutation observer');
  const documentObserver = new MutationObserver(() => {
    if (summaryClasses[0] && summaryClasses[0] !== lastPointsSummarySection) {
      observeBonus();
    }
  });
  documentObserver.observe(document.body, { subtree: true, childList: true });
  observers.push(documentObserver);
}

function teardownObservers() {
  log('Clearing mutation observers', observers.length);
  observers.forEach(observer => {
    if (observer) observer.disconnect();
  });
  observers = [];
}
