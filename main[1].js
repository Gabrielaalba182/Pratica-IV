import { initRouter } from './router.js';
import { setupGlobalHandlers } from './forms.js';

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  setupGlobalHandlers();
});
