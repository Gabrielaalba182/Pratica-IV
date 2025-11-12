const PREFIX = 'praticaIII_v1_';

export function save(key, value) {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

export function load(key, fallback = null) {
  const raw = localStorage.getItem(PREFIX + key);
  return raw ? JSON.parse(raw) : fallback;
}

export function remove(key) {
  localStorage.removeItem(PREFIX + key);
}
