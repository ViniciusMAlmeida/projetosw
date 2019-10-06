if ('serviceWorker' in navigator && 'Notification' in window) {

    window.onload = function () {

        navigator.serviceWorker.register('/projetosw/sw.js')
            .then(function () {
                console.log('ServiceWorker registrado com sucesso!')
            }, function (e) {
                console.log('Deu erro ao registrar o ServiceWorker')
                console.log(e)
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