self.addEventListener("install", event => {
    console.log("Evento de install");
    self.skipWaiting();

    event.waitUntil(
        caches.open("teste-v1").then(function (cache) {
            cache.add("moto.jpg");
        })
    );
});

self.addEventListener("activate", event => {
    console.log("Evento de activate");
});

self.addEventListener("fetch", event => {
    let url = new URL(event.request.url);

    if (url.origin == location.origin && url.pathname === "/projetosw/carro.jpg") {
        event.respondWith(caches.match("moto.jpg"));
    }
});