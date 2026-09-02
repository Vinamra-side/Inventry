(function () {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      let refreshing = false;
      navigator.serviceWorker.register("/service-worker.js").then(function (registration) {
        function showUpdate(worker) {
          if (!worker || document.querySelector("[data-update-toast]")) return;
          const toast = document.createElement("div");
          toast.className = "update-toast";
          toast.dataset.updateToast = "";
          toast.innerHTML = '<div><strong>Saiko update available</strong><span>Reload to use the latest version.</span></div><button type="button">Update now</button>';
          toast.querySelector("button").addEventListener("click", function () { worker.postMessage({type: "SKIP_WAITING"}); });
          document.body.appendChild(toast);
        }
        if (registration.waiting) showUpdate(registration.waiting);
        registration.addEventListener("updatefound", function () {
          const worker = registration.installing;
          worker.addEventListener("statechange", function () {
            if (worker.state === "installed" && navigator.serviceWorker.controller) showUpdate(worker);
          });
        });
        setInterval(function () { registration.update(); }, 15 * 60 * 1000);
      });
      navigator.serviceWorker.addEventListener("controllerchange", function () {
        if (!refreshing) { refreshing = true; window.location.reload(); }
      });
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
