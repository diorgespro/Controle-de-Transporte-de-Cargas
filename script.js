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
    registros.push(novoRegistro);
    inserirLinhaTabela(novoRegistro);
  } else {
    registros[registroEditadoIndex] = novoRegistro;
    atualizarLinhaTabela(registroEditadoIndex, novoRegistro);
    registroEditadoIndex = -1;
  }
  limparFormulario();
}

// Função para inserir nova linha na tabela
function inserirLinhaTabela(reg) {
  const tbody = document.querySelector('#recordsTable tbody');
  const tr = document.createElement('tr');
  tr.setAttribute('data-index', registros.length - 1);
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

// Função para atualizar linha existente
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

// Editar registro
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

// Excluir registro
function excluirRegistro(btn) {
  if (!confirm('Deseja realmente excluir este registro?')) return;
  const tr = btn.closest('tr');
  const index = parseInt(tr.getAttribute('data-index'));

  registros.splice(index, 1);
  tr.remove();

  // Reajustar índices após exclusão
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

// Limpar filtros
function limparFiltro() {
  document.getElementById('filterDate').value = '';
  const tbody = document.querySelector('#recordsTable tbody');
  Array.from(tbody.children).forEach(tr => {
    tr.style.display = '';
  });
}

// Exportar para PDF
async function exportarParaPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Título centralizado
  const titulo = "Registros de Controle de Cargas";
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleX = pageWidth / 2;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(titulo, titleX, 20, { align: 'center' });

  // Dados para a tabela
  const colunas = ['Data', 'Local de Carga', 'Horário', 'Pontos de entrega', 'Distância (km)'];
  const rows = registros.map(reg => [
    reg.data,
    reg.localCarga,
    reg.horario,
    reg.pontos,
    reg.distancia
  ]);

  // Configurações do autoTable para melhor distribuição
  await doc.autoTable({
    startY: 30,
    head: [colunas],
    body: rows,
    styles: {
      font: 'helvetica',
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
    margin: { left: 15, right: 15 },
    tableLineColor: [44, 62, 80],
    tableLineWidth: 0.75,
  });

  // Salvar o PDF
  doc.save('registros_cargas.pdf');
}