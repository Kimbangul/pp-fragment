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
    return `<li class="glyph-item"><span  class="glyph-item-text">${el}</span></li>`;
  });

  insertDom('.glyph-list', glyphNode);
};

// FUNCTION language 추가하는 함수
const setLanguageList = () => {
  const languages = [
    [
      'Afrikaans',
      'Basque',
      'Breton',
      'Catalan',
      'Croatian',
      'Czech',
      'Danish',
      'Dutch',
      'English',
    ],
    [
      'Estonian',
      'Finnish',
      'French',
      'Gaelic',
      'German',
      'Hungarian',
      'Icelandic',
      'Indonesian',
      'Irish',
    ],
    [
      'Italian',
      'Latvian',
      'Lithuanian',
      'Norwegian',
      'Polish',
      'Portuguese',
      'Romanian',
      'Saami',
      'Serbian',
    ],
    [
      'Slovak',
      'Slovenian',
      'Spanish',
      'Swahili',
      'Swedish',
      'Turkish',
      '(And more)',
    ],
  ];
  const languageNode = languages.map((el, idx) => {
    return `<ul class="language-list">${el
      .map((lang) => `<li class="language-item">${lang}</li>`)
      .join('')}</ul>`;
  });

  insertDom('.language', languageNode);
};

// FUNCTION 버튼 글자 나누기
const setBtnTextSplit = () => {
  const splitWord = new SplitType('.btn-slide', {
    types: 'chars',
    tagName: 'span',
  });
  new SplitType('.purchase-item-text-slider', {
    types: 'chars, lines',
    tagName: 'span',
  });
};

// FUNCTION selector에 option 추가
const setSelectorOption = () => {
  const glyphOption = [
    { text: 'Sans Thin', fontFamily: 'sans', fontWeight: 100 },
    { text: 'Sans Extra Light', fontFamily: 'sans', fontWeight: 200 },
    { text: 'Sans Light', fontFamily: 'sans', fontWeight: 300 },
    { text: 'Sans Regular', fontFamily: 'sans', fontWeight: 400 },
    { text: 'Sans Medium', fontFamily: 'sans', fontWeight: 500 },
    { text: 'Sans Semi Bold', fontFamily: 'sans', fontWeight: 600 },
    { text: 'Sans Bold', fontFamily: 'sans', fontWeight: 700 },
    { text: 'Sans Extra Bold', fontFamily: 'sans', fontWeight: 800 },
    { text: 'Glare Thin', fontFamily: 'glare', fontWeight: 100 },
    { text: 'Glare Extra Light', fontFamily: 'glare', fontWeight: 200 },
    { text: 'Glare Light', fontFamily: 'glare', fontWeight: 300 },
    { text: 'Glare Regular', fontFamily: 'glare', fontWeight: 400 },
    { text: 'Glare Medium', fontFamily: 'glare', fontWeight: 500 },
    { text: 'Glare Semi Bold', fontFamily: 'glare', fontWeight: 600 },
    { text: 'Glare Bold', fontFamily: 'glare', fontWeight: 700 },
    { text: 'Glare Extra Bold', fontFamily: 'glare', fontWeight: 800 },
    { text: 'Serif Thin', fontFamily: 'serif', fontWeight: 100 },
    { text: 'Serif Extra Light', fontFamily: 'serif', fontWeight: 200 },
    { text: 'Serif Light', fontFamily: 'serif', fontWeight: 300 },
    { text: 'Serif Regular', fontFamily: 'serif', fontWeight: 400 },
    { text: 'Serif Medium', fontFamily: 'serif', fontWeight: 500 },
    { text: 'Serif Semi Bold', fontFamily: 'serif', fontWeight: 600 },
    { text: 'Serif Bold', fontFamily: 'serif', fontWeight: 700 },
    { text: 'Serif Extra Bold', fontFamily: 'serif', fontWeight: 800 },
    { text: 'Text Light', fontFamily: 'text', fontWeight: 300 },
    { text: 'Text Regular', fontFamily: 'text', fontWeight: 400 },
    { text: 'Text Medium', fontFamily: 'text', fontWeight: 500 },
    { text: 'Text Semi Bold', fontFamily: 'text', fontWeight: 600 },
  ];
  const glyphNode = glyphOption.map(
    (el) =>
      `<li class="selector-option-item"><button class="selector-option-btn" data-weight="${el.fontWeight}" data-family="${el.fontFamily}">${el.text}</button></li>`
  );

  insertDom('.glyph .selector-option', glyphNode);
};

(function () {
  setMainBg();
  setGlyphItem();
  setLanguageList();
  setBtnTextSplit();
  setSelectorOption();
})();
