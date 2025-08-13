(function(){
  // 오버레이 생성
  const overlay = document.createElement('div');
  overlay.className = 'image-zoom-overlay';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  const big = document.createElement('img');
  overlay.appendChild(big);

  function mount(){ if(!document.body.contains(overlay)) document.body.appendChild(overlay); }
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

  // 닫기 동작: 배경을 클릭해도, 큰 이미지를 클릭해도 닫힘
  overlay.addEventListener('click', closeZoom);
  big.addEventListener('click', closeZoom);

  // a.zoom 클릭을 "무조건" 가로챈다 (캡처 단계)
  document.addEventListener('click', function(e){
    // 휠/우클릭/중클릭 등은 기본 동작 유지 (새 탭 열기 등)
    if (e.button !== 0) return; // 왼쪽 버튼만
    const a = e.target.closest('a.zoom');
    if (!a) return;

    // Cmd/Ctrl 클릭(새 탭 열기)은 존중
    if (e.metaKey || e.ctrlKey) return;

    // 다른 핸들러보다 먼저 막는다
    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();

    const img = a.querySelector('img');
    const src = a.getAttribute('href') || (img ? img.src : '');
    openZoom(src, img ? img.alt : '');
  }, true); // ← 캡처 단계에서 가로챔
})();
