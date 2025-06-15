import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, User, Trash2, Trophy, X, ArrowLeft } from 'lucide-react';
import './AthleteDetailsPage.css';

const AthleteDetailsPage = ({ athlete, onClose, onDeleteAthlete, onUpdateAthlete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAthlete, setEditedAthlete] = useState({ ...athlete });
  const [imageError, setImageError] = useState(false);
  
  // Estados individuais para edição de cada seção
  const [isEditingObservations, setIsEditingObservations] = useState(false);
  const [isEditingSchoolProgress, setIsEditingSchoolProgress] = useState(false);
  const [isEditingImprovementPoints, setIsEditingImprovementPoints] = useState(false);

  useEffect(() => {
    // Adiciona classe ao body para esconder o scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Remove a classe quando o componente é desmontado
      document.body.style.overflow = 'auto';
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleInputChange = (field, value) => {
    setEditedAthlete(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Funções para salvar seções individuais
  const handleSaveObservations = () => {
    onUpdateAthlete(editedAthlete);
    setIsEditingObservations(false);
  };

  const handleSaveSchoolProgress = () => {
    onUpdateAthlete(editedAthlete);
    setIsEditingSchoolProgress(false);
  };

  const handleSaveImprovementPoints = () => {
    onUpdateAthlete(editedAthlete);
    setIsEditingImprovementPoints(false);
  };

  // Funções para cancelar edição de seções individuais
  const handleCancelObservations = () => {
    setEditedAthlete(prev => ({ ...prev, observations: athlete.observations }));
    setIsEditingObservations(false);
  };

  const handleCancelSchoolProgress = () => {
    setEditedAthlete(prev => ({ ...prev, schoolProgress: athlete.schoolProgress }));
    setIsEditingSchoolProgress(false);
  };

  const handleCancelImprovementPoints = () => {
    setEditedAthlete(prev => ({ ...prev, improvementPoints: athlete.improvementPoints }));
    setIsEditingImprovementPoints(false);
  };

  // Funções para deletar conteúdo de seções individuais
  const handleDeleteObservations = () => {
    if (window.confirm('Tem certeza que deseja deletar as observações?')) {
      const updatedAthlete = { ...editedAthlete, observations: '' };
      setEditedAthlete(updatedAthlete);
      onUpdateAthlete(updatedAthlete);
    }
  };

  const handleDeleteSchoolProgress = () => {
    if (window.confirm('Tem certeza que deseja deletar o andamento escolar?')) {
      const updatedAthlete = { ...editedAthlete, schoolProgress: '' };
      setEditedAthlete(updatedAthlete);
      onUpdateAthlete(updatedAthlete);
    }
  };

  const handleDeleteImprovementPoints = () => {
    if (window.confirm('Tem certeza que deseja deletar os pontos a reforçar?')) {
      const updatedAthlete = { ...editedAthlete, improvementPoints: '' };
      setEditedAthlete(updatedAthlete);
      onUpdateAthlete(updatedAthlete);
    }
  };

  const handleSave = () => {
    onUpdateAthlete(editedAthlete);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedAthlete({ ...athlete });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Tem certeza que deseja deletar o atleta ${athlete.name}?`)) {
      onDeleteAthlete(athlete.id);
      onClose();
    }
  };

  const renderTrophyRating = (value, onChange, label) => {
    return (
      <div className="trophy-rating">
        <label className="rating-label">{label}</label>
        <div className="trophy-container">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              className={`trophy-button ${value >= rating ? 'active' : ''}`}
              onClick={() => onChange && onChange(rating)}
              disabled={!isEditing}
            >
              <Trophy size={20} />
            </button>
          ))}
          <span className="rating-value">{value}/5</span>
        </div>
      </div>
    );
  };

  return (
    <div className="athlete-details-page">
      <div className="page-header">
        <button className="back-button" onClick={onClose}>
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>
        
        <div className="header-actions">
          {isEditing ? (
            <>
              <button className="save-button" onClick={handleSave}>
                Salvar
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancelar
              </button>
            </>
          ) : (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Editar
            </button>
          )}
          <button className="delete-button-header" onClick={handleDeleteClick}>
            <Trash2 size={18} />
            Deletar
          </button>
        </div>
      </div>

      <div className="page-content">
        <div className="athlete-info-section">
          <div className="athlete-header">
            <div className="athlete-title">
              {isEditing ? (
                <input
                  type="text"
                  value={editedAthlete.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="name-input"
                  placeholder="Nome do atleta"
                />
              ) : (
                <h1 className="athlete-name-large">{athlete.name || 'Nome do Atleta'}</h1>
              )}
              
              <div className="athlete-category-position">
                <span className="category-badge">
                  {athlete.category || 'Categoria'}
                </span>
                {isEditing ? (
                  <select
                    value={editedAthlete.position || ''}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="position-select"
                  >
                    <option value="">Selecione uma posição</option>
                    <option value="Goleiro">Goleiro</option>
                    <option value="Lateral Direito">Lateral Direito</option>
                    <option value="Lateral Esquerdo">Lateral Esquerdo</option>
                    <option value="Zagueiro">Zagueiro</option>
                    <option value="Volante">Volante</option>
                    <option value="Meio-campo">Meio-campo</option>
                    <option value="Meia-atacante">Meia-atacante</option>
                    <option value="Ponta Direita">Ponta Direita</option>
                    <option value="Ponta Esquerda">Ponta Esquerda</option>
                    <option value="Centroavante">Centroavante</option>
                  </select>
                ) : (
                  <span className="position-badge">
                    {athlete.position || 'Posição'}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="athlete-details-grid">
            <div className="detail-item">
              <label>Data de Nascimento</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedAthlete.birthDate || ''}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className="detail-input"
                />
              ) : (
                <div className="detail-value">
                  <Calendar size={16} />
                  {formatDate(athlete.birthDate) || 'Não informado'}
                </div>
              )}
            </div>

            <div className="detail-item">
              <label>Local de Nascimento</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedAthlete.birthPlace || ''}
                  onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                  className="detail-input"
                  placeholder="Local de nascimento"
                />
              ) : (
                <div className="detail-value">
                  <MapPin size={16} />
                  {athlete.birthPlace || 'Não informado'}
                </div>
              )}
            </div>



            <div className="detail-item">
              <label>Ano que Estuda</label>
              {isEditing ? (
                <select
                  value={editedAthlete.schoolYear || ''}
                  onChange={(e) => handleInputChange('schoolYear', e.target.value)}
                  className="detail-input"
                >
                  <option value="">Selecione o ano</option>
                  <option value="6º Ano EF">6º Ano EF</option>
                  <option value="7º Ano EF">7º Ano EF</option>
                  <option value="8º Ano EF">8º Ano EF</option>
                  <option value="9º Ano EF">9º Ano EF</option>
                  <option value="1º Ano EM">1º Ano EM</option>
                  <option value="2º Ano EM">2º Ano EM</option>
                  <option value="3º Ano EM">3º Ano EM</option>
                </select>
              ) : (
                <div className="detail-value">
                  {athlete.schoolYear || 'Não informado'}
                </div>
              )}
            </div>
          </div>

          <div className="observations-section">
            <div className="observation-field">
              <div className="observation-header">
                <label>Observações sobre o atleta</label>
                <div className="observation-buttons">
                  {isEditingObservations ? (
                    <>
                      <button className="save-btn-small" onClick={handleSaveObservations}>
                        Salvar
                      </button>
                      <button className="cancel-btn-small" onClick={handleCancelObservations}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="edit-btn-small" onClick={() => setIsEditingObservations(true)}>
                        Editar
                      </button>
                      <button className="delete-btn-small" onClick={handleDeleteObservations}>
                        Deletar
                      </button>
                    </>
                  )}
                </div>
              </div>
              {isEditingObservations ? (
                <textarea
                  value={editedAthlete.observations || ''}
                  onChange={(e) => handleInputChange('observations', e.target.value)}
                  className="observation-textarea"
                  placeholder="Observações gerais sobre o atleta..."
                  rows={4}
                />
              ) : (
                <div className="observation-content">
                  {athlete.observations || 'Nenhuma observação registrada.'}
                </div>
              )}
            </div>

            <div className="observation-field">
              <div className="observation-header">
                <label>Andamento escolar</label>
                <div className="observation-buttons">
                  {isEditingSchoolProgress ? (
                    <>
                      <button className="save-btn-small" onClick={handleSaveSchoolProgress}>
                        Salvar
                      </button>
                      <button className="cancel-btn-small" onClick={handleCancelSchoolProgress}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="edit-btn-small" onClick={() => setIsEditingSchoolProgress(true)}>
                        Editar
                      </button>
                      <button className="delete-btn-small" onClick={handleDeleteSchoolProgress}>
                        Deletar
                      </button>
                    </>
                  )}
                </div>
              </div>
              {isEditingSchoolProgress ? (
                <textarea
                  value={editedAthlete.schoolProgress || ''}
                  onChange={(e) => handleInputChange('schoolProgress', e.target.value)}
                  className="observation-textarea"
                  placeholder="Informações sobre o desempenho escolar..."
                  rows={4}
                />
              ) : (
                <div className="observation-content">
                  {athlete.schoolProgress || 'Nenhuma informação sobre andamento escolar.'}
                </div>
              )}
            </div>

            <div className="observation-field">
              <div className="observation-header">
                <label>Pontos a reforçar</label>
                <div className="observation-buttons">
                  {isEditingImprovementPoints ? (
                    <>
                      <button className="save-btn-small" onClick={handleSaveImprovementPoints}>
                        Salvar
                      </button>
                      <button className="cancel-btn-small" onClick={handleCancelImprovementPoints}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="edit-btn-small" onClick={() => setIsEditingImprovementPoints(true)}>
                        Editar
                      </button>
                      <button className="delete-btn-small" onClick={handleDeleteImprovementPoints}>
                        Deletar
                      </button>
                    </>
                  )}
                </div>
              </div>
              {isEditingImprovementPoints ? (
                <textarea
                  value={editedAthlete.improvementPoints || ''}
                  onChange={(e) => handleInputChange('improvementPoints', e.target.value)}
                  className="observation-textarea"
                  placeholder="Pontos que precisam ser trabalhados..."
                  rows={4}
                />
              ) : (
                <div className="observation-content">
                  {athlete.improvementPoints || 'Nenhum ponto específico a reforçar.'}
                </div>
              )}
            </div>
          </div>

          <div className="evaluation-section">
            <h3>Avaliação</h3>
            <div className="ratings-grid">
              {renderTrophyRating(
                editedAthlete.behavior || 0,
                isEditing ? (value) => handleInputChange('behavior', value) : null,
                'Comportamento'
              )}
              {renderTrophyRating(
                editedAthlete.commitment || 0,
                isEditing ? (value) => handleInputChange('commitment', value) : null,
                'Compromisso'
              )}
              {renderTrophyRating(
                editedAthlete.schoolRating || 0,
                isEditing ? (value) => handleInputChange('schoolRating', value) : null,
                'Escola'
              )}
            </div>
          </div>
        </div>

        <div className="athlete-photo-section">
          <div className="photo-container-large">
            {athlete.photo && !imageError ? (
              <img 
                src={athlete.photo} 
                alt={athlete.name}
                className="athlete-photo-large"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="athlete-photo-placeholder-large">
                <User size={80} />
                <span>Foto do Atleta</span>
              </div>
            )}
          </div>
          
          {isEditing && (
            <div className="photo-upload-section">
              <label className="photo-upload-label">
                Alterar Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        handleInputChange('photo', e.target.result);
                        setImageError(false);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="photo-upload-input"
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AthleteDetailsPage;

