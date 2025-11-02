chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("isEnabled", (data) => {
    const isEnabled = data.isEnabled !== false;
    chrome.action.setIcon({ path: { "48": isEnabled ? "icon_active.png" : "icon_inactive.png" } });
  });
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.isEnabled) {
    chrome.action.setIcon({ path: { "48": changes.isEnabled.newValue ? "icon_active.png" : "icon_inactive.png" } });
  }
});