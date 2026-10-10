(function(){
var paused=false,lenis=null,mob=matchMedia('(max-width:820px)').matches;
var v=document.getElementById('heroV'),held=document.getElementById('held');
v.poster=mob?v.dataset.pm:v.dataset.pd;v.src=mob?v.dataset.m:v.dataset.d;
/* the cheque cut lands at 5.2s; RESULTS turns red 0.25s after it, synced to the film's own clock */
var PAYOFF=5.45;
function tick(){if(v.currentTime>=PAYOFF)held.classList.add('on');else if(v.currentTime<0.3)held.classList.remove('on');if(!v.paused||true)requestAnimationFrame(tick)}
v.addEventListener('ended',function(){if(!paused){setTimeout(function(){if(!paused){v.currentTime=0;v.play()}},2600)}});
v.play&&v.play().catch(function(){});requestAnimationFrame(tick);
requestAnimationFrame(function(){document.body.classList.add('go')});
/* lazy mid-page films */
var vids=[].slice.call(document.querySelectorAll('.lazyv'));
vids.forEach(function(x){if(x.dataset.d){x.dataset.src=mob?x.dataset.m:x.dataset.d;x.poster=mob?x.dataset.pm:x.dataset.pd}});
var io=new IntersectionObserver(function(es){es.forEach(function(e){var x=e.target;if(e.isIntersecting){if(!x.src)x.src=x.dataset.src;if(!paused)x.play().catch(function(){})}else x.pause()})},{threshold:.15});
vids.forEach(function(x){io.observe(x)});
if(window.Lenis){lenis=new Lenis({duration:1.1,autoRaf:false});
  if(window.gsap){gsap.ticker.add(function(t){if(!paused)lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0)}}
if(window.gsap&&window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);
  if(lenis)lenis.on('scroll',ScrollTrigger.update);
  gsap.to('.cq-plate',{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:'.cheque',start:'top 85%',end:'center 55%',scrub:true,invalidateOnRefresh:true}});
  gsap.from('.cq-num span',{yPercent:30,opacity:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:'.cq-num',start:'top 85%'}});
  gsap.utils.toArray('.num').forEach(function(n){gsap.from(n.querySelector('b'),{yPercent:40,opacity:0,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:n,start:'top 82%'}})});
  gsap.utils.toArray('.you-h span').forEach(function(s,i){gsap.from(s,{yPercent:60,opacity:0,duration:1,ease:'expo.out',delay:i*.12,scrollTrigger:{trigger:'.you-h',start:'top 80%'}})});
  gsap.utils.toArray('.do-list li').forEach(function(li){gsap.from(li,{y:40,opacity:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:li,start:'top 85%'}})});
  gsap.from('.talk-h',{yPercent:20,opacity:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:'.talk',start:'top 70%'}});
}
var pb=document.getElementById('pause');
pb.addEventListener('click',function(){paused=!paused;pb.textContent=paused?'Play':'Pause';pb.setAttribute('aria-pressed',paused);
  var all=[v].concat(vids);all.forEach(function(x){if(paused)x.pause();else if(x===v||x.src)x.play().catch(function(){})});
  if(window.gsap)paused?gsap.globalTimeline.pause():gsap.globalTimeline.resume()});
document.getElementById('toTop').addEventListener('click',function(e){e.preventDefault();lenis?lenis.scrollTo(0):scrollTo({top:0,behavior:'smooth'})});
document.querySelectorAll('a[href="#talk"]').forEach(function(a){a.addEventListener('click',function(e){if(lenis){e.preventDefault();lenis.scrollTo('#talk')}})});
})();
