'use strict';

let gMeme;
let currID;

const gEditor = document.querySelector('.main-editor');
const gCanvas = document.querySelector('.main-canvas');
const gInput = document.querySelector('.main-input');
const gFont = document.querySelector('.main-font');
const gFooter = document.querySelector('.main-footer');
const gDownload = document.querySelector('.download');
const gDlLink = document.querySelector('.dl-link');
const gCtx = gCanvas.getContext('2d');

const gMouse = {
  x: 0,
  y: 0,
  isPressed: false,
};

const gDefaults = {
  x: 250,
  y: 250,
  txt: 'Enter Text Here',
  width: 0,
  size: 40,
  align: 'center',
  color: '#ffffff',
  stroke: '#000000',
  strokeWidth: 1,
  font: 'Impact',
  isActive: false,
  adjust: 0,
  sticker: '',
  isSticker: false,
};

function initEditor(el) {
  selectImage(el);
  loadEditor();
  renderMeme();
  setupEventListeners();
}

function selectImage(el) {
  const dsID = el.dataset.id;
  const memes = loadFromStorage(KEY_MEMES);

  let idx = -1;

  if (memes) {
    idx = findMatchingID(memes, dsID);
  }

  if (idx !== -1) {
    gMeme = memes[idx].gMeme;
    gMeme.selectedTextIdx = 0;
    currID = dsID;

    if (gMeme.texts[gMeme.selectedTextIdx].isSticker) {
      gInput.value = '';
      gInput.disabled = true;
    } else {
      gInput.value = gMeme.texts[gMeme.selectedTextIdx].txt;
      gInput.disabled = false;
    }
  } else {
    gMeme = createMeme(+el.dataset.id);
    currID = makeId();
    gInput.value = gDefaults.txt;
    gInput.disabled = false;
  }

  gMeme.texts[gMeme.selectedTextIdx].isActive = true;
}

function findMatchingID(db, id) {
  return db.findIndex((row) => row.id === id);
}

function createMeme(id) {
  return {
    selectedImgId: id,
    selectedTextIdx: 0,
    texts: [createText(gDefaults)],
  };
}

function createText({ x, y, txt, width, size, align, color, stroke, strokeWidth, font, isActive, adjust, sticker, isSticker }) {
  return {
    x,
    y,
    txt,
    width,
    size,
    align,
    color,
    stroke,
    strokeWidth,
    font,
    isActive,
    adjust,
    sticker,
    isSticker,
  };
}

function loadEditor() {
  gEditor.classList.remove('dn');
  gEditor.classList.add('df');
  gFooter.classList.add('active');

  updateActive();
}

function hideEditor() {
  gEditor.classList.remove('df');
  gEditor.classList.add('dn');
  gFooter.classList.remove('active');
}

function renderMeme() {
  const memeImg = new Image();

  memeImg.src = `img/memes/${gMeme.selectedImgId}.jpg`;
  memeImg.onload = () => {
    gCtx.drawImage(memeImg, 0, 0);
    gMeme.texts.forEach((text) => {
      const { txt, size, align, color, strokeWidth, stroke, x, y, font, isActive, sticker, isSticker } = text;

      if (isSticker) {
        const s = new Image();

        if (isActive) {
          let newX;

          switch (align) {
            case 'left':
              newX = x;
              break;
            case 'center':
              newX = x - text.width / 2;
              break;
            case 'right':
              newX = x - text.width;
              break;
          }

          gCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          gCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          gCtx.strokeRect(newX, y - size / 2, text.width, size);
          gCtx.fillRect(newX, y - size / 2, text.width, size);
        }

        let tX;

        switch (align) {
          case 'left':
            tX = 0;
            break;
          case 'center':
            tX = text.width / 2;
            break;
          case 'right':
            tX = text.width;
            break;
        }

        s.src = `img/ui/${sticker}.png`;
        gCtx.drawImage(s, x - tX, y - size / 2, text.width, size);
      } else {
        gCtx.font = `${size}px ${font}`;

        switch (font) {
          case 'Impact':
            text.adjust = size * 0.2;
            break;
          case 'Arial':
          case 'Georgia':
          case 'Verdana':
            text.adjust = size * 0.27692307692307692307692307692308;
            break;
          case 'Cambria':
            text.adjust = size * 0.33846153846153846153846153846154;
        }

        if (isActive) {
          let newX;

          switch (align) {
            case 'left':
              newX = x;
              break;
            case 'center':
              newX = x - gCtx.measureText(txt).width / 2 - 5;
              break;
            case 'right':
              newX = x - gCtx.measureText(txt).width - 10;
              break;
          }

          gCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          gCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          gCtx.strokeRect(newX, y - size, gCtx.measureText(txt).width + 10, size + text.adjust);
          gCtx.fillRect(newX, y - size, gCtx.measureText(txt).width + 10, size + text.adjust);
        }

        let tX;

        switch (align) {
          case 'left':
            tX = 5;
            break;
          case 'center':
            tX = 0;
            break;
          case 'right':
            tX = -5;
            break;
        }

        text.width = gCtx.measureText(txt).width + 10;

        gCtx.textAlign = align;
        gCtx.fillStyle = color;
        gCtx.strokeStyle = stroke;
        gCtx.lineWidth = strokeWidth;
        gCtx.strokeText(txt, x + tX, y);
        gCtx.fillText(txt, x + tX, y);
      }
    });
  };
}

