function removeAliceElements() {
  const selectorsToRemove = [
    '.FuturisSearchWrapper',
    'li.serp-item__futuris-snippet'
  ];

  selectorsToRemove.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) {
      element.remove();
    }
  });

  const navTabs = document.querySelectorAll('a.HeaderNav-Tab');
  navTabs.forEach(tab => {
    if (tab.textContent.includes('Алиса') || tab.textContent.includes('Alice')) {
      tab.remove();
    }
  });
}

function startObserver() {
  const observer = new MutationObserver(removeAliceElements);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  removeAliceElements();
}

chrome.storage.sync.get(['isEnabled'], (result) => {
  if (result.isEnabled !== false) {
    startObserver();
  }
});