const urlWebApp = 'https://script.google.com/macros/s/AKfycbzJGZuLUj2Efp6nxI4mhuLwZTvepFPMtstJ2oeUd2zb-ZM3me94Dt3cuMk6hdG4jpQ/exec'; // Substitua pela URL do seu Web App

async function enviarDados(dados) {
  try {
    const response = await fetch(urlWebApp, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Outros cabeçalhos podem ser adicionados aqui se necessário
      },
      body: JSON.stringify(dados),
    });
    
    const resultado = await response.json();
    console.log('Resposta do servidor:', resultado);
    alert('Dados enviados com sucesso!');
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro na requisição: ' + error.message);
  }
}

// Exemplo de dados
const meusDados = {
  date: '2025-05-01',
  loadingPlace: 'São Paulo',
  loadingTime: '10:00',
  deliveryPoints: 'Rio de Janeiro',
  distance: '430 km'
};

// Para testar, apenas chame a função
// enviarDados(meusDados);