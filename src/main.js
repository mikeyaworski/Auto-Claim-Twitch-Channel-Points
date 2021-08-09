function log(...args) {
  console.log('Auto Claim Twitch Channel Points:', ...args);
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
