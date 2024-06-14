// PARAM 랜덤 텍스트 아이템 타이머
let timer = null;

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

// FUNCTION 랜덤 수 구하는 함수
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

// FUNCTION 랜덤 텍스트 아이템
const onRandomizeText = () => {
  const textArr = document.querySelectorAll('.random-text');

  const weight = [100, 200, 700, 800];

  textArr.forEach((el) => {
    const filteredWeight = weight.filter(
      (wght) => wght !== el.style.fontVariationSettings
    );

    el.style.fontVariationSettings = `"wght" ${
      filteredWeight[getRandomInt(filteredWeight.length)]
    }`;
  });

  const windowWidth = window.innerWidth;

  console.log(windowWidth);

  // 텍스트 포지션 변경
  textArr.forEach((el, idx) => {
    const center = el.offsetParent.offsetWidth / 2 - el.offsetWidth / 2;
    const parentVw = (el.offsetParent.offsetWidth / windowWidth) * 100;
    const centerVw = (center / windowWidth) * 100;

    const pos = [0, `${centerVw}vw`, `calc(${parentVw}vw - 100%)`];
    const randomPos = pos[getRandomInt(pos.length)];

    if (![3, 4].includes(idx)) {
      // 인덱스가 3,4가 아닐 때
      el.style.transform = `translateX(${randomPos})`;
      console.log(randomPos);
    } else if (idx === 3) {
      const inner = document.querySelector('.random-text-inner');
      const parentVw = (inner.offsetParent.offsetWidth / windowWidth) * 100;
      const pos = [0, `calc(${parentVw}vw - 100%)`];
      const randomPos = pos[getRandomInt(pos.length)];

      inner.style.transform = `translateX(${randomPos})`;
    }
  });
};

(function () {
  const menuOpener = document.querySelector('.menu-opener');
  const mbMenuBtn = document.querySelector('.menu-close-btn-container');
  mbMenuBtn.addEventListener('click', onClickMenuBtn);
  menuOpener.addEventListener('click', onClickMenuBtn);

  onRandomizeText();
  timer = setInterval(onRandomizeText, 5000);
})();
