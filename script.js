const total = 19;
let index = 0;
const image = document.getElementById('slideImage');
const current = document.getElementById('current');
const totalEl = document.getElementById('total');
const fill = document.getElementById('progressFill');
const overview = document.getElementById('overview');
totalEl.textContent = String(total).padStart(2,'0');

function showSlide(n){
  index = Math.max(0, Math.min(total-1, n));
  const file = `slides/slide-${String(index+1).padStart(2,'0')}.png`;
  image.src = file;
  image.alt = `Diapositiva ${index+1} de ${total}`;
  current.textContent = String(index+1).padStart(2,'0');
  fill.style.width = `${((index+1)/total)*100}%`;
  document.querySelectorAll('.thumb').forEach((el,i)=>el.classList.toggle('active',i===index));
  document.getElementById('prevBtn').disabled = index===0;
  document.getElementById('nextBtn').disabled = index===total-1;
}
function buildOverview(){
  overview.innerHTML='';
  for(let i=0;i<total;i++){
    const b=document.createElement('button'); b.className='thumb';
    const im=document.createElement('img'); im.src=`slides/slide-${String(i+1).padStart(2,'0')}.png`; im.alt='';
    const label=document.createElement('span'); label.textContent=`Diapositiva ${i+1}`;
    b.append(im,label); b.addEventListener('click',()=>{showSlide(i);overview.classList.add('hidden')});
    overview.append(b);
  }
}
function toggleOverview(){overview.classList.toggle('hidden')}
document.getElementById('prevBtn').addEventListener('click',()=>showSlide(index-1));
document.getElementById('nextBtn').addEventListener('click',()=>showSlide(index+1));
document.getElementById('prevText').addEventListener('click',()=>showSlide(index-1));
document.getElementById('nextText').addEventListener('click',()=>showSlide(index+1));
document.getElementById('overviewBtn').addEventListener('click',toggleOverview);
document.getElementById('fullscreenBtn').addEventListener('click',()=>{if(!document.fullscreenElement)document.documentElement.requestFullscreen?.();else document.exitFullscreen?.()});
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key==='PageDown'){overview.classList.add('hidden');showSlide(index+1)}
  if(e.key==='ArrowLeft'||e.key==='PageUp'){overview.classList.add('hidden');showSlide(index-1)}
  if(e.key.toLowerCase()==='f'){if(!document.fullscreenElement)document.documentElement.requestFullscreen?.();else document.exitFullscreen?.()}
  if(e.key==='Escape')overview.classList.add('hidden');
});
let touchX=0;
document.getElementById('stage').addEventListener('touchstart',e=>touchX=e.changedTouches[0].screenX,{passive:true});
document.getElementById('stage').addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-touchX;if(Math.abs(dx)>55)showSlide(index+(dx<0?1:-1))},{passive:true});
buildOverview();showSlide(0);
