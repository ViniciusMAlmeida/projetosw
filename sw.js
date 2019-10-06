self.addEventListener("install", event => {
    console.log("Evento de install");
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    console.log("Evento de activate");
});

self.addEventListener("push", event => {
    console.log('evento de PUSH')

    const data = JSON.parse(event.data.text())

    event.waitUntil(
        self.registration.showNotification(
            data.titulo, {
                body: data.corpo,
                icon: 'moto.jpg',
                requireInteraction: true,
                data: {
                    id: data.id,
                    url: data.url
                },
                actions: [{
                        title: 'Arquivar',
                        action: 'arquivar'
                    },
                    {
                        title: 'Marcar Como Lido',
                        action: 'marcar_lido'
                    }
                ]
            }
        )
    )

})

self.addEventListener('notificationclick', event => {
    event.notification.close()

    const id = event.notification.data.id

    if (event.action === 'arquivar') {
        console.log(`ARQUIVANDO O EMAIL: ${id}`)
    } else if (event.action === 'marcar_lido') {
        console.log(`MARCADO COMO LIDO O EMAIL: ${id}`)
    } else {
        clients.openWindow(event.notification.data.url)
    }

})