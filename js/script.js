// PARAM 랜덤 텍스트 아이템 타이머
let timer = null;

// PARAM sampler 관련 변수

const samplerResult = document.querySelector('.sampler-result'); // 결과
const samplerValue = document.querySelectorAll('[data-category]');
// PARAM 이벤트 리스너 부착 대상

const randomizeBtn = document.querySelector('.sans-to-serif-btn');
const glyphItem = document.querySelectorAll('.glyph-item');
const selector = document.querySelectorAll('.selector');
const glyphOption = document.querySelectorAll('.glyph .selector-option-btn');
const menuItem = document.querySelectorAll('.menu-item');
const samplerOption = document.querySelectorAll(
  '.sampler .sampler-btn, .sampler .selector-option-btn'
);
const samplerRange = document.querySelectorAll('.sampler .slider');

// FUNCTION header 메뉴 버튼 클릭 시 수행
const onClickMenuBtn = () => {
  const menuBtn = document.querySelectorAll('.menu-close-btn');
  const menu = document.querySelector('.menu');

  menu.classList.toggle('menu--open');
  menuBtn.forEach((el) => {
    el.classList.toggle('menu-close-btn--open');
  });
};

// FUNCTION nav menu 열렸을 때, body를 클릭하면 닫기
const onClickBody = (e) => {
  const menu = document.querySelector('.menu');
  const header = document.querySelector('.header');
  if (!menu.classList.contains('menu--open')) return;
  // 헤더 메뉴가 열려 있을 때
  if (!header.contains(e.target)) onClickMenuBtn();
};

// FUNCTION 랜덤 수 구하는 함수
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

// FUNCTION 랜덤 텍스트 애니메이션
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

  if (windowWidth < 700) return;
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
    } else if (idx === 3) {
      const inner = document.querySelector('.random-text-inner');
      const parentVw = (inner.offsetParent.offsetWidth / windowWidth) * 100;
      const pos = [0, `calc(${parentVw}vw - 100%)`];
      const randomPos = pos[getRandomInt(pos.length)];

      inner.style.transform = `translateX(${randomPos})`;
    }
  });
};

// FUNCTION 랜덤 텍스트 애니메이션 초기화
const onInitRandomizeText = () => {
  clearInterval(timer);
  onRandomizeText();
  timer = setInterval(onRandomizeText, 5000);
};

// FUNCTION glyph item hover시 실행
const onHoverGlyphItem = (e) => {
  const word = document.querySelector('.glyph-word');
  glyphItem.forEach((el) => {
    el.classList.remove('glyph-item--active');
  });
  e.currentTarget.classList.add('glyph-item--active');
  word.innerText = e.currentTarget.innerText;
};

// FUNCTION select 클릭 시 실행
const onClickSelector = (e) => {
  const wrap = e.currentTarget.parentElement;
  wrap.classList.toggle('selector-wrap--focus');
};
// FUNCTION glyph selector 클릭 시 폰트 변경
const onClickGlyphOption = (e) => {
  const wrap = e.currentTarget.parentElement.parentElement.parentElement;
  const data = e.currentTarget.dataset;
  const grid = document.querySelector('.glyph-grid');
  const selector = document.querySelector('#glyph-selector');

  wrap.classList.remove('selector-wrap--focus');
  grid.style.fontFamily = `'${data.family}', 'sans-serif'`;
  grid.style.fontVariationSettings = `"wght" ${data.weight}`;

  selector.innerText = data.text;
};

// FUNCTION font sampler selector 클릭 시 폰트 변경
const onClickSamplerOption = (e) => {
  const sampler = document.querySelector('.sampler');
  const data = e.currentTarget.dataset.family;
  const selector = document.querySelector('.sampler-selector');
  const tab = document.querySelectorAll('.sampler-btn');

  tab.forEach((el) => el.classList.remove('sampler-btn--active'));
  sampler
    .querySelector(`.sampler-btn[data-family='${data}']`)
    .classList.add('sampler-btn--active');

  sampler
    .querySelector('.selector-wrap')
    .classList.remove('selector-wrap--focus');

  selector.innerText = data;
  samplerResult.style.fontFamily = `'PP${data}', sans-serif`;
};

// FUNCTION sampler 결과 부분 데이터 바인딩
const setSamplerStyle = debounce(() => {
  const samplerRange = {
    size: `${document.querySelector('#size').value}px`,
    weight: `${document.querySelector('#weight').value}`,
    spacing: `${document.querySelector('#spacing').value}%`,
    height: `${document.querySelector('#height').value / 10}`,
  };
  console.log(samplerRange);
  samplerResult.style.fontSize = samplerRange.size;
  samplerResult.style.fontVariationSettings = `"wght" ${samplerRange.weight}`;
  samplerResult.style.letterSpacing = samplerRange.spacing;
  samplerResult.style.lineHeight = samplerRange.height;

  samplerValue.forEach((el) => {
    const category = el.dataset.category;
    el.innerText = samplerRange[category];
  });
}, 300);

const onChangeRange = () => {};

(function () {
  const menuOpener = document.querySelector('.menu-opener');
  const mbMenuBtn = document.querySelector('.menu-close-btn-container');
  mbMenuBtn.addEventListener('click', onClickMenuBtn);
  menuOpener.addEventListener('click', onClickMenuBtn);
  menuItem.forEach((el) => el.addEventListener('click', onClickMenuBtn));

  window.addEventListener('click', onClickBody);
  glyphItem.forEach((el) => {
    el.addEventListener('mouseenter', onHoverGlyphItem);
  });
  selector.forEach((el) => {
    el.addEventListener('click', onClickSelector);
  });
  glyphOption.forEach((el) => {
    el.addEventListener('click', onClickGlyphOption);
  });
  samplerOption.forEach((el) => {
    el.addEventListener('click', onClickSamplerOption);
  });
  samplerRange.forEach((el) => {
    el.addEventListener('change', setSamplerStyle);
  });

  onInitRandomizeText();
  setSamplerStyle();

  randomizeBtn.addEventListener('click', onInitRandomizeText);
})();
