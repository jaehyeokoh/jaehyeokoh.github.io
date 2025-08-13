<script>
(function(){
  const overlay=document.createElement('div');
  overlay.className='image-zoom-overlay';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  const big=document.createElement('img');
  overlay.appendChild(big);

  function mount(){ if(!document.body.contains(overlay)) document.body.appendChild(overlay); }
  document.addEventListener('DOMContentLoaded', mount);

  function openZoom(src,alt){
    big.src=src; big.alt=alt||'';
    overlay.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closeZoom(){
    overlay.classList.remove('open');
    big.removeAttribute('src');
    document.body.style.overflow='';
  }

  // 배경 클릭/ESC로 닫기
  overlay.addEventListener('click',e=>{ if(e.target===overlay) closeZoom(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeZoom(); });

  // a.zoom 클릭 시 확대
  document.addEventListener('click',e=>{
    const a=e.target.closest('a.zoom');
    if(!a) return;
    const img=a.querySelector('img');
    e.preventDefault();
    const src=a.getAttribute('href') || img?.src;
    openZoom(src, img?.alt);
  }, {passive:false});
})();
</script>
