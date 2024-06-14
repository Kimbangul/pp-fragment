// FUNCTION header 메뉴 버튼 클릭 시 수행
const onClickMenuBtn = () => {
  const menuBtn = document.querySelectorAll('.menu-close-btn');
  const menu = document.querySelector('.menu');

  // menuBtn.classList.toggle('');
  menu.classList.toggle('menu--open');
  menuBtn.forEach((el) => {
    el.classList.toggle('menu-close-btn--open');
  });
};

(function () {
  const menuOpener = document.querySelector('.menu-opener');
  const mbMenuBtn = document.querySelector('.menu-close-btn-container');
  mbMenuBtn.addEventListener('click', onClickMenuBtn);
  menuOpener.addEventListener('click', onClickMenuBtn);
})();
