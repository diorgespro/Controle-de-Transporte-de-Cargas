// Função para enviar os dados ao Google Sheets via Web App
async function salvarNoGoogleSheets(dados) {
  const url = 'https://script.google.com/macros/s/AKfycbzJGZuLUj2Efp6nxI4mhuLwZTvepFPMtstJ2oeUd2zb-ZM3me94Dt3cuMk6hdG4jpQ/exec';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    const result = await response.json();
    if (result.status === 'sucesso') {
      alert('Dados salvos com sucesso!');
      limparFormulario(); // opcional: limpa o formulário após salvar
      listarRegistros(); // opcional: atualiza a tabela na página
    } else {
      alert('Erro ao salvar os dados.');
    }
  } catch (error) {
    alert('Erro na requisição: ' + error);
  }
}

// Evento de submit do formulário
document.getElementById('loadForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const dados = {
    date: document.getElementById('date').value,
    loadingPlace: document.getElementById('loadingPlace').value,
    loadingTime: document.getElementById('loadingTime').value,
    deliveryPoints: document.getElementById('deliveryPoints').value,
    distance: document.getElementById('distance').value
  };

  salvarNoGoogleSheets(dados);
});

// Função para limpar o formulário
function limparFormulario() {
  document.getElementById('loadForm').reset();
}

// (Opcional) Função para listar registros da planilha na tabela
async function listarRegistros() {
  // Aqui você precisaria de uma API, ou outra maneira de ler os dados
  // Como o seu script atual só salva, essa parte é opcional
  // Você pode implementar lendo os dados da planilha usando Google Apps Script também
  // Ou deixar essa função de fora se não for necessária agora
}