'use strict';

function onInit() {
  renderGallery();
  renderKeywords();
  renderAutoList();
}

function onInitGallery(ev) {
  initGallery(ev);
}

function onInitMemes(ev) {
  hideGallery();
  hideEditor();
  initMemes(ev);
}

function onInitAbout(ev) {
  initAbout(ev);
}

function onHideAbout() {
  hideAbout();
}

function onSearchKeyword(el) {
  serachKeyword(el);
  renderGallery();
}

function onSelectedImage(el) {
  hideMemes();
  hideGallery();
  initEditor(el);
}

function onImageHover(el, type) {
  setImageActive(el, type);
}

function onClickKeyword(el) {
  clickKeyword(el);
}

function onToggleMenu() {
  toggleMenu();
}
