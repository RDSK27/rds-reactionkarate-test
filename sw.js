/* RDS Reaction Karate - Service Worker */
var CACHE = 'reactionkarate-v93';

/* Imagenes y sonidos (assets/, ~9 MB) en una cache APARTE y PERSISTENTE (2026-10-02).
   Antes solo se guardaba lo que se pedia online y cada version nueva borraba la cache
   anterior entera: offline faltaban el fondo del tatami y los karatecas que no se habian
   usado online desde la ultima actualizacion. Ahora se precargan todos al instalar (y se
   reintenta lo que falte cada vez que se abre la app con red) y esta cache NO se borra al
   subir de version. Si se CAMBIA el contenido de algun asset, subir ASSET_CACHE (-2, -3...)
   para que se vuelvan a descargar todos; el fondo ademas lleva ?v=N en el css. */
var ASSET_CACHE = 'rkarate-assets-1';

var ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

var MEDIA = [
  './assets/atk_combo.png',
  './assets/atk_cross.png',
  './assets/atk_elbow.png',
  './assets/atk_jab.png',
  './assets/bg_tatami.jpg?v=2',
  './assets/block_cross.png',
  './assets/block_high.png',
  './assets/block_low.png',
  './assets/block_side.png',
  './assets/cover.png',
  './assets/evade_back.png',
  './assets/f_aka/atk_combo.png',
  './assets/f_aka/atk_cross.png',
  './assets/f_aka/atk_elbow.png',
  './assets/f_aka/atk_jab.png',
  './assets/f_aka/block_cross.png',
  './assets/f_aka/block_high.png',
  './assets/f_aka/block_low.png',
  './assets/f_aka/block_side.png',
  './assets/f_aka/cover.png',
  './assets/f_aka/evade_back.png',
  './assets/f_aka/guard_base.png',
  './assets/f_aka/guard_chest.png',
  './assets/f_aka/guard_closed.png',
  './assets/f_aka/guard_flank.png',
  './assets/f_aka/guard_low.png',
  './assets/f_aka/guard_temple.png',
  './assets/f_aka/kick_front.png',
  './assets/f_aka/kick_high.png',
  './assets/f_aka/kick_low.png',
  './assets/f_aka/kick_mid.png',
  './assets/f_aka/knee.png',
  './assets/f_aka/saludo.png',
  './assets/f_aka/sweep_low.png',
  './assets/f_ao/atk_combo.png',
  './assets/f_ao/atk_cross.png',
  './assets/f_ao/atk_elbow.png',
  './assets/f_ao/atk_jab.png',
  './assets/f_ao/block_cross.png',
  './assets/f_ao/block_high.png',
  './assets/f_ao/block_low.png',
  './assets/f_ao/block_side.png',
  './assets/f_ao/cover.png',
  './assets/f_ao/evade_back.png',
  './assets/f_ao/guard_base.png',
  './assets/f_ao/guard_chest.png',
  './assets/f_ao/guard_closed.png',
  './assets/f_ao/guard_flank.png',
  './assets/f_ao/guard_low.png',
  './assets/f_ao/guard_temple.png',
  './assets/f_ao/kick_front.png',
  './assets/f_ao/kick_high.png',
  './assets/f_ao/kick_low.png',
  './assets/f_ao/kick_mid.png',
  './assets/f_ao/knee.png',
  './assets/f_ao/saludo.png',
  './assets/f_ao/sweep_low.png',
  './assets/guard_base.png',
  './assets/guard_chest.png',
  './assets/guard_closed.png',
  './assets/guard_flank.png',
  './assets/guard_low.png',
  './assets/guard_temple.png',
  './assets/kick_front.png',
  './assets/kick_high.png',
  './assets/kick_low.png',
  './assets/kick_mid.png',
  './assets/knee.png',
  './assets/m_aka/atk_combo.png',
  './assets/m_aka/atk_cross.png',
  './assets/m_aka/atk_elbow.png',
  './assets/m_aka/atk_jab.png',
  './assets/m_aka/block_cross.png',
  './assets/m_aka/block_high.png',
  './assets/m_aka/block_low.png',
  './assets/m_aka/block_side.png',
  './assets/m_aka/cover.png',
  './assets/m_aka/evade_back.png',
  './assets/m_aka/guard_base.png',
  './assets/m_aka/guard_chest.png',
  './assets/m_aka/guard_closed.png',
  './assets/m_aka/guard_flank.png',
  './assets/m_aka/guard_low.png',
  './assets/m_aka/guard_temple.png',
  './assets/m_aka/kick_front.png',
  './assets/m_aka/kick_high.png',
  './assets/m_aka/kick_low.png',
  './assets/m_aka/kick_mid.png',
  './assets/m_aka/knee.png',
  './assets/m_aka/saludo.png',
  './assets/m_aka/sweep_low.png',
  './assets/m_ao/atk_combo.png',
  './assets/m_ao/atk_cross.png',
  './assets/m_ao/atk_elbow.png',
  './assets/m_ao/atk_jab.png',
  './assets/m_ao/block_cross.png',
  './assets/m_ao/block_high.png',
  './assets/m_ao/block_low.png',
  './assets/m_ao/block_side.png',
  './assets/m_ao/cover.png',
  './assets/m_ao/evade_back.png',
  './assets/m_ao/guard_base.png',
  './assets/m_ao/guard_chest.png',
  './assets/m_ao/guard_closed.png',
  './assets/m_ao/guard_flank.png',
  './assets/m_ao/guard_low.png',
  './assets/m_ao/guard_temple.png',
  './assets/m_ao/kick_front.png',
  './assets/m_ao/kick_high.png',
  './assets/m_ao/kick_low.png',
  './assets/m_ao/kick_mid.png',
  './assets/m_ao/knee.png',
  './assets/m_ao/saludo.png',
  './assets/m_ao/sweep_low.png',
  './assets/sfx/kiai_f1.wav',
  './assets/sfx/kiai_f2.wav',
  './assets/sfx/kiai_m1.wav',
  './assets/sfx/kiai_m2.wav',
  './assets/sfx/whoosh_amago.wav',
  './assets/sfx/whoosh_move.wav',
  './assets/sweep_low.png'
];

