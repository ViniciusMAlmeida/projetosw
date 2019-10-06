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
                requireInteraction: true,
                data: {
                    id: '123',
                    url: 'https://www.google.com.br'
                }
            }
        )
    )

})

self.addEventListener('notificationclick', event => {
    event.notification.close()

    console.log('Evento de clique')
    console.log(event.notification.data)

    clients.openWindow(event.notification.data.url)
})