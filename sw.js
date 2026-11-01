const CACHE = "sprouty-v15";
const FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./libs/bootstrap/css/bootstrap.min.css",
  "./libs/bootstrap/js/bootstrap.bundle.min.js",
  "./images/logo.svg",
  "./images/hero.svg",
  "./images/course-business.svg",
  "./images/course-climate.svg",
  "./images/course-emerging.svg",
  "./images/course-health.svg",
  "./images/game-garden.svg",
  "./images/game-detectives.svg",
  "./images/my-sprouty.svg",
  "./shared/sprouty-core.js",
  "./sprouty/index.html",
  "./sprouty/sprouty.js",
  "./games/garden-trail/index.html",
  "./games/garden-trail/game.css",
  "./games/garden-trail/game.js",
  "./games/time-detectives/index.html",
  "./games/time-detectives/game.css",
  "./games/time-detectives/game.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then(async (c) => {
      const failed = [];
      for (const f of FILES) {
        try { await c.add(f); } catch (err) { failed.push(f); }
      }
      if (failed.length) {
        console.error("FAILED TO CACHE:", failed);
        throw new Error("Missing files: " + failed.join(", "));
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith("sprouty-") && k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((res) => {
      if (res) return res;
      return fetch(e.request).catch(() =>
        // Only fall back to the home page for page loads, never for images or scripts
        e.request.mode === "navigate" ? caches.match("./index.html") : Response.error()
      );
    })
  );
});
