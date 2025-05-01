// Função para carregar os registros do localStorage ao iniciar
function carregarRegistros() {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  exibirRegistros(registros);
}

// Função para exibir os registros na tabela
function exibirRegistros(registros) {
  const tbody = document.querySelector('#recordsTable tbody');
  tbody.innerHTML = ''; // Limpa a tabela antes de preencher

  registros.forEach((registro, index) => {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${registro.date}</td>
      <td>${registro.loadingPlace}</td>
      <td>${registro.loadingTime}</td>
      <td>${registro.deliveryPoints}</td>
      <td>${registro.distance}</td>
      <td>
        <button onclick="editarRegistro(${index})">Editar</button>
        <button onclick="excluirRegistro(${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

// Função para salvar um novo registro ou atualizar um existente
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
    // Atualizar registro existente
    registros[recordId] = novoRegistro;
  } else {
    // Adicionar novo registro
    registros.push(novoRegistro);
  }

  localStorage.setItem('registros', JSON.stringify(registros));
  limparFormulario();
  carregarRegistros();
}

// Função para editar um registro
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

// Função para excluir um registro
function excluirRegistro(index) {
  let registros = JSON.parse(localStorage.getItem('registros')) || [];
  registros.splice(index, 1); // Remove o item
  localStorage.setItem('registros', JSON.stringify(registros));
  carregarRegistros(); // Atualiza a tabela
}

// Limpar formulário
function limparFormulario() {
  document.getElementById('loadForm').reset();
  document.getElementById('recordId').value = '';
}

// Filtros (opcional, se quiser)
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

// Carregar registros ao iniciar
window.onload = carregarRegistros;