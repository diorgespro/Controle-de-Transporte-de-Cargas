const urlWebApp = 'https://script.google.com/macros/s/AKfycbzJGZuLUj2Efp6nxI4mhuLwZTvepFPMtstJ2oeUd2zb-ZM3me94Dt3cuMk6hdG4jpQ/exec'; // sua URL do Web App

// Função que envia os dados para o Google Apps Script
async function enviarDados(dados) {
  try {
    const response = await fetch(urlWebApp, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados),
    });

    const resultado = await response.json();
    console.log('Resposta do servidor:', resultado);
    if (resultado.status === 'sucesso') {
      alert('Dados salvos com sucesso!');
      limparFormulario(); // opcional: limpa o formulário após salvar
      // Aqui você pode atualizar a tabela ou realizar outras ações
    } else {
      alert('Erro ao salvar: ' + resultado.message);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro na requisição: ' + error.message);
  }
}

// Função que captura os dados do formulário e envia
function salvarFormulario(event) {
  event.preventDefault(); // evita envio padrão do formulário
  const dados = {
    date: document.getElementById('date').value,
    loadingPlace: document.getElementById('loadingPlace').value,
    loadingTime: document.getElementById('loadingTime').value,
    deliveryPoints: document.getElementById('deliveryPoints').value,
    distance: document.getElementById('distance').value
  };
  enviarDados(dados);
}

// Função para limpar o formulário após o envio
function limparFormulario() {
  document.getElementById('loadForm').reset();
}

// Associar o evento do formulário ao script
document.getElementById('loadForm').addEventListener('submit', salvarFormulario);