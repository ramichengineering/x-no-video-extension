const toggle = document.getElementById('toggle');

browser.storage.local.get({ enabled: true }).then((res) => {
  toggle.checked = res.enabled;
});

toggle.addEventListener('change', () => {
  browser.storage.local.set({ enabled: toggle.checked });
});
