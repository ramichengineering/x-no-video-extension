(function () {
  const TWEET_SELECTOR = 'article[data-testid="tweet"]';
  const VIDEO_SELECTORS = [
    'video',
    '[data-testid="videoPlayer"]',
    '[data-testid="videoComponent"]',
    '[data-testid="previewInterstitial"]' // sensitive-content video preview card
  ].join(',');

  let enabled = true;
  let scheduled = false;

  function isVideoTweet(article) {
    return !!article.querySelector(VIDEO_SELECTORS);
  }

  function applyVisibility(article) {
    const hasVideo = isVideoTweet(article);
    const cell = article.closest('div[data-testid="cellInnerDiv"]') || article;
    if (enabled && hasVideo) {
      cell.setAttribute('data-x-video-hidden', 'true');
      cell.style.setProperty('display', 'none', 'important');
    } else if (cell.getAttribute('data-x-video-hidden') === 'true') {
      cell.removeAttribute('data-x-video-hidden');
      cell.style.removeProperty('display');
    }
  }

  function processAll() {
    document.querySelectorAll(TWEET_SELECTOR).forEach(applyVisibility);
  }

  function scheduleProcess() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      processAll();
    });
  }

  function startObserving() {
    const observer = new MutationObserver(scheduleProcess);
    observer.observe(document.documentElement, { childList: true, subtree: true });
    scheduleProcess();
  }

  function init() {
    if (document.body) {
      startObserving();
    } else {
      document.addEventListener('DOMContentLoaded', startObserving, { once: true });
    }
  }

  browser.storage.local.get({ enabled: true }).then((res) => {
    enabled = res.enabled;
    init();
  });

  browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.enabled) {
      enabled = changes.enabled.newValue;
      scheduleProcess();
    }
  });
})();
