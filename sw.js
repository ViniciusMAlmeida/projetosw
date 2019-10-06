self.addEventListener("install", event => {
    console.log("Evento de install");
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    console.log("Evento de activate");
});

self.addEventListener("push", event => {
    console.log('evento de PUSH')
    console.log(event.data.text())

    event.waitUntil(
        self.registration.showNotification(
            'Titulo Qualquer', {
                body: event.data.text(),
                icon: 'moto.jpg',
                requireInteraction: true
            }
        )
    )

})