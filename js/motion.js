// FUNCTION intro 글씨 깨지는 효과
const introMotion = () => {
  const bgItem = gsap.utils.toArray('.main-bg-item');
  const bgImg = gsap.utils.toArray('.main-bg-item img');

  const tl = gsap.timeline({
    repeatRefresh: true,
    onComplete: () => {
      bgItem.forEach((el) => el.classList.add('float'));
    },
  });

  tl.to(bgItem, { scale: 0.9, duration: 0.2 });
  tl.to(bgItem, { scale: 1, delay: 1, duration: 0.2 });
  tl.to(bgImg, { transform: `var(--move)`, duration: 0.3 });
};

const textRollMotion = () => {};

(function () {
  console.log('motion ready');
  introMotion();
})();
