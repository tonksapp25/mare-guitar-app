(()=>{
  const install=document.getElementById('install-app');
  const fullscreen=document.getElementById('fullscreen-app');
  const dialog=document.getElementById('app-mode-dialog');
  const standalone=matchMedia('(display-mode: standalone)');
  let prompt=null,origin=null,hasInstalled=false;
  const installed=()=>standalone.matches||navigator.standalone===true;
  const update=()=>{
    install.disabled=installed()||hasInstalled;
    install.querySelector('.sidebar-action-label').textContent=installed()||hasInstalled?'Dodana':'Dodaj aplikaciju';
    fullscreen.querySelector('.sidebar-action-label').textContent=document.fullscreenElement?'Smanji ekran':'Puni ekran';
    fullscreen.setAttribute('aria-pressed',String(!!document.fullscreenElement));
  };
  function explain(title,text,button){
    origin=button;
    document.getElementById('app-mode-title').textContent=title;
    document.getElementById('app-mode-body').textContent=text;
    dialog.showModal();
  }
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();prompt=event;});
  window.addEventListener('appinstalled',()=>{prompt=null;hasInstalled=true;install.disabled=true;install.querySelector('.sidebar-action-label').textContent='Dodana';});
  standalone.addEventListener('change',update);
  document.addEventListener('fullscreenchange',update);
  install.addEventListener('click',async()=>{
    if(prompt){const pending=prompt;prompt=null;try{await pending.prompt();await pending.userChoice;}catch{showInstallHelp();}return;}
    showInstallHelp();
  });
  function showInstallHelp(){
    const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
    explain('Dodaj aplikaciju',ios?
      'Otvori ovu stranicu u Safariju. Dodirni Dijeli, zatim Dodaj na početni zaslon i potvrdi Dodaj. Marijina gitara dobit će svoju ikonu.':
      'U izborniku preglednika potraži Instaliraj aplikaciju ili Dodaj na početni zaslon. Ako opcija nije dostupna, otvori stranicu u Chromeu, Edgeu ili Safariju. Aplikaciju možeš nastaviti koristiti i ovdje.',install);
  }
  fullscreen.addEventListener('click',async()=>{
    if(!document.fullscreenEnabled||!document.documentElement.requestFullscreen){
      explain('Puni ekran','Ovaj preglednik ne podržava puni ekran za ovu stranicu. Dodaj aplikaciju na početni zaslon i otvori je preko njezine ikone za prikaz bez traka preglednika.',fullscreen);return;
    }
    try{
      if(document.fullscreenElement)await document.exitFullscreen();
      else{
        if(document.body.classList.contains('nav-open'))document.getElementById('nav-close').click();
        await document.documentElement.requestFullscreen();
      }
    }catch{explain('Puni ekran','Preglednik nije dopustio puni ekran. Pokušaj u običnom prozoru preglednika ili dodaj aplikaciju na početni zaslon.',fullscreen);}
  });
  dialog.querySelectorAll('[data-app-mode-close]').forEach(button=>button.addEventListener('click',()=>dialog.close()));
  dialog.addEventListener('close',()=>{origin?.focus({preventScroll:true});origin=null;});
  update();
  if('serviceWorker' in navigator&&window.isSecureContext){
    navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(()=>navigator.serviceWorker.ready).then(()=>{
      document.getElementById('offline-state').textContent='Vježbe i zvukovi spremni su i bez interneta.';
    }).catch(()=>{document.getElementById('offline-state').textContent='Za preuzimanje vježbi provjeri vezu pa ponovno otvori aplikaciju.';});
  }
})();
