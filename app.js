/* Sprache (DE/EN), Audio-Wechsel und Terminliste */
const els=[...document.querySelectorAll('[data-i]')];
els.forEach(e=>e.dataset.de=e.innerHTML);
let LANG='de';
const T=(de,en)=>(LANG==='en'&&en)?en:de;
function renderTermine(){
  const box=document.getElementById('termine-list'); if(!box)return;
  const f=box.dataset.filter, now=new Date().toISOString().slice(0,10);
  const list=(window.TERMINE||[]).filter(t=>(!f||t.kategorie===f)&&t.datum>=now)
    .sort((a,b)=>(a.datum+(a.zeit||'')).localeCompare(b.datum+(b.zeit||'')));
  if(!list.length){box.innerHTML='<p class="empty">'+T('Aktuell sind keine Termine eingestellt. Schau bald wieder vorbei – oder melde dich bei mir.','No dates are scheduled right now. Check back soon – or get in touch.')+'</p>';return}
  box.innerHTML=list.map(t=>{
    const d=new Date(t.datum+'T00:00').toLocaleDateString(LANG==='en'?'en-GB':'de-DE',{weekday:'short',day:'2-digit',month:'long',year:'numeric'});
    const title=T(t.titel,t.titel_en), art=t.art==='online'?'Online':'Live';
    const href=t.link||('index.html?event='+encodeURIComponent(title+' ('+t.datum+')')+'#kontakt');
    const lbl=t.link?T('Buchen','Book'):T('Anfragen','Enquire');
    return '<div class="termin"><div class="d">'+d+'<br><small>'+(t.zeit||'')+'</small></div><div class="t"><strong>'+title+'</strong><span class="tag">'+art+'</span><small>'+(t.ort||'')+'</small></div><a class="btn sm" href="'+href+'"'+(t.link?' target="_blank" rel="noopener"':'')+'>'+lbl+' →</a></div>';
  }).join('');
}
function setLang(l){
  LANG=l; const EN=window.EN||{};
  els.forEach(e=>{e.innerHTML=(l==='en'&&EN[e.dataset.i])?EN[e.dataset.i]:e.dataset.de});
  document.documentElement.lang=l;
  document.querySelectorAll('.langs button').forEach(b=>b.classList.toggle('on',b.dataset.l===l));
  document.querySelectorAll('[data-ph]').forEach(e=>e.placeholder=l==='en'?e.dataset.phEn:e.dataset.ph);
  const au=document.getElementById('au');
  if(au){const src=l==='en'?'atempause-en.mp3':'atempause.mp3'; if(au.getAttribute('src')!==src){au.pause();au.setAttribute('src',src);au.load()}}
  renderTermine();
  try{localStorage.setItem('lang',l)}catch(e){}
}
document.querySelectorAll('.langs button').forEach(b=>b.onclick=()=>setLang(b.dataset.l));
const ev=new URLSearchParams(location.search).get('event'), ta=document.getElementById('msg');
if(ev&&ta)ta.value='Anfrage / Enquiry: '+ev+'\n\n';
let l=null;try{l=localStorage.getItem('lang')}catch(e){}
if(!l)l=(navigator.language||'de').toLowerCase().startsWith('de')?'de':'en';
setLang(l);
