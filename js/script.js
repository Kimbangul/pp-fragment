// PARAM 랜덤 텍스트 아이템 타이머
let timer = null;
let slideTimer = null;

// PARAM sampler 관련 변수
const samplerResult = document.querySelector('.sampler-result'); // 결과
const samplerValue = document.querySelectorAll('[data-category]');

// PARAM 이미지 슬라이드 관련 변수
const slideBg = document.querySelectorAll('.slide-bg-item');
const slideCard = document.querySelectorAll('.slide-card-item');
let slideIdx = {
  bg: -1,
  card: -1,
};
const slideBtn = document.querySelector('.use-btn');

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

  const weight = [100, 200, 400, 500, 600, 700, 800, 900];

  textArr.forEach((el) => {
    const filteredWeight = weight.filter(
      (wght) => wght !== el.style.fontVariationSettings
    );

    const newWeight = getRandomInt(filteredWeight.length);

    el.style.fontVariationSettings = `"wght" ${filteredWeight[newWeight]}`;

    const label = el.querySelectorAll('.random-text-label-item');
    const font = window.getComputedStyle(el).fontFamily.split(',');
    const getFontWeight = (weightNum) => {
      switch (weightNum) {
        case 100:
          return 'Thin';
        case 200:
          return 'Light';
        case 400:
          return 'Regular';
        case 500:
          return 'Medium';
        case 600:
          return 'Semi Bold';
        case 700:
          return 'Bold';
        case 800:
          return 'Extra Bold';
        case 900:
          return 'Black';
      }
    };

    label[1].innerText = `${font[0].replace('PP', '')} ${getFontWeight(
      filteredWeight[newWeight]
    )}`;
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
    size: document.querySelector('#size').value,
    weight: document.querySelector('#weight').value,
    spacing: parseInt(document.querySelector('#spacing').value) * 0.01,
    height: document.querySelector('#height').value / 10,
  };

  const resultValue = {
    size: `${document.querySelector('#size').value}px`,
    weight: `${document.querySelector('#weight').value}`,
    spacing: `${document.querySelector('#spacing').value}%`,
    height: `${Number(samplerRange.height * samplerRange.size).toFixed(0)}px`,
  };

  samplerResult.style.fontSize = resultValue.size;
  samplerResult.style.fontVariationSettings = `"wght" ${samplerRange.weight}`;
  samplerResult.style.letterSpacing = `${samplerRange.spacing}em`;
  samplerResult.style.lineHeight = resultValue.height;

  samplerValue.forEach((el) => {
    const category = el.dataset.category;
    el.innerText = resultValue[category];
  });
  setSamplerHeight();
}, 100);

const setSamplerHeight = () => {
  samplerResult.style.height = 'auto';
  samplerResult.style.height = `${samplerResult.scrollHeight}px`;
};

// FUNCTION  fragments in use slide 부분
const setSlideImg = () => {
  const tl = gsap.timeline({
    repeatRefresh: true,
  });
  let activeCard = document.querySelector('.slide-card-item.active');
  let activeBg = document.querySelector('.slide-bg-item.active');
  let nextCard =
    activeCard?.nextElementSibling ||
    document.querySelectorAll('.slide-card-item')[0];
  let nextBg =
    activeBg?.nextElementSibling ||
    document.querySelectorAll('.slide-bg-item')[0];

  /** 다음 슬라이드를 아래쪽으로 조정 */
  tl.set(nextCard, {
    y: () => `-50%`,
    scale: 0.8,
    repeatRefresh: true,
    duration: 0.7,
  });
  tl.set(nextBg, {
    y: () => `${window.innerHeight}px`,
    scale: 0.7,
    repeatRefresh: true,
  });

  /** 현재 활성화된 슬라이드가 있으면 위로 이동 */
  if (activeCard && activeBg) {
    tl.to(
      activeCard,
      {
        y: () => `-${window.innerHeight * 1.5}px`,
        duration: 1.5,
        repeatRefresh: true,
        ease: 'power1.inOut',
      },
      'prev-up'
    );
    tl.to(
      activeBg,
      {
        y: () => `-${window.innerHeight}px`,
        scale: 0.7,
        duration: 0.7,
        repeatRefresh: true,
        ease: 'power1.inOut',
      },
      'prev-up'
    );

    activeCard.classList.remove('active');
    activeBg.classList.remove('active');
  }

  /** 다음 슬라이드를 위로 이동 */
  tl.to(
    nextCard,
    {
      scale: 1,
      duration: 0.8,
      repeatRefresh: true,
    },
    'prev-up'
  );
  tl.to(
    nextBg,
    {
      y: () => 0,
      scale: 1,
      duration: 0.7,
      repeatRefresh: true,
      ease: 'power1.inOut',
    },
    'prev-up+=0.1'
  );

  nextCard.classList.add('active');
  nextBg.classList.add('active');
};

const onInitSlideImg = () => {
  clearInterval(slideTimer);
  setSlideImg();
  slideTimer = setInterval(setSlideImg, 5000);
};

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
  slideBtn.addEventListener('click', onInitSlideImg);

  window.addEventListener('resize', debounce(setSamplerHeight, 300));
  samplerResult.addEventListener('keydown', debounce(setSamplerHeight, 50));

  /** cursor */
  gsap.set('.cursor', { xPercent: -50, yPercent: -50 });

  const xTo = gsap.quickTo('.cursor', 'x', {
      duration: 0.05,
      ease: 'power3',
    }),
    yTo = gsap.quickTo('.cursor', 'y', {
      duration: 0.05,
      ease: 'power3',
    });

  window.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });
  /** cursor end */
})();
