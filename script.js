// Função para carregar os registros do localStorage ao iniciar
function carregarRegistros() {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  exibirRegistros(registros);
}

// Função para exibir os registros na tabela
function exibirRegistros(registros) {
  const tbody = document.querySelector('#recordsTable tbody');
  tbody.innerHTML = '';

  registros.forEach((registro, index) => {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td data-label="Data">${registro.date}</td>
      <td data-label="Local de Carregamento">${registro.loadingPlace}</td>
      <td data-label="Horário">${registro.loadingTime}</td>
      <td data-label="Pontos de entrega">${registro.deliveryPoints}</td>
      <td data-label="Distância">${registro.distance}</td>
      <td data-label="Ações">
        <button onclick="editarRegistro(${index})">Editar</button>
        <button onclick="excluirRegistro(${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

// Função para salvar novo registro ou atualizar existente
function salvarDados(event) {
  event.preventDefault();

  const recordId = document.getElementById('recordId').value;
  const novoRegistro = {
    date: document.getElementById('date').value,
    loadingPlace: document.getElementById('loadingPlace').value,
    loadingTime: document.getElementById('loadingTime').value,
    deliveryPoints: document.getElementById('deliveryPoints').value,
    distance: document.getElementById('distance').value,
  };

  let registros = JSON.parse(localStorage.getItem('registros')) || [];

  if (recordId) {
    // Atualizar registro
    registros[recordId] = novoRegistro;
  } else {
    // Adicionar novo
    registros.push(novoRegistro);
  }

  localStorage.setItem('registros', JSON.stringify(registros));
  limparFormulario();
  carregarRegistros();
}

// Editar um registro
function editarRegistro(index) {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  const reg = registros[index];

  document.getElementById('recordId').value = index;
  document.getElementById('date').value = reg.date;
  document.getElementById('loadingPlace').value = reg.loadingPlace;
  document.getElementById('loadingTime').value = reg.loadingTime;
  document.getElementById('deliveryPoints').value = reg.deliveryPoints;
  document.getElementById('distance').value = reg.distance;
}

// Excluir um registro
function excluirRegistro(index) {
  let registros = JSON.parse(localStorage.getItem('registros')) || [];
  registros.splice(index, 1);
  localStorage.setItem('registros', JSON.stringify(registros));
  carregarRegistros();
}

// Limpar formulário
function limparFormulario() {
  document.getElementById('loadForm').reset();
  document.getElementById('recordId').value = '';
}

// Filtrar registros por data
function filtrarPorData() {
  const filtroData = document.getElementById('filterDate').value;
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  const filtrados = registros.filter(r => r.date === filtroData);
  exibirRegistros(filtrados);
}

function limparFiltro() {
  document.getElementById('filterDate').value = '';
  carregarRegistros();
}

// Evento para salvar ao submeter o formulário
document.getElementById('loadForm').addEventListener('submit', salvarDados);

// Carregar registros na abertura da página
window.onload = carregarRegistros;