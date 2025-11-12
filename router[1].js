import { render } from './templates.js';

const routes = {
  '/': () => import('./home.js'),
  '/cadastro': () => import('./cadastro.js'),
  '/sobre': () => import('./about.js'),
};

function parseLocation() {
  const hash = location.hash.replace('#', '') || '/';
  return hash;
}

export async function initRouter() {
  window.addEventListener('hashchange', router);
  document.addEventListener('click', onNavClick);
  await router();
}

async function router() {
  const path = parseLocation();
  const loader = routes[path] || routes['/'];
  const mod = await loader();
  const content = await mod.default();
  render(content);
}

function onNavClick(e) {
  const a = e.target.closest('a[data-link]');
  if (!a) return;
  e.preventDefault();
  location.hash = a.getAttribute('href');
}
