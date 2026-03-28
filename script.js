let dataGlobal = [];
let categoriaActiva = 'Todos';

fetch('data.json')
  .then(res => res.json())
  .then(data => {

    const ordenados = [
      ...data.filter(d => d.destacado),
      ...data.filter(d => !d.destacado)
    ];

    dataGlobal = ordenados;

    renderFilters(ordenados);
    renderCards(ordenados);

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
  const destacadosContainer = document.getElementById('destacados');

  container.innerHTML = '';
  destacadosContainer.innerHTML = '';

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = item.destacado ? 'card destacado' : 'card';

    card.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">
      <h3>${item.nombre}</h3>
      <p>${item.descripcion}</p>
      <p class="autor">Autor: ${item.autor}</p>
      <a href="${item.url}" target="_blank">Visitar</a>
    `;

    if(item.destacado){
      destacadosContainer.appendChild(card);
    } else {
      container.appendChild(card);
    }
  });
}

function filtrar() {
  const texto = document.getElementById('search').value.toLowerCase();

  const filtrados = dataGlobal.filter(item => {
    const coincideTexto =
      item.nombre.toLowerCase().includes(texto) ||
      item.descripcion.toLowerCase().includes(texto) ||
      (item.autor && item.autor.toLowerCase().includes(texto)) ||
      item.categoria.toLowerCase().includes(texto);
    const coincideCategoria = categoriaActiva === 'Todos' || item.categoria === categoriaActiva;

    return coincideTexto && coincideCategoria;
  });

  renderCards(filtrados);
}

document.getElementById('search').addEventListener('input', filtrar);

function iniciarCountdown() {

  // Fecha objetivo: 12 abril 2026, 07:00 Lima (UTC-5)
  const fechaObjetivo = new Date("2026-04-12T07:00:00-05:00").getTime();

  function actualizar() {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
      document.getElementById("countdown").innerHTML = "¡Ya es día de votación!";
      return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    document.getElementById("countdown").innerHTML =
      `Faltan ${dias}d ${horas}h ${minutos}m ${segundos}s para votar`;
  }

  actualizar();
  setInterval(actualizar, 1000);
}

iniciarCountdown();
