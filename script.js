(()=>{
 const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
 const menu=$('#menu'),links=$('#links');
 menu.setAttribute('aria-expanded','false');
 menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕':'☰'});
 $$('#links a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));
 $('#year').textContent=new Date().getFullYear();
 const progress=$('#progress'),topButton=$('#top');
 function onScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max?scrollY/max*100:0)+'%';topButton.classList.toggle('show',scrollY>420)}
 addEventListener('scroll',onScroll,{passive:true});onScroll();topButton.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
 if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(el=>io.observe(el))}else $$('.reveal').forEach(el=>el.classList.add('visible'));
 // Highlight the navigation item for the section currently in view.
 if('IntersectionObserver'in window){const sections=$$('main section[id]');const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){$$('#links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-25% 0px -65% 0px'});sections.forEach(s=>navObserver.observe(s))}
 // Project filtering with a live result count.
 const projectCards=$$('.projects article'),filterButtons=$$('.filters button');
 const count=document.createElement('p');count.className='result-count';count.setAttribute('aria-live','polite');count.style.cssText='font-size:10px;color:#8292a4;margin:-8px 0 18px;';
 $('.filters').insertAdjacentElement('afterend',count);
 function filterProjects(filter){let shown=0;projectCards.forEach(card=>{const visible=filter==='all'||card.dataset.category===filter;card.classList.toggle('hide',!visible);if(visible)shown++});count.textContent=`Showing ${shown} of ${projectCards.length} projects`;filterButtons.forEach(btn=>{const active=btn.dataset.filter===filter;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active))})}
 filterButtons.forEach(btn=>btn.addEventListener('click',()=>filterProjects(btn.dataset.filter)));filterProjects('all');
 const projectData={
  inventory:{title:'OSAM Ukay-Ukay Inventory System',desc:'A web-based system designed to help OSAM Ukay-Ukay manage clothing inventory, monitor stock levels, and record financial transactions.',features:['Clothing inventory management','Stock monitoring','Sales and transaction recording','Automated financial auditing','Report generation']},
  pwd:{title:'PWD Information Management System',desc:'A web-based system designed to organize, manage, and maintain personal information and records of persons with disabilities.',features:['PWD registration','PWD profile management','Record updating and searching','PWD information reports','PWD record monitoring']},
  transport:{title:'Transportation Management System',desc:'A web-based system designed to organize transportation services, vehicle information, routes, and travel schedules.',features:['Vehicle registration and management','Driver information management','Route management','Trip scheduling and monitoring','Transportation records and reports']}
 };
 const modal=$('#modal'),closeButton=$('#close');let lastFocused=null;
 function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';if(lastFocused)lastFocused.focus()}
 $$('.details').forEach(btn=>btn.addEventListener('click',()=>{const p=projectData[btn.dataset.id];if(!p)return;lastFocused=btn;$('#mtitle').textContent=p.title;$('#mdesc').textContent=p.desc;$('#mfeatures').replaceChildren(...p.features.map(feature=>{const li=document.createElement('li');li.textContent=feature;return li}));modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';closeButton.focus()}));
 closeButton.addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();if(e.key==='Tab'&&modal.classList.contains('open')){const focusable=$$(' .dialog button, .dialog a').filter(el=>!el.disabled);if(focusable.length){const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}});
 let toastTimer;function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2400)}
 $('#copy').addEventListener('click',async()=>{const email='mendevilchristian2@gmail.com';try{await navigator.clipboard.writeText(email);toast('Email address copied to clipboard.')}catch{const field=document.createElement('textarea');field.value=email;document.body.append(field);field.select();const copied=document.execCommand('copy');field.remove();toast(copied?'Email address copied to clipboard.':email)}});
})();
