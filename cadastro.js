import { escapeHtml } from './templates.js';
import { load } from './storage.js';

export default async function page() {
  const cadastros = load('cadastros', []);
  const listHtml = cadastros.length === 0 ? '<p>Nenhum cadastro salvo.</p>' :
    `<ul>${cadastros.map(c => `<li>${escapeHtml(c.name || '')} — ${escapeHtml(c.email || '')}</li>`).join('')}</ul>`;

  return `
    <h1>Cadastro</h1>
    <form id="cadastro-form" novalidate>
      <div class="form-field">
        <label for="name">Nome</label>
        <input id="name" name="name" required minlength="3" />
      </div>

      <div class="form-field">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" required data-validate="email" />
      </div>

      <div class="form-field">
        <label for="age">Idade</label>
        <input id="age" name="age" data-validate="number" />
      </div>

      <button type="submit">Salvar</button>
    </form>

    <h2>Cadastros salvos</h2>
    <div id="cadastros-list">${listHtml}</div>
  `;
}
