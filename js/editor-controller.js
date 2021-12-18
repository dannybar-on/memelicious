'use strict';

function onSetText(el) {
  setText(el.value);
  renderMeme();
}

function onSwitchText() {
  switchText();
  renderMeme();
}

function onAddText() {
  addText();
  renderMeme();
}

function onRemoveText() {
  removeText();
  renderMeme();
}

function onIncreaseFont() {
  increaseFont();
  renderMeme();
}

function onDecreaseFont() {
  decreaseFont();
  renderMeme();
}

function onAlignText(type) {
  alignText(type);
  renderMeme();
}

function onSelectFont(el) {
  selectFont(el);
  renderMeme();
}

function onSetFillColor(el) {
  setFillColor(el);
  renderMeme();
}

function onSetStrokeColor(el) {
  setStrokeColor(el);
  renderMeme();
}

function onSelectSticker(type) {
  selectSticker(type);
  renderMeme();
}

function onClickSave() {
  saveMeme();
}

function onClickDownload(el, ev) {
  downloadMeme(el, ev);
}
