// PARAM selector
const mainTextRoller = document.querySelectorAll('.main-title-roller');

const textRollMotion = (selector, duration, repeat = 4) => {
  const tl = gsap.timeline({
    ease: 'ease.inOut',
  });

  tl.fromTo(selector, { opacity: 0 }, { opacity: 1 });
  selector.forEach((el, idx) => {
    console.log(el.children);
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

// FUNCTION intro 글씨 깨지는 효과
const introMotion = () => {
  const bgItem = gsap.utils.toArray('.main-bg-item');
  const bgImg = gsap.utils.toArray('.main-bg-item img');
  const subText = gsap.utils.toArray('.main-sub-text');
  const bottomText = new SplitType('.main-bottom-text', {
    types: 'lines, chars',
    tagName: 'span',
    lineClass: 'line-wrap',
    charClass: 'char',
  });

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
    },
    'header'
  );

  const firstLine = [bottomText.lines[0], bottomText.lines[2]];
  const secondLine = [bottomText.lines[1], bottomText.lines[3]];
  const line = [...firstLine, ...secondLine];

  firstLine.forEach((el, idx) => {
    tl.fromTo(
      el.querySelectorAll('.char'),
      {
        yPercent: () => 100,
      },
      {
        yPercent: () => 0,
        duration: 0.2,
      }
    );
  }, 'first-line');
  secondLine.forEach((el, idx) => {
    tl.fromTo(
      el.querySelectorAll('.char'),
      {
        yPercent: () => 100,
      },
      {
        yPercent: () => 0,
        duration: 0.2,
      }
    );
  }, 'second-line');

  console.log(bottomText.chars);
  // tl.fromTo(bottomText.lines, {

  // })
};

(function () {
  console.log('motion ready');
  introMotion();
})();
