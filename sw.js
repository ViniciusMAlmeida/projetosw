self.addEventListener('install', event => {
    console.log('Evento de install')
    //self.skipWaiting()
})

self.addEventListener('activate', event =>{
    console.log('Evento de activate')
})