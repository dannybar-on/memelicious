'use strict';

const gEditor = document.querySelector('.main-editor');
const gCanvas = document.querySelector('.main-canvas');
const gInput = document.querySelector('.main-input');
const gCtx = gCanvas.getContext('2d');

function onRenderMeme() {
  const meme = getMeme();
  const memeImg = new Image();

  memeImg.src = `img/memes/${meme.selectedImgId}.jpg`;
  memeImg.onload = () => {
    gCtx.drawImage(memeImg, 0, 0);
    onDrawText();
  };
}

function onDrawText() {
  const meme = getMeme();

  meme.texts.forEach((text) => {
    const { txt, size, align, color, strokeWidth, stroke, x, y, font } = text;

    gCtx.font = `${size}px ${font}`;
    gCtx.textAlign = align;
    gCtx.fillStyle = color;
    gCtx.strokeStyle = stroke;
    gCtx.lineWidth = strokeWidth;
    gCtx.strokeText(txt, x, y);
    gCtx.fillText(txt, x, y);
  });
}

function onSetText(el) {
  setText(el.value);
  onRenderMeme();
}

function onSetFillColor(el) {
  setFillColor(el);
  onRenderMeme();
}

function onSetStrokeColor(el) {
  setStrokeColor(el);
  onRenderMeme();
}

function onIncreaseFont() {
  increaseFont();
  onRenderMeme();
}

function onDecreaseFont() {
  decreaseFont();
  onRenderMeme();
}

function onAlignText(type) {
  alignText(type);
  onRenderMeme();
}

function onSelectFont(type) {
  selectFont(type);
  onRenderMeme();
}

function onSwitchText() {
  switchText();
  onRenderMeme();
}

function onAddText() {
  addText();
  onRenderMeme();
}

function onRemoveText() {
  removeText();
  onRenderMeme();
}
