// Função para criar o HTML de um card de atleta
function criarCardAtleta(atleta) {
    return `
        <div class="card">
            <div class="foto-container">
                <img src="${atleta.foto || 'https://via.placeholder.com/300x200?text=Sem+Imagem'}" alt="${atleta.nome}">
            </div>
            <div class="card-content">
                <h2>${atleta.nome}</h2>
                <p>${atleta.posicao}</p>
                <p>${formatarData(atleta.dataNascimento)}</p>
            </div>
        </div>
    `;
}

// Função para formatar a data (de 'AAAA-MM-DD' para 'DD/MM/AAAA')
function formatarData(dataString) {
    if (!dataString) return "Data não informada";
    
    const partes = dataString.split('-');
    if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataString;
}

// Função para carregar os atletas e exibir os cards
async function carregarAtletas() {
    try {
        // URL da sua API - altere conforme necessário
        const response = await fetch("/atletas");
        const atletas = await response.json();
        
        const container = document.querySelector('.card-container');
        container.innerHTML = '';
        
        atletas.forEach(atleta => {
            container.innerHTML += criarCardAtleta(atleta);
        });
        
    } catch (error) {
        console.error('Erro ao carregar atletas:', error);
        // Caso falhe, exibe dados de exemplo
        exibirDadosExemplo();
    }
}

// Exibe dados de exemplo se a API não estiver disponível
function exibirDadosExemplo() {
    const container = document.querySelector('.card-container');
    container.innerHTML = '';
    
    const atletasExemplo = [
        {
            nome: "Rafael Barrucio",
            posicao: "Atacante",
            dataNascimento: "1976-03-28",
            foto: ""
        },
        {
            nome: "Carlos Silva",
            posicao: "Meio-campo",
            dataNascimento: "1985-07-12",
            foto: ""
        },
        {
            nome: "Ana Santos",
            posicao: "Goleira",
            dataNascimento: "1990-11-05",
            foto: ""
        }
    ];
    
    atletasExemplo.forEach(atleta => {
        container.innerHTML += criarCardAtleta(atleta);
    });
}

// Quando a página carregar, chama a função para carregar os atletas
document.addEventListener('DOMContentLoaded', carregarAtletas);

