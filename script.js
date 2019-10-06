function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

if ('serviceWorker' in navigator && 'Notification' in window) {

    window.onload = function () {

        navigator.serviceWorker.register('/projetosw/sw.js')
            .then(function () {
                console.log('ServiceWorker registrado com sucesso!')
            }, function (e) {
                console.log('Deu erro ao registrar o ServiceWorker')
                console.log(e)
            })

        navigator.serviceWorker.ready
            .then(function (reg) {

                //para realizar o unsubscribe
                // reg.pushManager.getSubscription()
                //     .then(function (subscribe) {

                //         subscribe.unsubscribe()
                //             .then(function () {
                //                 console.log('Unsubscribe OK')
                //             })
                //             .catch(function () {
                //                 console.log('Unsubscribe FAIL')
                //             })
                //     })

                const appCode = 'BOOZiQnPKWxrbXvuNcTD6qJJYAfcVfd2LtRopMa1O-LC7gVwkNkRp6ATQvQsh1lxkOYUgWlUR9CC4npLYtV0hZA'
                const options = {
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(appCode)
                }

                reg.pushManager.subscribe(options)
                    .then(function (pushSubscription) {
                        console.log(JSON.stringify(pushSubscription))

                        //registrar no backend
                        // fetch(
                        //         'http://meusite.com.br/notificacao/registro', {
                        //             method: 'POST',
                        //             body: JSON.stringify(pushSubscription)
                        //         }
                        //     )
                        //     .then(function (res) {
                        //         //Faz alguma coisa com a res
                        //     })
                        //     .catch(function (error) {
                        //         //Faz alguma coisa com o erro
                        //     })
                    })
                    .catch(function (error) {
                        console.log(error.message)
                    })
            })

        Notification.requestPermission(function (permission) {
            if (permission === 'granted') {
                console.log('Permitida!')
            } else {
                console.log('Negada!')
            }
        })
    }
}