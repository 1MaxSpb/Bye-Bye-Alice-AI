document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('toggle');

  chrome.storage.sync.get(['isEnabled'], (result) => {
    toggleSwitch.checked = result.isEnabled !== false;
  });

  toggleSwitch.addEventListener('change', () => {
    const isEnabled = toggleSwitch.checked;
    chrome.storage.sync.set({ isEnabled: isEnabled });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab && currentTab.url && (currentTab.url.startsWith("https://yandex.ru/search") || currentTab.url.startsWith("https://yandex.com/search"))) {
        chrome.tabs.reload(currentTab.id);
      }
    });
  });
});