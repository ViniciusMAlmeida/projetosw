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