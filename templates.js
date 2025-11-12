export function render(htmlString) {
  const app = document.getElementById('app');
  app.innerHTML = htmlString;
  app.dispatchEvent(new CustomEvent('page:rendered'));
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
