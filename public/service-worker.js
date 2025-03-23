const cacheData = "my-pwa-cache-v1";
// const ASSETS_TO_CACHE = [
//   "/",
//   "/index.html",
//   "/offline.html", // Add the offline page
//   "/manifest.json",
//   "/logo192.png",
//   "/logo512.png",
//   "/static/js/main.f53ca5ba.js",
//   "/static/css/main.c5af9a42.css",
// ];

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/",
        "/index.html",
        "/offline.html", // Add the offline page
        "/manifest.json",
        "/logo192.png",
        "/logo512.png",
        "/static/js/main.bcc8234a.js",
        "/static/css/main.dc4d6ff2.css",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  // console.warn("url",event.request.url)

  if (!navigator.onLine) {
    if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
      event.waitUntil(
        this.registration.showNotification("Internet", {
          body: "internet not working",
        })
      );
    }
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        let requestUrl = event.request.clone();
        fetch(requestUrl);
      })
    );
  }
});
