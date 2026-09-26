// Registers the minimal service worker (public/sw.js) and dispatches a
// custom "corner:update-available" window event whenever a new version has
// installed while the page is open. UpdateBadge.tsx listens for this event
// to show a small "something new, tap to refresh" pill.
//
// No real push notifications here -- that needs server infrastructure to
// hold subscriptions, which would break the zero-backend design. This is
// the deliberate, discussed tradeoff instead.

const SW_URL = `${import.meta.env.BASE_URL}sw.js`;

// tracks whether this tab's first registration is still in flight, so the
// "sw-updated" message from an install that merely matches an unrelated
// tab's first-ever page load doesn't fire a spurious update pill.
let hasControllerOnRegister = false;

export function registerSW(): void {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    hasControllerOnRegister = Boolean(navigator.serviceWorker.controller);

    navigator.serviceWorker.register(SW_URL).catch(() => {
      // offline-support is a nice-to-have, not core functionality --
      // fail silently if registration doesn't work for any reason.
    });

    navigator.serviceWorker.addEventListener("message", (event) => {
      // only surface the pill if a worker was already controlling this
      // page -- i.e. this is a genuine update, not the very first install.
      if (event.data?.type === "corner:sw-updated" && hasControllerOnRegister) {
        window.dispatchEvent(new CustomEvent("corner:update-available"));
      }
    });
  });
}

export function applyUpdate(): void {
  window.location.reload();
}
