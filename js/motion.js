// PARAM selector
const mainTextRoller = document.querySelectorAll('.main .roller');
const visualTextRoller = document.querySelectorAll('.visual-text-roller');

// FUNCTION 텍스트가 랜덤하게 롤링되는 모션
const textRollMotion = (selector, duration, repeat = 4) => {
  const tl = gsap.timeline({
    ease: 'power4.inOut',
  });

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
  tl.fromTo(
    selector,
    { opacity: 0 },
    { opacity: 1, duration: 1, delay: 1 },
    'slide-=0.4'
  );
  return tl;
};

// PARAM splittype 라인 옵션
const lineUpSplitOption = {
  types: 'lines, words',
  tagName: 'span',
  lineClass: 'line-wrap',
  wordClass: 'char',
};
const wordUpSplitOption = {
  types: 'chars, words',
  tagName: 'div',
  wordClass: 'line-wrap',
  charClass: 'char',
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
      duration: 0.15,
      ease: 'ease.inOut',
      stagger: {
        amount: 1,
        from: 'random',
      },
    }
  );
  tl.to(bgItem, { scale: 0.9, duration: 0.5, ease: 'power1.inOut' });
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
  tl.add(textRollMotion(mainTextRoller, 1), 'move-=0.5');

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
        spec.classList.add('active');
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

const sansToSerifMotion = () => {
  const textTl = gsap.timeline(lineUpTriggerOption('.random-text'));
  const randomText = new SplitType('.random-text', {
    types: 'chars',
    tagName: 'span',
    charClass: 'char',
  });
  const textArr = gsap.utils.toArray('.random-text');

  textArr.forEach((el, idx) => {
    const chars = el.querySelectorAll('.char');

    textTl.fromTo(
      chars,
      {
        y: () => `100%`,
      },
      {
        y: () => `0%`,
        delay: 0.5,
        stagger: 0.01,
        duration: 0.2,
        onComplete: () => {
          const lines = gsap.utils.toArray('.random-text-item');
          lines.forEach((el) => {
            el.style.overflow = 'unset';
          });
        },
      },
      'up'
    );
  });
};

// FUNCTION glyph 모션
const glyphMotion = () => {
  const textTl = gsap.timeline(lineUpTriggerOption('.glyph-text'));

  const glyphText = new SplitType('.glyph-text', lineUpSplitOption);
  textTl.add(
    lineUpMotion('.glyph-text', {
      duration: 0.35,
      stagger: 0.05,
      trigger: '.glyph-text',
    })
  );
};

// FUNCTION  slide 모션
const slideMotion = () => {
  const slideTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.use-slide',
      start: () => 'top center',
      invalidateOnRefresh: true,
    },
  });

  slideTl.fromTo(
    '.slide-card-item.active',
    {
      scale: 0.5,
    },
    {
      scale: 1,
      transition: 0.3,
      onComplete: () => {
        onInitSlideImg();
      },
    }
  );
};

