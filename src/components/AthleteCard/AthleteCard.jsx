import React, { useState } from 'react';
import { Calendar, MapPin, User } from 'lucide-react';
import './AthleteCard.css';
import CardTemplate from '../../assets/card_template.png'; // Importa a imagem do template

const AthleteCard = ({ athlete, onCardClick }) => {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getOverallRating = () => {
    const { comportamento = 5, compromisso = 5, escola = 5 } = athlete.evaluation || {};
    return Math.round((comportamento + compromisso + escola) / 3);
  };

  return (
    <div className="athlete-card card-3d animate-fade-scale" onClick={() => onCardClick(athlete)}>
      <img src={CardTemplate} alt="Card Template" className="card-template-bg" />
      <div className="card-content-overlay">
        <div className="athlete-photo-container-overlay">
          {athlete.photo && !imageError ? (
            <img 
              src={athlete.photo} 
              alt={athlete.name}
              className="athlete-photo-overlay"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="athlete-photo-placeholder-overlay">
              <User size={40} />
            </div>
          )}
        </div>
        
        <div className="athlete-name-overlay">{athlete.name || 'NOME AQUI'}</div>
        
        <div className="position-overlay">{athlete.position || 'POSIÇÃO AQUI'}</div>
        
        <div className="birthdate-overlay">{formatDate(athlete.birthDate) || 'DATA DE NASCIMENTO AQUI'}</div>
      </div>
    </div>
  );
};

export default AthleteCard;


