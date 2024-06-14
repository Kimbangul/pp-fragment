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

  const distance = {
    max: Array.from(textArr).map((el, idx) => {
      return el.offsetParent.offsetWidth - el.offsetWidth;
    }),
    center: Array.from(textArr).map((el, idx) => {
      return el.offsetParent.offsetWidth / 2 - el.offsetWidth / 2;
    }),
  };
  const position = [
    ['0', '60vw', `${distance.center[0]}px`, `${distance.max[0]}px`],
    ['0', '60%', `${distance.max[1]}px`],
    ['0', `${distance.center[2]}px`, `${distance.max[2]}px`],
    ['0', `${distance.center[3]}px`],
    ['0', `${distance.max[4] - textArr[4].offsetLeft}px`],
    ['0', '40vw', `${distance.max[5]}px`],
    ['0', '25%', '50%', `${distance.max[6]}px`],
    ['0', '40%', '80%'],
  ];

  textArr.forEach((el, idx) => {
    // 텍스트 포지션 변경
    if (![3, 4].includes(idx)) {
      // 인덱스가 3,4가 아닐 떄
      const posArr = position[idx];
      const randomPos = getRandomInt(posArr.length);
      el.style.transform = `translateX(${posArr[randomPos]})`;
    } else if (idx === 3) {
      // 인덱스가 3일 떄
      const randomIdx = getRandomInt(2);
      console.log(textArr[3]);
      textArr[3].style.transform = `translateX(${position[3][randomIdx]})`;
      textArr[4].style.transform = `translateX(${position[4][randomIdx]})`;
    }
  });
};

(function () {
  const menuOpener = document.querySelector('.menu-opener');
  const mbMenuBtn = document.querySelector('.menu-close-btn-container');
  mbMenuBtn.addEventListener('click', onClickMenuBtn);
  menuOpener.addEventListener('click', onClickMenuBtn);

  onRandomizeText();
})();
