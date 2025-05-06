// Array para armazenar os registros
let registros = [];

// Variável para editar registros
let registroEditadoIndex = -1;

// Função para salvar registro (novo ou edição)
function salvarRegistro() {
  const data = document.getElementById('date').value;
  const localCarga = document.getElementById('loadingPlace').value;
  const horario = document.getElementById('loadingTime').value;
  const pontos = document.getElementById('deliveryPoints').value;
  const distancia = document.getElementById('distance').value;

  if (!data || !localCarga || !horario || !pontos || !distancia) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const novoRegistro = {
    data,
    localCarga,
    horario,
    pontos,
    distancia
  };

  if (registroEditadoIndex === -1) {
    // Novo registro
    registros.push(novoRegistro);
    adicionarLinhaTabela(novoRegistro);
  } else {
    // Edição
    registros[registroEditadoIndex] = novoRegistro;
    atualizarLinhaTabela(registroEditadoIndex, novoRegistro);
    registroEditadoIndex = -1;
  }
  limparFormulario();
}

// Função para adicionar linha na tabela
function adicionarLinhaTabela(reg) {
  const tbody = document.querySelector('#recordsTable tbody');
  const tr = document.createElement('tr');
  tr.setAttribute('data-index', registros.length -1);
  tr.innerHTML = `
    <td data-label="Data">${reg.data}</td>
    <td data-label="Local de Carga">${reg.localCarga}</td>
    <td data-label="Horário">${reg.horario}</td>
    <td data-label="Pontos de entrega">${reg.pontos}</td>
    <td data-label="Distância">${reg.distancia} km</td>
    <td data-label="Ações">
      <button onclick="editarRegistro(this)">Editar</button>
      <button onclick="excluirRegistro(this)">Excluir</button>
    </td>
  `;
  tbody.appendChild(tr);
}

// Função para atualizar linha na tabela
function atualizarLinhaTabela(index, reg) {
  const tbody = document.querySelector('#recordsTable tbody');
  const tr = tbody.querySelector(`tr[data-index='${index}']`);
  if (tr) {
    tr.innerHTML = `
      <td data-label="Data">${reg.data}</td>
      <td data-label="Local de Carga">${reg.localCarga}</td>
      <td data-label="Horário">${reg.horario}</td>
      <td data-label="Pontos de entrega">${reg.pontos}</td>
      <td data-label="Distância">${reg.distancia} km</td>
      <td data-label="Ações">
        <button onclick="editarRegistro(this)">Editar</button>
        <button onclick="excluirRegistro(this)">Excluir</button>
      </td>
    `;
  }
}

// Função para editar registro
function editarRegistro(btn) {
  const tr = btn.closest('tr');
  const index = parseInt(tr.getAttribute('data-index'));

  const reg = registros[index];
  document.getElementById('date').value = reg.data;
  document.getElementById('loadingPlace').value = reg.localCarga;
  document.getElementById('loadingTime').value = reg.horario;
  document.getElementById('deliveryPoints').value = reg.pontos;
  document.getElementById('distance').value = reg.distancia;

  registroEditadoIndex = index;
}

// Função para excluir registro
function excluirRegistro(btn) {
  if (!confirm('Deseja realmente excluir este registro?')) return;
  const tr = btn.closest('tr');
  const index = parseInt(tr.getAttribute('data-index'));
  registros.splice(index,1);
  tr.remove();
  // Reajustar índices
  const tbody = document.querySelector('#recordsTable tbody');
  Array.from(tbody.children).forEach((tr, i) => {
    tr.setAttribute('data-index', i);
  });
}

// Limpar formulário
function limparFormulario() {
  document.getElementById('loadForm').reset();
  registroEditadoIndex = -1;
}

// Filtrar por data
function filtrarPorData() {
  const filtro = document.getElementById('filterDate').value;
  const tbody = document.querySelector('#recordsTable tbody');
  Array.from(tbody.children).forEach(tr => {
    const regIndex = parseInt(tr.getAttribute('data-index'));
    const reg = registros[regIndex];
    if (filtro && reg.data !== filtro) {
      tr.style.display = 'none';
    } else {
      tr.style.display = '';
    }
  });
}

// Limpar filtro
function limparFiltro() {
  document.getElementById('filterDate').value = '';
  const tbody = document.querySelector('#recordsTable tbody');
  Array.from(tbody.children).forEach(tr => {
    tr.style.display = '';
  });
}

// Exportar registros para PDF
async function exportarParaPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Registros de Controle de Cargas", 14, 20);

  const colunas = ['Data', 'Local de Carga', 'Horário', 'Pontos de entrega', 'Distância (km)'];
  const rows = registros.map(reg => [
    reg.data,
    reg.localCarga,
    reg.horario,
    reg.pontos,
    reg.distancia
  ]);

  await doc.autoTable({
    startY: 30,
    head: [colunas],
    body: rows,
  });

  doc.save('registros_cargas.pdf');
}