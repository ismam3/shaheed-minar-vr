const cache_name = "cache_v1.0.0"

self.addEventListener("install",e=>{
    self.skipWaiting();
    e.waitUntil(
        caches.open(cache_name).then(cache=>{
            return cache.addAll(["./","./icons/192.png","./icons/512.png","./models/main10.glb","./models/mesh5.glb","./models/nav-mesh9.gltf","./advertisement.png","./a-frame/1-1-0.min.js","./a-frame/environment.min.js","./a-frame/teleport-control.min.js","./a-frame/extras.min.js"])
        })
    )
});

self.addEventListener("activate", e=>{
    e.waitUntil(
        caches.keys().then(keys=>{
            console.log(keys)
            return Promise.all(keys
                .filter(key=>key !== cache_name)
                .map(key=> caches.delete(key))
            )
        })
    )
})

self.addEventListener("fetch",e=>{
    e.respondWith(
        caches.match(e.request).then(response=>{
            return response||fetch(e.request)
        })
    );
})