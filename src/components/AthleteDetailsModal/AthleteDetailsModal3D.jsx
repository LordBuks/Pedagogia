import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Ruler, User } from 'lucide-react';
import './AthleteDetailsModal3D.css';

const AthleteDetailsModal3D = ({ athlete, category, onClose }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Não informado';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container-3d">
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-content-3d">
          <div className="athlete-details-left">
            <div className="athlete-header">
              <h1 className="athlete-name-large">{athlete.name || 'Nome do Atleta'}</h1>
              <span className="athlete-category">{category}</span>
            </div>
            
            <div className="athlete-info-grid">
              <div className="info-item">
                <div className="info-label">Data de Nascimento</div>
                <div className="info-value">
                  <Calendar size={16} />
                  {formatDate(athlete.birthDate)}
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-label">Local de Nascimento</div>
                <div className="info-value">
                  <MapPin size={16} />
                  {athlete.birthPlace || 'Não informado'}
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-label">Posição</div>
                <div className="info-value">
                  <User size={16} />
                  {athlete.position || 'Não informado'}
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-label">Altura</div>
                <div className="info-value">
                  <Ruler size={16} />
                  {athlete.height || 'Não informado'}
                </div>
              </div>
            </div>
            
            {athlete.evaluation && (
              <div className="evaluation-section">
                <h3>Avaliação</h3>
                <div className="evaluation-grid">
                  <div className="evaluation-item">
                    <span>Comportamento</span>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`star ${i < (athlete.evaluation.comportamento || 0) ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="evaluation-item">
                    <span>Compromisso</span>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`star ${i < (athlete.evaluation.compromisso || 0) ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="evaluation-item">
                    <span>Escola</span>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`star ${i < (athlete.evaluation.escola || 0) ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="athlete-details-right">
            <div className="athlete-photo-large-container">
              {athlete.photo && !imageError ? (
                <img 
                  src={athlete.photo} 
                  alt={athlete.name}
                  className="athlete-photo-large"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="athlete-photo-large-placeholder">
                  <User size={80} />
                </div>
              )}
              <div className="photo-overlay"></div>
            </div>
          </div>
        </div>
        
        <div className="modal-decoration">
          <div className="decoration-line-modal"></div>
        </div>
      </div>
    </div>
  );
};

export default AthleteDetailsModal3D;

