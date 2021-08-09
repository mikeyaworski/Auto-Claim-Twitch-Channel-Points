// setInterval(() => {
//   const element = document.querySelector('.community-points-summary > *:nth-child(2) button');
//   if (element) element.click();
// }, 1000);

function log(...args) {
  console.log('Auto Claim Twitch Channel Points:', ...args);
}

let lastPointsSummarySection;
let lastClick = 0;

// This list gets updated live and is a performant way to create new mutation observers
const summaryClasses = document.getElementsByClassName('community-points-summary');

function clickBonusButton() {
  if (!summaryClasses[0]) return;
  const bonusBtn = summaryClasses[0].querySelector('button[aria-label="Claim Bonus"]');
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
  new MutationObserver(() => {
    clickBonusButton();
  }).observe(summaryClasses[0], { childList: true, subtree: true });
}

if (summaryClasses[0]) observeBonus();

log('Created document mutation observer');
new MutationObserver(() => {
  if (summaryClasses[0] && summaryClasses[0] !== lastPointsSummarySection) {
    observeBonus();
  }
}).observe(document.body, { subtree: true, childList: true });
