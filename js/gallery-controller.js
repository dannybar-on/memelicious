'use strict';

function onInit() {
  renderGallery();
}

function onInitGallery(ev) {
  initGallery(ev);
}

function onInitMemes(ev) {
  hideGallery();
  hideEditor();
  initMemes(ev);
}

function onSelectedImage(el) {
  hideMemes();
  hideGallery();
  initEditor(el);
}

function onImageHover(el, type) {
  setImageActive(el, type);
}
