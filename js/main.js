(function(){
  /* Konfigurasi resmi ada di js/config.js */
  var CONFIG = window.ANTORA_CONFIG;

  var $=function(s,r){return (r||document).querySelector(s)};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Logo fallback if the official image cannot be loaded */
  $$('img.brand-img').forEach(function(img){
    var fail=function(){var w=img.closest('.logo-wrap');if(w)w.classList.add('no-logo')};
    img.addEventListener('error',fail);
    if(img.complete&&img.naturalWidth===0)fail();
  });

  /* Optional links: enabled only when an official URL exists */
  function validUrl(u){return typeof u==='string'&&/^https:\/\//i.test(u)}
  $$('[data-link]').forEach(function(a){
    var u=CONFIG[a.getAttribute('data-link')];
    if(validUrl(u)){a.setAttribute('href',u);a.target='_blank';a.rel='noopener noreferrer';a.removeAttribute('aria-disabled');a.removeAttribute('title');a.removeAttribute('role')}
    else{a.setAttribute('tabindex','-1');a.addEventListener('click',function(e){e.preventDefault()})}
  });

  /* Token facts */
  function fill(id,val){var el=$(id);if(el&&val){el.textContent=val;el.classList.remove('pending')}}
  fill('#tkChain',CONFIG.blockchain);fill('#tkSupply',CONFIG.totalSupply);fill('#tkUtility',CONFIG.utility);fill('#tkVesting',CONFIG.vesting);
  var copyBtn=$('#copyBtn');
  if(CONFIG.contractAddress){
    fill('#tkContract',CONFIG.contractAddress);copyBtn.disabled=false;copyBtn.removeAttribute('title');
    copyBtn.addEventListener('click',function(){
      var done=function(ok){$('#copyLbl').textContent=ok?'Copied':'Select to copy';setTimeout(function(){$('#copyLbl').textContent='Copy'},1800)};
      try{navigator.clipboard.writeText(CONFIG.contractAddress).then(function(){done(true)},function(){selectNode($('#tkContract'));done(false)})}
      catch(e){selectNode($('#tkContract'));done(false)}
    });
  }
  function selectNode(n){var r=document.createRange();r.selectNodeContents(n);var s=window.getSelection();s.removeAllRanges();s.addRange(r)}

  /* Mobile menu */
  var mbtn=$('#menuBtn'),mnav=$('#mnav');
  function setMenu(open){mnav.hidden=!open;mbtn.setAttribute('aria-expanded',String(open));mbtn.setAttribute('aria-label',open?'Close menu':'Open menu');mbtn.innerHTML='<svg class="ic"><use href="#'+(open?'i-close':'i-menu')+'"/></svg>'}
  mbtn.addEventListener('click',function(){setMenu(mnav.hidden)});
  $$('.m-link,#mnav .btn').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!mnav.hidden){setMenu(false);mbtn.focus()}});
  window.addEventListener('resize',function(){if(window.innerWidth>=1100&&!mnav.hidden)setMenu(false)});

  /* Scroll spy */
  var links=$$('.nav-links a');
  var ids=['home','about','ecosystem','tokenomics','roadmap','whitepaper','faq','community'];
  if('IntersectionObserver' in window){
    var spy=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){var id=en.target.id;if(id==='token')id='tokenomics';links.forEach(function(l){l.classList.toggle('active',l.getAttribute('href')==='#'+id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    ids.concat(['token']).forEach(function(id){var s=document.getElementById(id);if(s)spy.observe(s)});
  }

  /* FAQ accordion */
  $$('.faq-q').forEach(function(b){b.addEventListener('click',function(){
    var item=b.closest('.faq-item'),open=!item.classList.contains('open');
    item.classList.toggle('open',open);b.setAttribute('aria-expanded',String(open));
  })});

  /* Legal panels */
  $$('.legal button').forEach(function(b){b.addEventListener('click',function(){
    var id=b.getAttribute('data-panel'),p=document.getElementById(id),open=p.hidden;
    $$('.legal-panel').forEach(function(x){x.hidden=true});
    $$('.legal button').forEach(function(x){x.setAttribute('aria-expanded','false')});
    p.hidden=!open;b.setAttribute('aria-expanded',String(open));
  })});

  /* Ecosystem selector */
  var nodes=$$('.eco-node'),lines=$$('.eco-lines line');
  function pick(i){
    nodes.forEach(function(n,k){n.setAttribute('aria-pressed',String(k===i))});
    lines.forEach(function(l,k){l.classList.toggle('on',k===i)});
    var n=nodes[i];
    $('#ecoTitle').textContent=$('.name',n).textContent;
    $('#ecoDesc').textContent=n.getAttribute('data-desc');
  }
  nodes.forEach(function(n,i){n.addEventListener('click',function(){pick(i)});n.addEventListener('mouseenter',function(){if(window.matchMedia('(hover:hover)').matches)pick(i)})});
  pick(0);

  /* Tokenomics donut + cards (placeholder until percentages are provided) */
  (function(){
    var NS='http://www.w3.org/2000/svg',svg=$('#donut'),list=$('#alloc'),items=CONFIG.allocations;
    var shades=['#FFD700','#D4A017','#B8860B','#8C6914','#E8C14A','#6F5310'];
    var known=items.every(function(a){return typeof a.pct==='number'});
    var sum=known?items.reduce(function(s,a){return s+a.pct},0):0;
    var R=78,C=2*Math.PI*R,start=0,gap=4;
    var g=document.createElementNS(NS,'g');g.setAttribute('transform','rotate(-90 100 100)');svg.appendChild(g);
    var segs=[],cards=[];
    function hot(i,on){segs[i].classList.toggle('hot',on);cards[i].classList.toggle('hot',on)}
    items.forEach(function(a,i){
      var frac=known?a.pct/sum:1/items.length,L=Math.max(C*frac-gap,1);
      var c=document.createElementNS(NS,'circle');
      c.setAttribute('cx','100');c.setAttribute('cy','100');c.setAttribute('r',R);
      c.setAttribute('class','seg'+(known?' known':''));c.setAttribute('stroke',shades[i%shades.length]);
      c.setAttribute('stroke-dasharray',L+' '+(C-L));c.setAttribute('stroke-dashoffset',String(-start));
      start+=C*frac;g.appendChild(c);segs.push(c);
      var li=document.createElement('li');li.tabIndex=0;
      li.innerHTML='<span class="sw" style="background:'+shades[i%shades.length]+'"></span><span><span class="nm"></span><span class="pc"></span></span>';
      $('.nm',li).textContent=a.name;$('.pc',li).textContent=known?a.pct+'%':'TBD';
      list.appendChild(li);cards.push(li);
      li.addEventListener('mouseenter',function(){hot(i,true)});li.addEventListener('mouseleave',function(){hot(i,false)});
      li.addEventListener('focus',function(){hot(i,true)});li.addEventListener('blur',function(){hot(i,false)});
      c.addEventListener('mouseenter',function(){hot(i,true)});c.addEventListener('mouseleave',function(){hot(i,false)});
    });
    var t1=document.createElementNS(NS,'text');t1.setAttribute('x','100');t1.setAttribute('y','104');t1.setAttribute('font-size','26');t1.setAttribute('font-weight','700');t1.textContent=known?'100%':'TBD';
    var t2=document.createElementNS(NS,'text');t2.setAttribute('x','100');t2.setAttribute('y','124');t2.setAttribute('font-size','9');t2.setAttribute('letter-spacing','2.5');t2.setAttribute('fill','#B3AD9C');t2.textContent='ALLOCATION';
    svg.appendChild(t1);svg.appendChild(t2);
    if(known)$('#donutNote').textContent='Segments show the official allocation.';
  })();

  /* Hero particles: golden dust joined by faint colony links */
  (function(){
    var cv=$('#particles'),hero=$('#home'),ctx=cv.getContext('2d'),W=0,H=0,P=[],raf=0,visible=true,dpr=Math.min(window.devicePixelRatio||1,2);
    function size(){
      var r=hero.getBoundingClientRect();W=r.width;H=r.height;
      cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
      var n=Math.max(34,Math.min(84,Math.round(W*H/16000)));
      P=[];for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.7+.5,vy:-(Math.random()*.32+.08),ph:Math.random()*6.28,a:Math.random()*.5+.3,c:Math.random()<.35?'255,215,0':'212,160,23'});
    }
    function frame(t){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<P.length;i++){
        var p=P[i];
        if(!reduce){p.y+=p.vy;p.x+=Math.sin(t/2600+p.ph)*.18;if(p.y<-6){p.y=H+6;p.x=Math.random()*W}}
        var tw=reduce?1:.65+.35*Math.sin(t/900+p.ph);
        ctx.fillStyle='rgba('+p.c+','+(p.a*tw).toFixed(3)+')';
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill();
        for(var j=i+1;j<P.length;j++){
          var q=P[j],dx=p.x-q.x,dy=p.y-q.y,d=dx*dx+dy*dy;
          if(d<9600){ctx.strokeStyle='rgba(212,160,23,'+((1-d/9600)*.16).toFixed(3)+')';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}
        }
      }
      if(!reduce&&visible&&!document.hidden)raf=requestAnimationFrame(frame);else raf=0;
    }
    function start(){if(!raf)raf=requestAnimationFrame(frame)}
    size();start();
    var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){size();if(reduce)frame(0)},150)});
    document.addEventListener('visibilitychange',start);
    if('IntersectionObserver' in window)new IntersectionObserver(function(es){visible=es[0].isIntersecting;if(visible)start()}).observe(hero);
  })();
})();
