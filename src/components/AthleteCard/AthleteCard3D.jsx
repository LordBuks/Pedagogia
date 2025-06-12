import React, { useState } from 'react';
import { Calendar, MapPin, User, Trash2, Trophy } from 'lucide-react';
import './AthleteCard3D.css';

const AthleteCard3D = ({ athlete, onCardClick, onDeleteAthlete }) => {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const calculateAverageRating = () => {
    if (!athlete.evaluation || !athlete.evaluation.comportamento || !athlete.evaluation.compromisso || !athlete.evaluation.escola) return 0;
    const average = (athlete.evaluation.comportamento + athlete.evaluation.compromisso + athlete.evaluation.escola) / 3;
    return average.toFixed(1);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Previne que o clique no botão delete abra o card
    if (window.confirm(`Tem certeza que deseja deletar o atleta ${athlete.name}?`)) {
      onDeleteAthlete(athlete.id);
    }
  };

  return (
    <div className="athlete-card-3d" onClick={() => onCardClick(athlete)}>
      <div className="card-inner">
        <div className="card-background">
          <div className="geometric-pattern"></div>
          <div className="inter-logo"></div>
        </div>
        
        <button 
          className="delete-button"
          onClick={handleDeleteClick}
          title="Deletar atleta"
        >
          <Trash2 size={16} />
        </button>
        
        <div className="card-content">
          <div className="athlete-photo-container">
            {athlete.photo && !imageError ? (
              <img 
                src={athlete.photo} 
                alt={athlete.name}
                className="athlete-photo"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="athlete-photo-placeholder">
                <User size={40} />
              </div>
            )}
            <div className="photo-ring"></div>
          </div>
          
          <div className="athlete-info">
            <h3 className="athlete-name">{athlete.name || 'NOME DO ATLETA'}</h3>
            <p className="athlete-position">{athlete.position || 'POSIÇÃO'}</p>
            <p className="athlete-birthdate">
              <Calendar size={14} />
              {formatDate(athlete.birthDate) || 'DATA DE NASCIMENTO'}
            </p>
            <div className="athlete-rating">
              <Trophy size={14} />
              <span>Média: {calculateAverageRating()}/5</span>
            </div>
          </div>
          
          <div className="card-decorations">
            <div className="decoration-line"></div>
            <div className="decoration-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        
        <div className="card-glow"></div>
      </div>
    </div>
  );
};

export default AthleteCard3D;

