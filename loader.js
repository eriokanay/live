(function () {
  var MIN_TIME = 1800;  // tempo mínimo na tela (ms), pra dar tempo de ver o personagem andar
  var MAX_TIME = 8000;  // segurança: depois disso a tela some mesmo se algo travar

  var loader  = document.getElementById('loader');
  if (!loader) return;

  var fill    = document.getElementById('loadFill');
  var percent = document.getElementById('loadPercent');
  var char    = document.getElementById('loadChar');

  // se o gif não carregar, mostra uma bolinha no lugar
  char.addEventListener('error', function () {
    char.removeAttribute('src');
    char.classList.add('fallback');
  });

  var start = Date.now();
  var pageLoaded = document.readyState === 'complete';
  var shown = 0;

  window.addEventListener('load', function () { pageLoaded = true; });

  function render(p) {
    fill.style.width = p + '%';
    char.style.left = p + '%';
    percent.textContent = Math.round(p) + '%';
  }

  function tick() {
    var elapsed = Date.now() - start;

    // sobe até 90% com o tempo; só chega em 100% quando a página terminou de carregar
    var target = Math.min(90, (elapsed / MIN_TIME) * 90);
    if ((pageLoaded && elapsed >= MIN_TIME) || elapsed >= MAX_TIME) target = 100;

    // suaviza o movimento
    shown += (target - shown) * 0.12;
    if (target - shown < 0.3) shown = target;
    render(shown);

    if (shown >= 100) {
      setTimeout(function () {
        loader.classList.add('hide');
        setTimeout(function () { loader.remove(); }, 600);
      }, 300);
      return;
    }
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
