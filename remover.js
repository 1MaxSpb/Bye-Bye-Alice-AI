function removeAliceElements() {
  const futurisWrapper = document.querySelector('.FuturisSearchWrapper');
  if (futurisWrapper) {
    futurisWrapper.remove();
  }

  const futurisSnippet = document.querySelector('.serp-item__futuris-snippet');
  if (futurisSnippet) {
    futurisSnippet.remove();
  }

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