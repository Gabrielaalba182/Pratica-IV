
// Acessibilidade e tema
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeBtn = document.getElementById('toggle-theme');
  const contrastBtn = document.getElementById('toggle-contrast');
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.dataset.theme = savedTheme;
  themeBtn.addEventListener('click', () => {
    const cur = body.dataset.theme === 'dark' ? 'light' : 'dark';
    body.dataset.theme = cur;
    localStorage.setItem('theme', cur);
  });
  contrastBtn.addEventListener('click', () => {
    const cur = body.dataset.theme === 'high' ? 'light' : 'high';
    body.dataset.theme = cur;
    localStorage.setItem('theme', cur);
  });
});
