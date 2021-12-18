'use strict';

let gMemes = [];
let gKeywords = [];
let gRandomKW = [];
let gFilterBy = '';

const gGallery = document.querySelector('.main-gallery');
const gSelection = document.querySelector('.selection');
const gMainMemes = document.querySelector('.main-memes');
const gSavedMemes = document.querySelector('.saved-memes');
const gMainAbout = document.querySelector('.main-about');

const gImages = [
  { id: 1, keywords: ['public figure', 'politics'] },
  { id: 2, keywords: ['dog', 'animals'] },
  { id: 3, keywords: ['baby', 'dog', 'animals', 'friendship'] },
  { id: 4, keywords: ['cat', 'animals'] },
  { id: 5, keywords: ['baby', 'reaction'] },
  { id: 6, keywords: ['explain', 'reaction'] },
  { id: 7, keywords: ['baby', 'reaction'] },
  { id: 8, keywords: ['explain', 'reaction'] },
  { id: 9, keywords: ['baby', 'reaction', 'evil'] },
  { id: 10, keywords: ['public figure', 'politics', 'laugh', 'reaction'] },
  { id: 11, keywords: ['love', 'kiss', 'tussle'] },
  { id: 12, keywords: ['what', 'reaction'] },
  { id: 13, keywords: ['celeb', 'actor', 'sexy'] },
  { id: 14, keywords: ['celeb', 'actor'] },
  { id: 15, keywords: ['celeb', 'actor'] },
  { id: 16, keywords: ['facepalm', 'reaction', 'celeb', 'actor'] },
  { id: 17, keywords: ['public figure', 'politics', 'madman'] },
  { id: 18, keywords: ['explain', 'reaction'] },
];

function renderGallery() {
  const fImgs = getFilteredImages();

  if (!fImgs.length) return (gSelection.innerHTML = 'Nothing found.');

  const string = fImgs.map(
    (image) =>
      `<img src="img/memes/${image.id}.jpg" data-id="${image.id}" onclick="onSelectedImage(this)" onmouseover="onImageHover(this, 'active')" onmouseout="onImageHover(this, 'unactive')" />`
  );

  gSelection.innerHTML = string.join('');
}

function renderMemes() {
  const memes = loadFromStorage(KEY_MEMES);

  if (!memes) return (gSavedMemes.innerHTML = 'No saved memes.');

  const string = memes.map(
    (meme) =>
      `<img src="${meme.img}" data-id="${meme.id}" onclick="onSelectedImage(this)" onmouseover="onImageHover(this, 'active')" onmouseout="onImageHover(this, 'unactive')" />`
  );

  gSavedMemes.innerHTML = string.join('');
}

function initGallery(ev) {
  ev.preventDefault();
  hideMemes();
  hideEditor();
  loadGallery();
}

function initMemes(ev) {
  ev.preventDefault();
  loadMemes(ev);
  renderMemes();
}

function initAbout(ev) {
  ev.preventDefault();
  gMainAbout.classList.remove('dn');
  gMainAbout.classList.add('df');
}

function hideAbout() {
  gMainAbout.classList.add('dn');
  gMainAbout.classList.remove('df');
}

function loadGallery() {
  gGallery.classList.remove('dn');
  document.body.classList.remove('unavailable');

  renderKeywords();

  if (gFilterBy === '') {
    document.querySelector('.search-input').value = '';
    renderGallery();
  }
}

function hideGallery() {
  gGallery.classList.add('dn');
}

function loadMemes(ev) {
  gMainMemes.classList.remove('dn');
  document.body.classList.remove('unavailable');
}

function hideMemes() {
  gMainMemes.classList.add('dn');
}

function serachKeyword(el) {
  gFilterBy = el.value;
}

function getFilteredImages() {
  if (gFilterBy === '') return gImages;

  return gImages.filter((fImg) => fImg.keywords.includes(gFilterBy));
}

function getKeywords() {
  const kw = [];

  gImages.forEach((img) => {
    img.keywords.forEach((keyword) => !kw.includes(keyword) && kw.push(keyword));
  });

  return kw;
}

function renderKeywords() {
  let string = '';
  const kw = getKeywords();
  const randomly = () => Math.random() - 0.5;
  const dynamicKeywords = [].concat(kw).sort(randomly);

  gKeywords = Array(5).fill({});

  gKeywords.forEach((t, i) => {
    gKeywords[i] = { keyword: dynamicKeywords[i], clicks: 0 };
    gKeywords[i].clicks = getRandomIntInclusive(0, 15);

    const fontSize = 12 + gKeywords[i].clicks;

    string += `<span class="keyword-click" style="font-size: ${fontSize}px" data-id="${i}" onclick="onClickKeyword(this)">${gKeywords[i].keyword}</span>`;
  });

  document.querySelector('.demo-data').innerHTML = string;
}

function renderAutoList() {
  const kw = getKeywords();
  const string = kw.map((keyword) => `<option value="${keyword}"></option>`);

  document.getElementById('auto-list').innerHTML = string.join('');
}

function setImageActive(el, type) {
  switch (type) {
    case 'active':
      gSelection.classList.add('selected');
      gSavedMemes.classList.add('selected');
      el.classList.add('active');
      break;
    case 'unactive':
      gSelection.classList.remove('selected');
      gSavedMemes.classList.remove('selected');
      el.classList.remove('active');
      break;
  }
}

function clickKeyword(el) {
  const currVal = document.querySelector('.search-input').value;

  if (gKeywords[+el.dataset.id].clicks <= 15) {
    gKeywords[+el.dataset.id].clicks++;
    el.style.fontSize = 12 + gKeywords[+el.dataset.id].clicks + 'px';
  }

  if (currVal !== gKeywords[+el.dataset.id].keyword) {
    document.querySelector('.search-input').value = '';
  }

  if (gFilterBy !== gKeywords[+el.dataset.id].keyword) {
    gFilterBy = gKeywords[+el.dataset.id].keyword;

    renderGallery();

    gFilterBy = '';
  }
}

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}
