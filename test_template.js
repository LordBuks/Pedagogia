// Criar um atleta de teste para visualizar o template adicionei
const testAthlete = {
  name: "João Silva",
  position: "Meio-campo", 
  birthDate: "2010-03-15",
  photo: null
};

// Simular a criação do card
const cardContainer = document.querySelector('.athlete-grid') || document.body;
const cardHTML = `
  <div class="athlete-card card-3d animate-fade-scale" style="position: relative; width: 300px; height: 450px; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); margin: 20px;">
    <img src="/src/assets/card_template.png" alt="Card Template" class="card-template-bg" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; z-index: 0;" />
    <div class="card-content-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 20px; color: #fff;">
      <div class="athlete-photo-container-overlay" style="width: 80%; height: 50%; background-color: #fff; border-radius: 10px; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-top: 20px;">
        <div class="athlete-photo-placeholder-overlay" style="color: #ccc;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
      <div class="athlete-name-overlay" style="position: absolute; top: 68%; left: 50%; transform: translateX(-50%); font-size: 1.2em; font-weight: bold; color: #000; text-align: center; width: 80%;">NOME AQUI</div>
      <div class="position-overlay" style="position: absolute; top: 75%; left: 50%; transform: translateX(-50%) rotate(-5deg); font-size: 1em; color: #000; text-align: center; width: 80%;">POSIÇÃO AQUI</div>
      <div class="birthdate-overlay" style="position: absolute; bottom: 5%; left: 50%; transform: translateX(-50%); font-size: 0.9em; color: #000; text-align: center; width: 80%;">DATA DE NASCIMENTO AQUI</div>
    </div>
  </div>
`;

cardContainer.innerHTML = cardHTML;