/* Descarga lo que aun no este en ASSET_CACHE, de 6 en 6. Tolerante: un fallo suelto no
   rompe nada (se reintentara la proxima vez). */
function precacheMedia(){
  return caches.open(ASSET_CACHE).then(function(cache){
    var i = 0;
    function worker(){
      if(i >= MEDIA.length){ return Promise.resolve(); }
      var u = MEDIA[i++];
      return cache.match(u).then(function(hit){
        if(hit){ return null; }
        return fetch(new Request(u, {cache:'reload'})).then(function(r){
          if(r && r.status === 200){ return cache.put(u, r); }
        }).catch(function(){});
      }).then(worker);
    }
    return Promise.all([worker(), worker(), worker(), worker(), worker(), worker()]);
  });
}

self.addEventListener('install', function(e){
  /* Activar la versión nueva EN CUANTO termine de instalarse, sin esperar
     a que la página mande un mensaje pidiéndolo (2026-09-14 -- el usuario
     reportó que tardaba varios cierres/aperturas en actualizarse). Antes
     dependía de un mensaje de ida y vuelta (ver 'updatefound' en index.html)
     que añadía un paso más que podía retrasarse o no llegar a tiempo. */
  self.skipWaiting();
  e.waitUntil(Promise.all([
    caches.open(CACHE).then(function(cache){
      // {cache:'reload'} evita que el precache use copias viejas del HTTP cache
      return cache.addAll(ASSETS.map(function(u){ return new Request(u, {cache:'reload'}); }));
    }),
    precacheMedia()
  ]));
});