function setupEventListeners() {
  gCanvas.addEventListener('mousemove', handleMouseMove, false);
  gCanvas.addEventListener('mousedown', handleMouseDown, false);
  gCanvas.addEventListener('mouseup', handleMouseUp, false);
}

function handleMouseMove(ev) {
  const rect = gCanvas.getBoundingClientRect();
  const x = ev.clientX - rect.left;
  const y = ev.clientY - rect.top;

  if (gMouse.isPressed) {
    gMeme.texts[gMeme.selectedTextIdx].x += x - gMouse.x;
    gMeme.texts[gMeme.selectedTextIdx].y += y - gMouse.y;
    gMouse.x = x;
    gMouse.y = y;
  }

  renderMeme();
}

function handleMouseDown(ev) {
  const rect = gCanvas.getBoundingClientRect();

  gMouse.x = ev.clientX - rect.left;
  gMouse.y = ev.clientY - rect.top;

  gMeme.selectedTextIdx = -1;
  gInput.value = '';
  gInput.disabled = true;
  gFont.value = gDefaults.font;
  gFont.style.fontFamily = gDefaults.font;

  for (let i = 0; i < gMeme.texts.length; i++) {
    if (getTextCollision(gMouse.x - 5, gMouse.y - 5, i)) {
      gMeme.selectedTextIdx = i;
      gInput.value = gMeme.texts[i].txt;
      gMouse.isPressed = true;
      gFont.value = gMeme.texts[i].font;
      gFont.style.fontFamily = gMeme.texts[i].font;

      if (gMeme.texts[i].isSticker) {
        gInput.value = '';
        gInput.disabled = true;
      } else {
        gInput.disabled = false;
      }
    }
  }

  updateActive();
  renderMeme();
}

function handleMouseUp() {
  gMouse.isPressed = false;
}

function getTextCollision(mX, mY, tIdx) {
  let newX;
  const t = gMeme.texts[tIdx];

  switch (t.align) {
    case 'left':
      newX = t.x;
      break;
    case 'center':
      newX = t.x - t.width / 2;
      break;
    case 'right':
      newX = t.x - t.width;
      break;
  }

  if (t.isSticker) return mX >= newX && mX <= newX + t.width && mY >= t.y - t.size / 2 && mY <= t.y + t.size / 2;
  else return mX >= newX && mX <= newX + t.width && mY >= t.y - t.size && mY <= t.y + t.adjust;
}

function updateActive() {
  for (let i = 0; i < gMeme.texts.length; i++) {
    gMeme.texts[i].isActive = i === gMeme.selectedTextIdx ? true : false;
  }

  if (gMeme.selectedTextIdx === -1) {
    gDownload.classList.remove('tooltip');
    gDlLink.classList.remove('disabled');
  } else {
    gDownload.classList.add('tooltip');
    gDlLink.classList.add('disabled');
  }
}

function setText(text) {
  if (gMeme.selectedTextIdx === -1) return;

  gMeme.texts[gMeme.selectedTextIdx].txt = text;
}

function switchText() {
  if (!gMeme.texts.length) return;

  gMeme.selectedTextIdx = gMeme.selectedTextIdx === gMeme.texts.length - 1 ? 0 : gMeme.selectedTextIdx + 1;
  gInput.value = gMeme.texts[gMeme.selectedTextIdx].txt;
  gFont.value = gMeme.texts[gMeme.selectedTextIdx].font;
  gFont.style.fontFamily = gMeme.texts[gMeme.selectedTextIdx].font;

  if (gMeme.texts[gMeme.selectedTextIdx].isSticker) {
    gInput.value = '';
    gInput.disabled = true;
  } else {
    gInput.disabled = false;
  }

  updateActive();
}

