const introMotion = () => {
  const tl = gsap.timeline({
    repeatRefresh: true,
    onComplete: () => {
      console.log('complete');
    },
  });
  const bgItem = gsap.utils.toArray('.main-bg-item');
  const bgImg = gsap.utils.toArray('.main-bg-item img');

  tl.to(bgItem, { scale: 0.9, duration: 0.2 });
  tl.to(bgItem, { scale: 1, delay: 1, duration: 0.2 });
  tl.to(bgImg, { transform: `var(--move)`, duration: 0.3 });
};

(function () {
  console.log('motion ready');
  introMotion();
})();
