// FUNCTION 특정 요소를 선택 후, 해당 요소 하위에 dom을 추가한다.
const insertDom = (selector, domArray) => {
  /** selector: 하위 요소를 추가할 dom, domArray: 추가할 하위 요소로 구성된 array  */
  const tag = document.querySelector(selector);
  for (let i = 0; i < domArray.length; i++) {
    tag.insertAdjacentHTML('beforeend', domArray[i]);
  }
};

// FUNCTION 메인 이미지 넣는 함수
const setMainBg = () => {
  const node = Array(25)
    .fill('')
    .map((el, idx) => {
      return `<div class='main-bg-item'><img src="assets/img/main/fragment-${
        idx + 1
      }.png" alt=""></div>`;
    });

  insertDom('.main-bg', node);
};

// FUNCTION glyph set 추가하는 함수
const setGlyphItem = () => {
  // prettier-ignore
  const glyphSet = ['!', '"', '#', '$', '%', ';', "'", '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', ';', '=', ';', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '\\', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', ';', '¡', '¢', '£', '¤', '¥', '¦', '§', '¨', '©', 'ª', '«', '¬', '®', '¯', '°', '±', '²', '³', '´', 'µ', '¶', '·', '¸', '¹', 'º', '»', '¼', '½', '¾', '¿', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', '×', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'Þ', 'ß', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', '÷', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'þ', 'Ā', 'ā', 'Ă', 'ă', 'Ą', 'ą', 'Ć', 'ć', 'Ĉ', 'ĉ', 'Ċ', 'ċ', 'Č', 'č', 'Ď', 'ď', 'Đ', 'đ', 'Ē', 'ē', 'Ė', 'ė', 'Ę', 'ę', 'Ě', 'ě', 'Ĝ', 'ĝ', 'Ğ', 'ğ', 'Ġ', 'ġ', 'Ģ', 'ģ', 'Ĥ', 'ĥ', 'Ħ', 'ħ', 'Ĩ', 'ĩ', 'Ī', 'ī', 'Į', 'į', 'İ', 'ı', 'Ĳ', 'ĳ', 'Ĵ', 'ĵ', 'Ķ', 'ķ', 'Ĺ', 'ĺ', 'Ļ', 'ļ', 'Ľ', 'ľ', 'Ŀ', 'ŀ', 'Ł', 'ł', 'Ń', 'ń', 'Ņ', 'ņ', 'Ň', 'ň', 'Ŋ', 'ŋ', 'Ō', 'ō', 'Ő', 'ő', 'Œ', 'œ', 'Ŕ', 'ŕ', 'Ŗ', 'ŗ', 'Ř', 'ř', 'Ś', 'ś', 'Ŝ', 'ŝ', 'Ş', 'ş', 'Š', 'š', 'Ţ', 'ţ', 'Ť', 'ť', 'Ŧ', 'ŧ', 'Ũ', 'ũ', 'Ū', 'ū', 'Ŭ', 'ŭ', 'Ů', 'ů', 'Ű', 'ű', 'Ų', 'ų', 'Ŵ', 'ŵ', 'Ŷ', 'ŷ', 'Ÿ', 'Ź', 'ź', 'Ż', 'ż', 'Ž', 'ž', 'Ə', 'ƒ', 'Ǧ', 'ǧ', 'Ǽ', 'ǽ', 'Ǿ', 'ǿ', 'Ș', 'ș', 'Ț', 'ț', 'ȷ', 'ə', 'ˆ', 'ˇ', '˘', '˙', '˚', '˛', '˜', '˝', '>̀', '>́', '>̂', '>̃', '>̄', '>̆', '>̇', '>̈', '>̊', '>̋', '>̌', '>̒', '>̦', '>̧', '>̨', 'Δ', 'Ω', 'μ', 'π', 'Ẁ', 'ẁ', 'Ẃ', 'ẃ', 'Ẅ', 'ẅ', 'ẞ', 'Ẽ', 'ẽ', 'Ỳ', 'ỳ', 'Ỹ', 'ỹ', '–', '—', '‘', '’', '‚', '“', '”', '„', '†', '‡', '•', '…', '‰', '′', '″', '‹', '›', '‽', '⁄', '⁰', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉', '€', '₹', '₺', '₿', 'ℓ', '№', '℗', '™', '℮', '⅛', '⅜', '⅝', '⅞', '←', '↑', '→', '↓', '↔', '↕', '↖', '↗', '↘', '↙', '∂', '∆', '∏', '∑', '−', '∙', '√', '∞', '∫', '≈', '≠', '≤', '≥', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⓪', '◊', '○', '●', '✳', '❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾', '【', '】', '〖', '〗', 'ﬁ', 'ﬂ'];
  const glyphNode = glyphSet.map((el, idx) => {
    return `<li class="glyph-item">${el}</li>`;
  });

  insertDom('.glyph-list', glyphNode);
};

(function () {
  setMainBg();
  setGlyphItem();
})();
