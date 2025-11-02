const SELECTORS_TO_REMOVE = [
  '.FuturisSearchWrapper',
  'a[href*="promo=force_neuro"]',
  'li.serp-item.serp-item__futuris-snippet'
];
let isEnabled = true;

function removeTargetElements() {
  if (!isEnabled) return;
  try {
    SELECTORS_TO_REMOVE.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        elements.forEach(el => el.remove());
      }
    });
  } catch (error) {}
}

function blockPromoNavigation(event) {
  if (!isEnabled) return;
  const targetLink = event.target.closest('a');
  if (targetLink && targetLink.href.includes('promo=force_neuro')) {
    event.preventDefault();
    event.stopPropagation();
  }
}

const observer = new MutationObserver(() => {
  if (isEnabled) {
    removeTargetElements();
  }
});

function initializeObserver() {
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    removeTargetElements();
  } else {
    setTimeout(initializeObserver, 100);
  }
}

chrome.storage.sync.get('isEnabled', (data) => {
  isEnabled = data.isEnabled !== false;
  if (isEnabled) {
    initializeObserver();
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.isEnabled) {
    isEnabled = changes.isEnabled.newValue;
    if (isEnabled) {
      initializeObserver();
    } else {
      observer.disconnect();
    }
  }
});

document.addEventListener('click', blockPromoNavigation, true);