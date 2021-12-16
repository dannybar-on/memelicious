'use strict';

let gMeme;

const gDefaults = {
  x: 250,
  y: 250,
  txt: 'Enter Text Here',
  size: 30,
  align: 'center',
  color: '#ffffff',
  stroke: '#000000',
  strokeWidth: 1,
  font: 'Impact',
};

function createMeme(id) {
  return {
    selectedImgId: id,
    selectedTextIdx: 0,
    texts: [createText(gDefaults)],
  };
}

function createText({ x, y, txt, size, align, color, stroke, strokeWidth, font }) {
  return {
    x,
    y,
    txt,
    size,
    align,
    color,
    stroke,
    strokeWidth,
    font,
  };
}

function getMeme() {
  return gMeme;
}

function selectImage(el) {
  gMeme = createMeme(+el.dataset.id);
}

function initEditor() {
  gGallery.classList.add('dn');
  gEditor.classList.remove('dn');
  gEditor.classList.add('df');
  gInput.value = gDefaults.txt;
}

function setText(text) {
  if (gMeme.selectedTextIdx === -1) return;

  gMeme.texts[gMeme.selectedTextIdx].txt = text;
}

function setFillColor(el) {
  if (gMeme.selectedTextIdx === -1) return;

  gMeme.texts[gMeme.selectedTextIdx].color = el.value;
}

function setStrokeColor(el) {
  if (gMeme.selectedTextIdx === -1) return;

  gMeme.texts[gMeme.selectedTextIdx].stroke = el.value;
}

function increaseFont() {
  if (gMeme.selectedTextIdx === -1) return;
  if (gMeme.texts[gMeme.selectedTextIdx].size > 75) return;

  gMeme.texts[gMeme.selectedTextIdx].size++;
}

function decreaseFont() {
  if (gMeme.selectedTextIdx === -1) return;
  if (gMeme.texts[gMeme.selectedTextIdx].size < 10) return;

  gMeme.texts[gMeme.selectedTextIdx].size--;
}

function alignText(type) {
  if (gMeme.selectedTextIdx === -1) return;

  switch (type) {
    case 'left':
      gMeme.texts[gMeme.selectedTextIdx].align = 'left';
      gMeme.texts[gMeme.selectedTextIdx].x = 0;
      break;
    case 'center':
      gMeme.texts[gMeme.selectedTextIdx].align = 'center';
      gMeme.texts[gMeme.selectedTextIdx].x = gCanvas.width / 2;
      break;
    case 'right':
      gMeme.texts[gMeme.selectedTextIdx].align = 'right';
      gMeme.texts[gMeme.selectedTextIdx].x = gCanvas.width;
      break;
  }
}

function selectFont(type) {
  if (gMeme.selectedTextIdx === -1) return;

  gMeme.texts[gMeme.selectedTextIdx].font = type.value;
  type.style.fontFamily = type.value;
}

function switchText() {
  if (gMeme.selectedTextIdx === -1) return;

  gMeme.selectedTextIdx = gMeme.selectedTextIdx === gMeme.texts.length - 1 ? 0 : gMeme.selectedTextIdx + 1;
  gInput.value = gMeme.texts[gMeme.selectedTextIdx].txt;
}

function addText() {
  if (gMeme.texts.length === 0) gInput.disabled = false;

  gInput.value = gDefaults.txt;
  gMeme.texts.push(createText(gDefaults));
  gMeme.selectedTextIdx++;
}

function removeText() {
  if (!gMeme.texts.length) return;

  gMeme.texts.splice(gMeme.selectedTextIdx, 1);

  if (gMeme.texts.length) {
    gMeme.selectedTextIdx = 0;
    gInput.value = gMeme.texts[gMeme.selectedTextIdx].txt;
  } else {
    gMeme.selectedTextIdx = -1;
    gInput.value = '';
    gInput.disabled = true;
  }
}
