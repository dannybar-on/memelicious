'use strict';

let gMeme;

const gDefaults = {
  x: 225,
  y: 225,
  txt: 'Enter Text Here',
  size: 30,
  align: 'center',
  color: '#ffffff',
  stroke: '#000000',
  strokeWidth: 1,
};

function createMeme(id) {
  return {
    selectedImgId: id,
    selectedTextIdx: 0,
    texts: [createText(gDefaults)],
  };
}

function createText({ x, y, txt, size, align, color, stroke, strokeWidth }) {
  return {
    x,
    y,
    txt,
    size,
    align,
    color,
    stroke,
    strokeWidth,
  };
}

function getMeme() {
  return gMeme;
}

function selectImage(el) {
  gMeme = createMeme(+el.dataset.id);
}

function setText(text) {
  gMeme.texts[0].txt = text;
}

function setFillColor(el) {
  gMeme.texts[0].color = el.value;
}

function setStrokeColor(el) {
  gMeme.texts[0].stroke = el.value;
}

function increaseFont() {
  if (gMeme.texts[0].size > 75) return;

  gMeme.texts[0].size++;
}

function decreaseFont() {
  if (gMeme.texts[0].size < 10) return;

  gMeme.texts[0].size--;
}
