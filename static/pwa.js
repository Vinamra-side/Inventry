(function () {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      let refreshing = false;
      navigator.serviceWorker.register("/service-worker.js").then(function (registration) {
        function showUpdate(worker) {
          if (!worker) return;
          const badge = document.querySelector("[data-update-badge]");
          const item = document.querySelector("[data-update-item]");
          const empty = document.querySelector("[data-update-empty]");
          const count = document.querySelector("[data-update-count]");
          const apply = document.querySelector("[data-apply-update]");
          if (!badge || !item || !apply) return;
          badge.hidden = false;
          item.hidden = false;
          empty.hidden = true;
          count.textContent = "1 new update";
          apply.onclick = function () { worker.postMessage({type: "SKIP_WAITING"}); };
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
