(function(){
  // 오버레이 만들기
  const overlay = document.createElement('div');
  overlay.className = 'image-zoom-overlay';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  const big = document.createElement('img');
  overlay.appendChild(big);

  function mount(){
    if(!document.body.contains(overlay)) document.body.appendChild(overlay);
  }
  if (document.readyState !== 'loading') mount();
  document.addEventListener('DOMContentLoaded', mount);

  function openZoom(src, alt){
    big.src = src;
    big.alt = alt || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeZoom(){
    overlay.classList.remove('open');
    big.removeAttribute('src');
    document.body.style.overflow = '';
  }

  // 닫기: 배경/이미지 클릭 시 — 전파를 중단해 아래 앵커로 내려가지 않게 함
  overlay.addEventListener('click', function(e){
    e.preventDefault(); e.stopPropagation();
    closeZoom();
  });
  big.addEventListener('click', function(e){
    e.preventDefault(); e.stopPropagation();
    closeZoom();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeZoom(); });

  // a.zoom 클릭을 "항상" 가로채서 페이지 이동을 막음 (캡처 단계)
  document.addEventListener('click', function(e){
    if (e.button !== 0) return;                   // 좌클릭만
    const a = e.target.closest('a.zoom');
    if (!a) return;
    if (e.metaKey || e.ctrlKey) return;           // 새 탭 열기 존중

    // 다른 핸들러보다 먼저 막는다
    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();

    const img = a.querySelector('img');
    const src = a.getAttribute('href') || (img ? img.src : '');
    openZoom(src, img ? img.alt : '');
  }, true); // 캡처 단계
})();