/* La pagina avisa al abrirse con red: reintenta lo que falte (self-healing). */
self.addEventListener('message', function(e){
  if(e.data && e.data.action === 'precacheMedia'){ e.waitUntil(precacheMedia()); }
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      /* borra cache vieja de ESTA app (deja intactas las de otras apps RDS,
         que comparten origen -- caches.keys() ve TODAS las del origen). La de
         assets solo se borra si cambia de nombre (ASSET_CACHE). */
      return Promise.all(keys.map(function(k){
        if(k.indexOf('reactionkarate-')===0 && k!==CACHE){ return caches.delete(k); }
        if(k.indexOf('rkarate-assets-')===0 && k!==ASSET_CACHE){ return caches.delete(k); }
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

/* Los <audio> piden los sonidos por trozos (cabecera Range): una respuesta 200 completa
   desde la cache no les vale en iOS/Safari -> se devuelve el trozo pedido (206). */
function rangeOrFull(req, cached){
  var range = req.headers.get('range');
  if(!range){ return cached; }
  return cached.arrayBuffer().then(function(buf){
    var m = /bytes=(\d*)-(\d*)/.exec(range);
    var start = (m && m[1]) ? parseInt(m[1], 10) : 0;
    var end = (m && m[2]) ? parseInt(m[2], 10) : buf.byteLength - 1;
    if(end >= buf.byteLength){ end = buf.byteLength - 1; }
    return new Response(buf.slice(start, end + 1), {
      status: 206, statusText: 'Partial Content',
      headers: {
        'Content-Type': cached.headers.get('Content-Type') || 'application/octet-stream',
        'Content-Range': 'bytes ' + start + '-' + end + '/' + buf.byteLength,
        'Content-Length': String(end - start + 1)
      }
    });
  });
}

self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET'){ return; }
  var url = new URL(req.url);
  var sameOrigin = (url.origin === self.location.origin);

  // NAVEGACION (HTML): network-first -> siempre la ultima version si hay red,
  // con la cache como respaldo offline. {cache:'no-store'} es imprescindible:
  // sin esto, fetch() puede devolver el index.html que el propio navegador
  // (no el SW) tenia guardado en su cache HTTP normal, y la app tarda varios
  // cierres/aperturas en "ponerse al dia" hasta que ese cache caduca solo.
  if(req.mode === 'navigate'){
    e.respondWith(
      fetch(req, {cache:'no-store'}).then(function(resp){
        var copy = resp.clone();
        caches.open(CACHE).then(function(cache){ try{ cache.put('./index.html', copy); }catch(err){} });
        return resp;
      }).catch(function(){
        return caches.match(req).then(function(cached){ return cached || caches.match('./index.html'); });
      })
    );
    return;
  }

  var isFbSdk = (url.hostname === 'www.gstatic.com' && url.pathname.indexOf('/firebasejs/') !== -1);
  // El resto de origenes (p. ej. firestore.googleapis.com) van directos a la red:
  // asi Firestore gestiona su propia persistencia offline.
  if(!sameOrigin && !isFbSdk){ return; }

  // ASSETS estaticos: cache-first. Lo de assets/ y el SDK de Firebase (url con version) van a la cache
  // persistente: sobreviven a las actualizaciones de la app.
  e.respondWith(
    caches.match(req).then(function(cached){
      if(cached){ return rangeOrFull(req, cached); }
      return fetch(req).then(function(resp){
        if(resp && resp.status === 200){
          var copy = resp.clone();
          var target = (isFbSdk || url.pathname.indexOf('/assets/') !== -1) ? ASSET_CACHE : CACHE;
          caches.open(target).then(function(cache){ return cache.put(req, copy); }).catch(function(){});
        }
        return resp;
      }).catch(function(){
        if(req.mode === 'navigate'){ return caches.match('./index.html'); }
      });
    })
  );
});
