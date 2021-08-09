chrome.storage.local.get(['method'], ({ method }) => {
  document.getElementById('method').value = method || 'interval';
});

document.getElementById('method').addEventListener('change', e => {
  chrome.storage.local.set({ method: e.target.value });
});
