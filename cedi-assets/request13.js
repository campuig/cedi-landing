(() => {
  const paths = {
    world:'pagos-internacionales',treasury:'centro-control-contable',cards:'tarjetas-corporativas',
    spei:'cuenta-empresarial-spei',tokens:'motor-de-pagos',permissions:'equipo-permisos',
    approval:'niveles-autorizacion',usd:'cuenta-multidivisa',clabes:'multiclabe',debit:'domiciliacion',
    accounting:'centro-control-contable',fan:'dispersiones',chat:'centry',terminal:'adquirencia'
  };
  const videos = new Map();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const paused = () => reduced.matches || document.body.classList.contains('lux-motion-paused');
  function fallback(video,slot){video.hidden=true;slot.classList.remove('video-ready');video.pause()}
  function sync(){for(const [video,{slot,visible}] of videos){if(!video.isConnected){observer.unobserve(slot);videos.delete(video);continue}if(paused()||!visible||document.hidden||slot.closest('[hidden]'))video.pause();else if(video.readyState>=2)video.play().catch(()=>fallback(video,slot))}}
  const observer = new IntersectionObserver(entries=>{for(const {target,isIntersecting} of entries){const video=target.querySelector('video[data-product-animation]');const state=videos.get(video);if(!state)continue;state.visible=isIntersecting;if(isIntersecting&&!video.getAttribute('src')){video.src=video.dataset.src;video.load()}}sync()},{threshold:.05});
  window.mountProductAnimationVideos = function(){
    document.querySelectorAll('.curated-product [data-scene],.content-page .product-lab [data-scene]').forEach(slot=>{
      const name=paths[slot.dataset.scene];if(!name||slot.querySelector('video[data-product-animation]'))return;
      const video=document.createElement('video');
      video.dataset.productAnimation=name;video.dataset.src='/assets/animations/'+name+'.mp4';
      video.autoplay=true;video.muted=true;video.defaultMuted=true;video.loop=true;video.playsInline=true;
      video.setAttribute('autoplay','');video.setAttribute('muted','');video.setAttribute('loop','');video.setAttribute('playsinline','');
      video.setAttribute('loading','lazy');video.preload='none';video.poster='/assets/animations/'+name+'.jpg';
      video.setAttribute('aria-label',slot.getAttribute('aria-label')||name);video.hidden=true;
      video.addEventListener('playing',()=>{video.hidden=false;slot.classList.add('video-ready')});
      video.addEventListener('error',()=>fallback(video,slot));
      video.addEventListener('loadeddata',sync);
      slot.classList.add('content-video-slot');slot.append(video);videos.set(video,{slot,visible:false});observer.observe(slot);
    });sync();
  };
  new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
  reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  window.addEventListener('hashchange',window.mountProductAnimationVideos);
  let dialog,returnFocus;
  function openCentry(trigger){
    returnFocus=trigger;
    if(!dialog){
      dialog=document.createElement('dialog');dialog.className='centry-video-dialog';dialog.setAttribute('aria-label','Video de Centry');
      dialog.innerHTML='<button type="button" class="centry-video-close" aria-label="Cerrar video">×</button><video controls playsinline preload="none" aria-label="Video de Centry"></video><p class="centry-video-status" role="status" hidden>El video de Centry todavía no está disponible.</p>';
      document.body.append(dialog);
      dialog.querySelector('button').onclick=()=>dialog.close();
      dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
      dialog.addEventListener('close',()=>{const video=dialog.querySelector('video');video.pause();video.removeAttribute('src');video.load();returnFocus?.focus()});
      dialog.querySelector('video').addEventListener('error',()=>{dialog.querySelector('.centry-video-status').hidden=false});
    }
    dialog.querySelector('.centry-video-status').hidden=true;
    dialog.showModal();const video=dialog.querySelector('video');video.src=location.protocol==='file:'?new URL('assets/videos/centry.mp4',location.href).href:'/assets/videos/centry.mp4';video.load();video.play().catch(()=>{});
  }
  document.addEventListener('click',e=>{const link=e.target.closest('[data-centry-video],#producto-centry a.learn-more');if(!link)return;e.preventDefault();e.stopImmediatePropagation();openCentry(link)},true);
  window.mountProductAnimationVideos();
})();

// Navegación: Clientes vive en Recursos; contacto permanece en el contenido.
document.querySelectorAll('.cedi-sidebar .sidebar-links .commercial-nav[href="#ver/clientes"]').forEach(el=>(el.closest('.restored-nav-group')||el).remove());
document.querySelectorAll('.cedi-sidebar .sidebar-links>a[href="#ver/clientes"],.cedi-sidebar .sidebar-contact').forEach(el=>el.remove());
