function updateIcon(isEnabled) {
  const iconPath = isEnabled ? "icon_active.png" : "icon_inactive.png";
  chrome.action.setIcon({ path: { "48": iconPath } });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("isEnabled", (data) => {
    updateIcon(data.isEnabled !== false);
  });
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.isEnabled) {
    updateIcon(changes.isEnabled.newValue);
  }
});