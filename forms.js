import { save, load } from './storage.js';

function createError(element, message) {
  let em = element.nextElementSibling;
  if (!em || !em.classList.contains('error-message')) {
    em = document.createElement('div');
    em.className = 'error-message';
    element.after(em);
  }
  em.textContent = message;
  element.classList.add('error');
}

function clearError(element) {
  let em = element.nextElementSibling;
  if (em && em.classList.contains('error-message')) em.remove();
  element.classList.remove('error');
}

function validateField(input) {
  clearError(input);
  const val = input.value.trim();
  const type = input.getAttribute('data-validate') || input.type || 'text';
  const required = input.hasAttribute('required');

  if (required && !val) {
    createError(input, 'Campo obrigatório.');
    return false;
  }

  if (val) {
    if (type === 'email' || input.getAttribute('data-validate') === 'email') {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(val)) { createError(input, 'Email inválido.'); return false; }
    }
    if (input.getAttribute('data-validate') === 'number') {
      if (isNaN(Number(val))) { createError(input, 'Valor numérico esperado.'); return false; }
    }
    if (input.getAttribute('minlength')) {
      const min = Number(input.getAttribute('minlength'));
      if (val.length < min) { createError(input, `Mínimo ${min} caracteres.`); return false; }
    }
  }
  return true;
}

export function setupGlobalHandlers() {
  document.getElementById('app').addEventListener('blur', (e) => {
    const t = e.target;
    if (t.matches('input,textarea,select')) validateField(t);
  }, true);

  document.getElementById('app').addEventListener('submit', (e) => {
    const form = e.target;
    if (!form.matches('form')) return;
    e.preventDefault();
    const inputs = Array.from(form.querySelectorAll('input,textarea,select'));
    const valid = inputs.map(validateField).every(Boolean);
    if (!valid) {
      showToast('Corrija os campos em destaque.', 3000);
      return;
    }

    if (form.id === 'cadastro-form') {
      const data = Object.fromEntries(new FormData(form).entries());
      if (data.age) data.age = Number(data.age);
      const existing = load('cadastros', []);
      existing.push({ ...data, createdAt: new Date().toISOString() });
      save('cadastros', existing);
      form.reset();
      showToast('Cadastro salvo com sucesso!', 2500);
    }
  });
}

export function showToast(msg, timeout = 2000) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), timeout);
}
