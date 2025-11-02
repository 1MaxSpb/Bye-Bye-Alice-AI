document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('enabled-toggle');
  chrome.storage.sync.get('isEnabled', (data) => {
    toggle.checked = data.isEnabled !== false;
  });
  toggle.addEventListener('change', () => {
    const isEnabled = toggle.checked;
    chrome.storage.sync.set({ isEnabled: isEnabled }, () => {
      const iconPath = isEnabled ? 'icon_active.png' : 'icon_inactive.png';
      chrome.action.setIcon({ path: iconPath });
    });
  });
});