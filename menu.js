// Off-Canvas-Menü für kleine Bildschirme
(function(){
  const h=document.querySelector('header'),n=h&&h.querySelector('nav');if(!n)return;
  const b=document.createElement('button');b.className='menu-btn';b.setAttribute('aria-label','Menü');b.setAttribute('aria-expanded','false');
  b.innerHTML='<span></span><span></span><span></span>';n.appendChild(b);
  const bd=document.createElement('div');bd.className='menu-backdrop';h.appendChild(bd);
  const set=o=>{document.body.classList.toggle('menu-open',o);b.setAttribute('aria-expanded',o)};
  b.onclick=()=>set(!document.body.classList.contains('menu-open'));
  bd.onclick=()=>set(false);
  n.querySelectorAll('ul a').forEach(a=>a.addEventListener('click',()=>set(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});
  matchMedia('(min-width:861px)').addEventListener('change',e=>{if(e.matches)set(false)});
})();

// Nach-oben-Button
(function(){
  const b=document.createElement('button');b.className='totop';b.type='button';
  b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  const lab=()=>{const t=document.documentElement.lang==='en'?'Back to top':'Nach oben';b.setAttribute('aria-label',t);b.title=t};
  lab();document.body.appendChild(b);
  new MutationObserver(lab).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  const upd=()=>b.classList.toggle('show',window.scrollY>700);
  addEventListener('scroll',upd,{passive:true});upd();
  b.onclick=()=>scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
})();
