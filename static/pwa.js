(function () {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/service-worker.js");
    });
  }

  let installPrompt = null;
  const buttons = document.querySelectorAll("[data-install-app]");
  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    installPrompt = event;
    buttons.forEach(function (button) { button.hidden = false; });
  });
  buttons.forEach(function (button) {
    button.addEventListener("click", async function () {
      if (!installPrompt) return;
      installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt = null;
      buttons.forEach(function (item) { item.hidden = true; });
    });
  });
  window.addEventListener("appinstalled", function () {
    buttons.forEach(function (button) { button.hidden = true; });
  });
}());