// FUNCTION language 모션
const languageMotion = () => {
  // 언어 목록 모션
  const langTl = gsap.timeline(lineUpTriggerOption('.language-list'));
  const langList = gsap.utils.toArray('.language-list');
  const langText = new SplitType(langList, wordUpSplitOption);
  langList.forEach((list, idx) => {
    langTl.add(
      lineUpMotion(list, {
        duration: 0.5,
        stagger: 0.01,
      }),
      'lang'
    );
  });

  // bg 애니메이션
  const bg = gsap.utils.toArray('.special-bg-item');
  const bgImgMotion = (img, x, y) => {
    return gsap.fromTo(
      img,
      {
        x: () => x,
        y: () => y,
        opacity: 0,
      },
      {
        x: () => 0,
        y: () => 0,
        opacity: 1,
        scrollTrigger: {
          trigger: img,
          invalidateOnRefresh: true,
          scrub: 1,
        },
      }
    );
  };

  bgImgMotion(bg[0], '-20%', '20%');
  bgImgMotion(bg[1], '20%', '0%');
  bgImgMotion(bg[2], '0%', '15%');
  bgImgMotion(bg[3], '-20%', '15%');
  bgImgMotion(bg[4], '-0%', '50%');
  bgImgMotion(bg[5], '20%', '50%');

  // 스크롤 시 font-weight가 변화하는 모션
  const specialText = new SplitType('.special-text', lineUpSplitOption);
  const textTl = gsap.timeline(lineUpTriggerOption('.special-text'));
  textTl.add(
    lineUpMotion('.special-text', {
      duration: 0.3,
      stagger: 0.01,
    }),
    'line-up'
  );

  const weightTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.special-text',
      start: () => 'top bottom',
      end: () => 'bottom top',
      invalidateOnRefresh: true,
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

// FUNCTION purchase 모션
const purchaseMotion = () => {
  // 배경이미지 모션
  const bgTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.purchase',
      invalidateOnRefresh: true,
      scrub: 1,

      start: () => `top top`,
      end: () => `bottom bottom`,
    },
  });

  const purchaseBgItem = gsap.utils.toArray('.purchase-bg-item');
  const purchaseList = gsap.utils.toArray('.purchase-item');
  const bgImgMotion = (tl, img, x, y, rotate, timing) => {
    return tl.fromTo(
      img,
      {
        x: () => x,
        y: () => y,
        opacity: 0,
        rotate: `${rotate}deg`,
      },
      {
        x: () => 0,
        y: () => 0,
        opacity: 1,
        rotate: `0deg`,
      },
      timing
    );
  };
  // bg in
  bgImgMotion(bgTl, purchaseBgItem[0], '0%', '-25%', 0, 'fadein');
  bgImgMotion(bgTl, purchaseBgItem[1], '-25%', '-100%', 45, 'fadein');
  bgImgMotion(bgTl, purchaseBgItem[2], '50%', '-50%', -45, 'fadein');
  bgImgMotion(bgTl, purchaseBgItem[3], '-20%', '25%', -30, 'fadein');
  bgImgMotion(bgTl, purchaseBgItem[4], '30%', '-40%', -25, 'fadein');
  bgImgMotion(bgTl, purchaseBgItem[5], '20%', '50%', -20, 'fadein');

  bgTl.fromTo(purchaseList, {}, {});

  const item = document.querySelectorAll('.purchase-item');

  item.forEach((el, idx) => {
    bgTl.fromTo(
      el,
      {
        y: () => `100vh`,
      },
      {
        y: () => `0`,
        duration: 1,
        delay: 0.1 * idx,
      },
      'item-in'
    );
  });

  item.forEach((el, idx) => {
    bgTl.to(
      el,
      {
        y: () => `-100vh`,
        duration: 1,
        delay: 0.5 + 0.1 * idx,
      },
      'item-down'
    );
  });

  // itemTl.fromTo(
  //   '.purchase-item',
  //   {
  //     y: () => `100vh`,
  //   },
  //   {
  //     y: () => `0`,
  //   }
  // );

  // itemTl.to('.purchase-item', {
  //   y: () => `-100vh`,
  //   delay: 0.5,
  // });

  // bgTl.add(itemTl);
  // bg out
  const reverseTl = gsap.timeline({});
  bgImgMotion(reverseTl, purchaseBgItem[0], '0%', '-25%', 0, 'fadeout');
  bgImgMotion(reverseTl, purchaseBgItem[1], '-25%', '-100%', 45, 'fadeout');
  bgImgMotion(reverseTl, purchaseBgItem[2], '50%', '20%', 25, 'fadeout');
  bgImgMotion(reverseTl, purchaseBgItem[3], '-20%', '25%', 30, 'fadeout');
  bgImgMotion(reverseTl, purchaseBgItem[4], '30%', '-40%', 25, 'fadeout');
  bgImgMotion(reverseTl, purchaseBgItem[5], '-30%', '-5%', 20, 'fadeout');

  bgTl.add(reverseTl.reverse());
};

// FUNCTION credit 모션
const creditMotion = () => {
  const descTl = gsap.timeline(lineUpTriggerOption('.credits-desc'));
  const descText = new SplitType('.credits-desc', lineUpSplitOption);
  const descArr = gsap.utils.toArray('.credits-desc');

  const titleArr = gsap.utils.toArray('.credits-title');
  const titleText = new SplitType('.credits-title', wordUpSplitOption);

  const sectionTitle = new SplitType('.credits .sc-title', wordUpSplitOption);

  descTl.add(
    lineUpMotion('.credits .sc-title', {
      duration: 0.5,
      trigger: '.credits .sc-title',
    }),
    'sc-title'
  );

  titleArr.forEach((title) => {
    descTl.add(
      lineUpMotion(title, {
        duration: 0.5,
        trigger: '.credits-title',
      }),
      'title'
    );
  });

  const titleTl = gsap.timeline({
    ...lineUpTriggerOption('.credits-title'),
    onComplete: () => {
      const title = document.querySelectorAll('.credits-title');
      title.forEach((el) => {
        el.classList.add('active');
      });
    },
  });

  descTl.add(titleTl);

  descArr.forEach((desc) => {
    descTl.add(
      lineUpMotion(desc, {
        duration: 0.35,
        stagger: 0.05,
        trigger: '.credits-desc',
      }),
      'desc'
    );
  });
};

const footerMotion = () => {
  const footerTl = gsap.timeline({
    repeatRefresh: true,
    scrollTrigger: {
      trigger: '.footer',
      start: () => `top bottom`,
      end: () => `bottom bottom`,
      scrub: 0.5,
    },
  });

  footerTl.fromTo(
    '.footer-bg-glyph',
    {
      y: () => `15%`,
      scale: () => `0`,
      fontVariationSettings: `"wght" ${700}`,
    },
    {
      y: () => `0%`,
      scale: () => `2`,
      fontVariationSettings: `"wght" ${100}`,
    }
  );
};

(function () {
  introMotion();
  introduceMotion();
  visualMotion();
  sansToSerifMotion();
  glyphMotion();
  slideMotion();
  languageMotion();
  purchaseMotion();
  creditMotion();
  footerMotion();
})();
