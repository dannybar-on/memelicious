'use strict';

let gMemes = [];

const gGallery = document.querySelector('.main-gallery');
const gSelection = document.querySelector('.selection');
const gMainMemes = document.querySelector('.main-memes');
const gSavedMemes = document.querySelector('.saved-memes');

const gImages = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
  { id: 15 },
  { id: 16 },
  { id: 17 },
  { id: 18 },
];

function renderGallery() {
  const string = gImages.map(
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

function loadGallery() {
  gGallery.classList.remove('dn');
}

function hideGallery() {
  gGallery.classList.add('dn');
}

function loadMemes(ev) {
  gMainMemes.classList.remove('dn');
}

function hideMemes() {
  gMainMemes.classList.add('dn');
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
