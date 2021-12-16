'use strict';

const gGallery = document.querySelector('.main-gallery');
const gSelection = document.querySelector('.selection');

function onInit() {
  onRenderGallery();
}

function onRenderGallery() {
  const images = getImages();
  const string = images.map(
    (image) =>
      `<img src="img/memes/${image.id}.jpg" data-id="${image.id}" onclick="onSelectedImage(this)" onmouseover="onImageHover(this, 'active')" onmouseout="onImageHover(this, 'unactive')" />`
  );

  gSelection.innerHTML = string.join('');
}

function onSelectedImage(el) {
  selectImage(el);
  initEditor();
  onRenderMeme();
}

function onImageHover(el, type) {
  setImageActive(el, type);
}
