'use strict';

const KEY_MEMES = 'memesDB';

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  const value = localStorage.getItem(key);

  return value === null ? false : JSON.parse(value);
}
