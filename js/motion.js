// PARAM selector
const mainTextRoller = document.querySelectorAll('.main-title-roller');

// FUNCTION 텍스트가 랜덤하게 롤링되는 모션
const textRollMotion = (selector, duration, repeat = 4) => {
  const tl = gsap.timeline({
    ease: 'ease.inOut',
  });

  tl.fromTo(selector, { opacity: 0 }, { opacity: 1 });
  selector.forEach((el, idx) => {
    tl.fromTo(
      el.children,
      {
        yPercent: -100,
      },
      {
        repeat: repeat,
        ease: 'none',
        yPercent: 0,
        duration: duration / repeat,
        delay: idx % 2 === 0 ? 0.15 : 0,
      },
      'slide'
    );
  });

  return tl;
};

// PARAM splittype 라인 옵션
const lineUpSplitOption = {
  types: 'lines, chars',
  tagName: 'span',
  lineClass: 'line-wrap',
  charClass: 'char',
};
// FUNCTION 한 줄씩 텍스트가 올라오는 모션
const lineUpMotion = (selector, duration, stagger) => {
  const target = document.querySelector(selector);

  const tl = gsap.timeline({
    repeatRefresh: true,
    stagger: stagger,
    ease: 'none',
  });
  const lines = target.querySelectorAll('.line-wrap');

  lines.forEach((el, idx) => {
    const chars = el.querySelectorAll('.char');
    tl.fromTo(
      chars,
      { yPercent: () => 100 },
      {
        yPercent: () => 0,
        duration: duration,
        onComplete: () => {
          el.style.overflow = 'unset';
        },
      },
      `-=${duration - 0.05}`
    );
  });

  return tl;
};

// FUNCTION intro 글씨 깨지는 효과
const introMotion = () => {
  const bgItem = gsap.utils.toArray('.main-bg-item');
  const bgImg = gsap.utils.toArray('.main-bg-item img');
  const subText = gsap.utils.toArray('.main-sub-text');
  const bottomText = new SplitType('.main-bottom-text', lineUpSplitOption);

  const tl = gsap.timeline({
    repeatRefresh: true,
  });
  // 이미지 페이드인
  tl.fromTo(
    bgItem,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.3,
      stagger: {
        amount: 1,
        from: 'random',
      },
    }
  );
  tl.to(bgItem, { scale: 0.9, duration: 0.5 });
  tl.to(
    bgItem,
    {
      scale: 1,
    },
    'move'
  );
  tl.to(
    bgImg,
    {
      transform: () => `var(--move)`,
      duration: 1.5,
      ease: 'ease.inOut',
      onComplete: () => {
        bgItem.forEach((el) => el.classList.add('float'));
      },
    },
    'move'
  );
  // 텍스트 롤링 애니메이션
  tl.add(textRollMotion(mainTextRoller, 1.2), 'move-=0.1');

  // 서브텍스트 출력
  tl.fromTo(
    subText,
    { opacity: 0 },
    {
      opacity: 1,
      stagger: 0.05,
      duration: 0.7,
      onComplete: () => {
        bgItem.forEach((el) => el.classList.add('float'));
      },
    },
    'sub'
  );
  tl.to(
    '.main-title-year',
    {
      opacity: 1,
      stagger: 0.05,
      duration: 0.3,
    },
    'sub'
  );

  // 헤더, 메뉴 표시하기
  tl.fromTo(
    '.header-inner',
    {
      yPercent: () => -100,
    },
    {
      yPercent: () => 0,
      transition: 0.3,
    },
    'header'
  );
  tl.fromTo(
    '.menu',
    {
      xPercent: () => -100,
    },
    {
      xPercent: () => 0,
      transition: 0.3,
      onComplete: () => {
        document.body.style.height = 'auto';
        document.body.style.overflowY = 'auto';
      },
    },
    'header'
  );

  tl.add(lineUpMotion('.main-bottom-text:first-child', 0.3, 0.01), 'header');
  tl.add(lineUpMotion('.main-bottom-text:nth-child(2)', 0.3, 0.01), 'header');
};

//  FUNCTION introduce 모션
const introduceMotion = () => {
  const descTl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      // trigger: '.intro',
      markers: true,
      // end: () => `+=${(introDesc.length + 1) * window.innerHeight}`,
    },
  });
  const descText = new SplitType('.introduce-desc', lineUpSplitOption);

  descTl.add(lineUpMotion('.introduce-desc:first-of-type', 0.35, 0));
  descTl.add(lineUpMotion('.introduce-desc:nth-of-type(2)', 0.35, 0));
};

(function () {
  console.log('motion ready');
  introMotion();
  introduceMotion();
})();
