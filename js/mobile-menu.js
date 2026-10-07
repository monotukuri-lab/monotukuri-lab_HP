// ハンバーガーメニューの制御
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('show');
  });
}

// 現在のページに対応するナビリンクを強調表示
document.querySelectorAll('.nav-desktop a, .nav-mobile a').forEach(function (link) {
  const url = new URL(link.getAttribute('href'), location.href);
  const normalize = function (p) { return p.replace(/index\.html$/, '').replace(/\/$/, ''); };
  if (normalize(url.pathname) === normalize(location.pathname)) {
    link.classList.add('current');
  }
});
