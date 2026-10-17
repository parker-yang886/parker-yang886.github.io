document.addEventListener('DOMContentLoaded', function () {

  // ===== 滚动渐入 =====
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // ===== 数字滚动计数 =====
  function animateNum(el) {
    var target = parseInt(el.dataset.count, 10);
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    var dur = 1200, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var numEls = document.querySelectorAll('.skill-num[data-count]');
  if ('IntersectionObserver' in window && numEls.length) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateNum(e.target);
          io2.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    numEls.forEach(function (el) { io2.observe(el); });
  }

  // ===== 微信号点击复制（微信号确认后生效） =====
  var box = document.querySelector('.cta-wechat');
  var idEl = document.querySelector('.wechat-id');
  if (!box || !idEl) return;

  box.addEventListener('click', function () {
    var text = idEl.textContent.trim();
    if (text.indexOf('待确认') !== -1) return; // 占位状态不复制
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () {
        idEl.textContent = '已复制 ✓';
        setTimeout(function () { idEl.textContent = text; }, 1500);
      });
    }
  });
});
