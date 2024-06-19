// PARAM selector
const mainTextRoller = document.querySelectorAll('.main .roller');
const visualTextRoller = document.querySelectorAll('.visual-text-roller');

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
  types: 'lines, words',
  tagName: 'span',
  lineClass: 'line-wrap',
  wordClass: 'char',
};
// PARAM lineup 트리거 옵션
const lineUpTriggerOption = (triggerSelector) => {
  return {
    repeatRefresh: true,
    scrollTrigger: {
      trigger: triggerSelector,
      start: () => 'center bottom',
      invalidateOnRefresh: true,
    },
  };
};
// FUNCTION 한 줄씩 텍스트가 올라오는 모션
const lineUpMotion = (selector, option) => {
  /** option: stagger, trigger, duration */
  let target;
  if (typeof selector === 'string') {
    target = document.querySelector(selector);
  } else {
    target = selector;
  }

  const tl = gsap.timeline({
    repeatRefresh: true,
    stagger: option.stagger,
    ease: 'none',
    // scrollTrigger: option.trigger,
    // markers: true,
  });
  const lines = target.querySelectorAll('.line-wrap');

  lines.forEach((el, idx) => {
    const chars = el.querySelectorAll('.char');
    tl.fromTo(
      chars,
      { yPercent: () => 100 },
      {
        yPercent: () => 0,
        duration: option.duration,
        onComplete: () => {
          el.style.overflow = 'unset';
        },
      },
      `-=${option.duration - 0.05}`
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
      stagger: 0.1,
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
      // 헤더, 메뉴 표시하기
      onComplete: () => {
        const header = document.querySelector('.header-inner');
        const menu = document.querySelector('.menu');

        header.classList.remove('inactive');
        menu.classList.remove('inactive');
      },
    },
    'sub'
  );

  tl.add(
    lineUpMotion('.main-bottom-text:first-child', {
      duration: 0.3,
      stagger: 0.01,
    }),
    'sub'
  );
  tl.add(
    lineUpMotion('.main-bottom-text:nth-child(2)', {
      duration: 0.3,
      stagger: 0.01,
    }),
    'sub'
  );
};

//  FUNCTION introduce 모션
const introduceMotion = () => {
  const descTl = gsap.timeline(lineUpTriggerOption('.introduce-desc'));
  const descText = new SplitType('.introduce-desc', lineUpSplitOption);
  descTl.add(
    lineUpMotion('.introduce-desc:first-of-type', {
      duration: 0.35,
      stagger: 0.05,
      trigger: '.introduce-desc:first-of-type',
    })
  );
  descTl.add(
    lineUpMotion('.introduce-desc:nth-of-type(2)', {
      duration: 0.35,
      stagger: 0.05,
      trigger: '.introduce-desc:nth-of-type(2)',
    })
  );
  const infoText = new SplitType('.introduce-info-text', lineUpSplitOption);
  const infoTl = gsap.timeline({
    ...lineUpTriggerOption('.introduce-info-text'),
    onComplete: () => {
      infoText.revert();
      console.log(infoText);
      console.log('remove');
    },
  });
  infoTl
    .add(
      lineUpMotion('.introduce-info-text:first-of-type', {
        duration: 0.35,
        stagger: 0.02,
        trigger: '.introduce-info-text:first-of-type',
      })
    )
    .add(
      lineUpMotion('.introduce-info-text:nth-of-type(2)', {
        duration: 0.35,
        stagger: 0.02,
        trigger: '.introduce-info-text:nth-of-type(2)',
      })
    );

  const specText = new SplitType('.spec-cate,.spec-desc', lineUpSplitOption);
  const specTl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: '.introduce-info-img',
      start: () => 'start bottom',
      invalidateOnRefresh: true,
    },
  });
  specTl.fromTo(
    '.introduce-info-img',
    {
      opacity: 0,
      y: () => `5%`,
    },
    {
      opacity: 1,
      y: () => `0`,
      duration: 1,
      ease: 'power4.inOut',
      onComplete: () => {
        const spec = document.querySelector('.spec');
        console.log(spec);
        spec.classList.add('active');
        console.log(spec);
      },
    },
    'img'
  );
  specTl.add(
    lineUpMotion('.spec', {
      duration: 0.5,
      stagger: 0.1,
      trigger: '.spec',
    }),
    'img-=0.1'
  );
};

// FUNCTION visual 모션
const visualMotion = () => {
  const visualTextRoller = document.querySelectorAll('.visual .roller');
  const textTl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: '.visual',
    },
  });

  // 텍스트 롤링 애니메이션
  textTl.add(textRollMotion(visualTextRoller, 1));

  const visualBg = gsap.utils.toArray('.visual-overlay img');
  const visualTl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: '.visual',
      start: () => `top top`,
      scrub: 0.5,
    },
  });

  // 배경 이미지 페이드인
  visualTl.fromTo(
    visualBg[0],
    {
      x: `50%`,
      y: `-25%`,
      rotate: 20,
      opacity: 0,
    },
    { x: `0`, y: `0`, rotate: 0, opacity: 1, duration: 1.5 },
    'fade-in'
  );
  visualTl.fromTo(
    visualBg[1],
    {
      x: `-25%`,
      y: `-100%`,
      rotate: -30,
      opacity: 0,
    },
    { x: `0`, y: `0`, rotate: 0, opacity: 1, duration: 1.5 },
    'fade-in'
  );
  visualTl.fromTo(
    visualBg[2],
    {
      x: `-50%`,
      y: `15%`,
      rotate: -45,
      opacity: 0,
    },
    { x: `0`, y: `0`, rotate: 0, opacity: 1, duration: 1.5 },
    'fade-in'
  );

  // 배경 이미지 페이드아웃
  visualTl.to(
    visualBg[0],
    { x: `15%`, y: `-100%`, opacity: 0, duration: 2 },
    'fade-in+=2.5'
  );
  visualTl.to(
    visualBg[1],
    { x: `-15%`, y: `60%`, opacity: 0, duration: 2 },
    'fade-in+=2.5'
  );
  visualTl.to(
    visualBg[2],
    { x: `-15%`, y: `60%`, opacity: 0, duration: 2 },
    'fade-in+=2.5'
  );

  visualTl.to('.visual', { opacity: 0, duration: 0 }, '-=1');
};

// FUNCTION language 모션
const languageMotion = () => {
  // 언어 목록 모션
  const langTl = gsap.timeline(lineUpTriggerOption('.introduce-desc'));
  const langList = gsap.utils.toArray('.language-list');
  const langText = new SplitType(langList, {
    types: 'chars, words',
    tagName: 'div',
    wordClass: 'line-wrap',
    charClass: 'char',
  });
  langList.forEach((list, idx) => {
    console.log(list);
    langTl.add(
      lineUpMotion(list, {
        duration: 0.3,
        stagger: 0.01,
      }),
      'lang'
    );
  });

  // 스크롤 시 font-weight가 변화하는 모션
  const weightTl = gsap.timeline({
    //repeatRefresh: true,
    scrollTrigger: {
      trigger: '.special-text',
      start: () => 'top bottom',
      end: () => 'bottom top',
      invalidateOnRefresh: true,
      markers: true,
      scrub: 0.3,
    },
  });

  weightTl.fromTo(
    '.special-text',
    {
      fontVariationSettings: `"wght" ${100}`,
    },
    {
      fontVariationSettings: `"wght" ${900}`,
    }
  );
};

(function () {
  console.log('motion ready');
  introMotion();
  introduceMotion();
  visualMotion();
  languageMotion();
})();
