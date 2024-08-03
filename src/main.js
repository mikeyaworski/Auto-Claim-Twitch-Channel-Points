function log(...args) {
  console.log('Auto Claim Twitch Channel Points:', ...args);
}

function getClaimBonusButton(parentElement = document) {
  return parentElement.querySelector('.community-points-summary > *:nth-child(2) button')
    // This selector only works for English
    || parentElement.querySelector('.community-points-summary button[aria-label="Claim Bonus"]');
}

function restart(method) {
  if (method === 'interval') {
    teardownObservers();
    createInterval();
  } else if (method === 'mutation-observer') {
    teardownInterval();
    createObservers();
  }
}

chrome.storage.local.get(['method'], res => {
  const method = res.method || 'interval';
  restart(method);
});

chrome.storage.onChanged.addListener(res => {
  if (res.method) restart(res.method.newValue);
});
