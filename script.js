if ('serviceWorker' in navigator) {
    
    window.onload = function(){
        navigator.serviceWorker.register('/projetosw/sw.js')
            .then(function(){
                console.log('ServiceWorker registrado com sucesso!')
            }, function(e) {
                console.log('Deu erro ao registrar o ServiceWorker')
                console.log(e)
            })

        setTimeout(function(){
            var img = new Image();
            img.src = 'carro.jpg'
            document.body.appendChild(img);
        }, 3000)
    }
}