function addText() {
  if (gMeme.texts.length === 0) gInput.disabled = false;

  gInput.value = gDefaults.txt;
  gMeme.texts.push(createText(gDefaults));
  gMeme.selectedTextIdx = gMeme.texts.length - 1;
  gInput.disabled = false;
  gFont.value = gMeme.texts[gMeme.selectedTextIdx].font;
  gFont.style.fontFamily = gMeme.texts[gMeme.selectedTextIdx].font;

  updateActive();
}

function removeText() {
  if (!gMeme.texts.length || gMeme.selectedTextIdx === -1) return;

  gMeme.texts.splice(gMeme.selectedTextIdx, 1);

  if (gMeme.texts.length) {
    gMeme.selectedTextIdx = 0;
    gFont.value = gMeme.texts[gMeme.selectedTextIdx].font;
    gFont.style.fontFamily = gMeme.texts[gMeme.selectedTextIdx].font;

    if (gMeme.texts[gMeme.selectedTextIdx].isSticker) {
      gInput.value = '';
      gInput.disabled = true;
    } else {
      gInput.disabled = false;
      gInput.value = gMeme.texts[gMeme.selectedTextIdx].txt;
    }
  } else {
    gMeme.selectedTextIdx = -1;
    gInput.value = '';
    gInput.disabled = true;
    gFont.value = gDefaults.font;
    gFont.style.fontFamily = gDefaults.font;
  }

  updateActive();
}

function increaseFont() {
  if (gMeme.selectedTextIdx === -1) return;

  if (gMeme.texts[gMeme.selectedTextIdx].isSticker) {
    if (gMeme.texts[gMeme.selectedTextIdx].size >= 150) return;

    gMeme.texts[gMeme.selectedTextIdx].width += 5;
    gMeme.texts[gMeme.selectedTextIdx].size += 5;
  } else {
    if (gMeme.texts[gMeme.selectedTextIdx].size >= 75) return;

    gMeme.texts[gMeme.selectedTextIdx].size++;
  }
}

function decreaseFont() {
  if (gMeme.selectedTextIdx === -1) return;

  if (gMeme.texts[gMeme.selectedTextIdx].isSticker) {
    if (gMeme.texts[gMeme.selectedTextIdx].size <= 20) return;

    gMeme.texts[gMeme.selectedTextIdx].width -= 5;
    gMeme.texts[gMeme.selectedTextIdx].size -= 5;
  } else {
    if (gMeme.texts[gMeme.selectedTextIdx].size <= 10) return;

    gMeme.texts[gMeme.selectedTextIdx].size--;
  }
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

function selectFont(el) {
  if (gMeme.selectedTextIdx === -1) return (el.style.fontFamily = el.value);

  gMeme.texts[gMeme.selectedTextIdx].font = el.value;
  el.style.fontFamily = el.value;
}

function setFillColor(el) {
  if (gMeme.selectedTextIdx === -1) return;

  gMeme.texts[gMeme.selectedTextIdx].color = el.value;
}

function setStrokeColor(el) {
  if (gMeme.selectedTextIdx === -1) return;

  gMeme.texts[gMeme.selectedTextIdx].stroke = el.value;
}

function selectSticker(type) {
  const s = createText(gDefaults);

  switch (type) {
    case 'madaf':
      s.sticker = 'madaf';
      break;
    case 'lol':
      s.sticker = 'lol';
      break;
    case 'omg':
      s.sticker = 'omg';
      break;
    case 'fuckoff':
      s.sticker = 'fuckoff';
      break;
  }

  s.isSticker = true;
  s.width = 80;
  s.size = 80;
  gMeme.texts.push(s);
  gMeme.selectedTextIdx = gMeme.texts.length - 1;
  gInput.value = '';
  gInput.disabled = true;
  gFont.value = gMeme.texts[gMeme.selectedTextIdx].font;
  gFont.style.fontFamily = gMeme.texts[gMeme.selectedTextIdx].font;

  updateActive();
}

function saveMeme() {
  const memes = loadFromStorage(KEY_MEMES);
  const savedMemeImg = gCanvas.toDataURL('image/jpeg');
  const savedMeme = {
    id: currID,
    img: savedMemeImg,
    gMeme,
  };

  if (memes) {
    gMemes = memes;

    for (let i = 0; i < gMemes.length; i++) {
      if (gMemes[i].id === currID) {
        gMemes[i] = savedMeme;
        saveToStorage(KEY_MEMES, gMemes);
        return;
      }
    }
  }

  gMemes.push(savedMeme);
  saveToStorage(KEY_MEMES, gMemes);
}

function downloadMeme(el, ev) {
  if (gMeme.selectedTextIdx !== -1) ev.preventDefault();

  el.href = gCanvas.toDataURL();
  el.download = 'meme';
}
