let dataGlobal = [];
let categoriaActiva = 'Todos';

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    dataGlobal = data;
    renderFilters(data);
    renderCards(data);
  });

function renderFilters(data) {
  const categorias = ['Todos', ...new Set(data.map(d => d.categoria))];
  const container = document.getElementById('filters');

  categorias.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;

    btn.onclick = () => {
      categoriaActiva = cat;
      document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filtrar();
    };

    container.appendChild(btn);
  });
}

function renderCards(data) {
  const container = document.getElementById('cards');
  container.innerHTML = '';

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h3>${item.nombre}</h3>
      <p>${item.descripcion}</p>
      <a href="${item.url}" target="_blank">Visitar</a>
    `;

    container.appendChild(card);
  });
}

function filtrar() {
  const texto = document.getElementById('search').value.toLowerCase();

  const filtrados = dataGlobal.filter(item => {
    const coincideTexto = item.nombre.toLowerCase().includes(texto) || item.descripcion.toLowerCase().includes(texto);
    const coincideCategoria = categoriaActiva === 'Todos' || item.categoria === categoriaActiva;

    return coincideTexto && coincideCategoria;
  });

  renderCards(filtrados);
}

document.getElementById('search').addEventListener('input', filtrar);
