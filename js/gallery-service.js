'use strict';

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

function getImages() {
  return gImages;
}

function setImageActive(el, type) {
  switch (type) {
    case 'active':
      gSelection.classList.add('selected');
      el.classList.add('active');
      break;
    case 'unactive':
      gSelection.classList.remove('selected');
      el.classList.remove('active');
      break;
  }
}
