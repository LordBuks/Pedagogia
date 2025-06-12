import React, { useState } from 'react';
import { X, Upload, User } from 'lucide-react';
import { useAthletes } from '../../context/AthleteContext';
import './AddAthleteModal.css';

const AddAthleteModal = ({ category, onClose }) => {
  const { addAthlete } = useAthletes();
  const [formData, setFormData] = useState({
    name: '',
    fullName: '',
    birthDate: '',
    position: '',
    admissionDate: '',
    school: '',
    schoolYear: '',
    naturalidade: '',
    photo: null,
    evaluation: {
      comportamento: 5,
      compromisso: 5,
      escola: 5
    }
  });

  const [errors, setErrors] = useState({});

  const positions = [
    'Goleiro',
    'Lateral Direito',
    'Lateral Esquerdo',
    'Zagueiro',
    'Volante',
    'Meio-campo',
    'Meia-atacante',
    'Ponta Direita',
    'Ponta Esquerda',
    'Centroavante'
  ];

  const schools = [
    { name: 'Escola São Francisco', period: 'Manhã' },
    { name: 'Escola Estadual Padre Léo', period: 'Manhã' },
    { name: 'Escola Professor Estadual de Educação Básica Gentil Viegas Cardoso', period: 'Noite' },
    { name: 'Escola Estadual de Educação Básica Júlio César Ribeiro de Souza', period: 'Noite' },
    { name: 'E.M.E.F. Professor Juliano Nascimento', period: 'Noite' }
  ];

  const schoolYears = [
    '6º Ano EF',
    '7º Ano EF',
    '8º Ano EF',
    '9º Ano EF',
    '1º Ano EM',
    '2º Ano EM',
    '3º Ano EM'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleEvaluationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      evaluation: {
        ...prev.evaluation,
        [field]: parseInt(value)
      }
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          photo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório';
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = 'Data de nascimento é obrigatória';
    }
    
    if (!formData.position) {
      newErrors.position = 'Posição é obrigatória';
    }
    
    if (!formData.schoolYear) {
      newErrors.schoolYear = 'Ano escolar é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      addAthlete(category, formData);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Adicionar Atleta - {category}</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="athlete-form">
          <div className="form-grid">
            <div className="form-left">
              <div className="photo-section">
                <div className="photo-container">
                  {formData.photo ? (
                    <img src={formData.photo} alt="Preview" className="photo-preview" />
                  ) : (
                    <div className="photo-placeholder">
                      <User size={40} />
                    </div>
                  )}
                </div>
                <label className="photo-upload-btn btn-3d">
                  <Upload size={16} />
                  Adicionar Foto
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              <div className="form-group">
                <label>Nome *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Nome Completo *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label>Data de Nascimento *</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className={errors.birthDate ? 'error' : ''}
                />
                {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
              </div>

              <div className="form-group">
                <label>Posição *</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className={errors.position ? 'error' : ''}
                >
                  <option value="">Selecione uma posição</option>
                  {positions.map(position => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
                {errors.position && <span className="error-message">{errors.position}</span>}
              </div>
            </div>

            <div className="form-right">
              <div className="form-group">
                <label>Admissão no Alojamento *</label>
                <input
                  type="date"
                  name="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Escola que Estuda *</label>
                <select
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione uma escola</option>
                  <optgroup label="Turno Manhã">
                    {schools.filter(school => school.period === 'Manhã').map(school => (
                      <option key={school.name} value={school.name}>{school.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Turno Noite">
                    {schools.filter(school => school.period === 'Noite').map(school => (
                      <option key={school.name} value={school.name}>{school.name}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div className="form-group">
                <label>Ano que Estuda *</label>
                <select
                  name="schoolYear"
                  value={formData.schoolYear}
                  onChange={handleInputChange}
                  className={errors.schoolYear ? 'error' : ''}
                >
                  <option value="">Selecione o ano</option>
                  {schoolYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.schoolYear && <span className="error-message">Ano escolar é obrigatório</span>}
              </div>

              <div className="form-group">
                <label>Naturalidade *</label>
                <input
                  type="text"
                  name="naturalidade"
                  value={formData.naturalidade}
                  onChange={handleInputChange}
                />
              </div>

              <div className="evaluation-section">
                <h3>Avaliação Inicial</h3>
                
                <div className="evaluation-item">
                  <label>Comportamento: {formData.evaluation.comportamento}/10</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={formData.evaluation.comportamento}
                    onChange={(e) => handleEvaluationChange('comportamento', e.target.value)}
                    className="evaluation-slider"
                  />
                </div>

                <div className="evaluation-item">
                  <label>Compromisso: {formData.evaluation.compromisso}/10</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={formData.evaluation.compromisso}
                    onChange={(e) => handleEvaluationChange('compromisso', e.target.value)}
                    className="evaluation-slider"
                  />
                </div>

                <div className="evaluation-item">
                  <label>Escola: {formData.evaluation.escola}/10</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={formData.evaluation.escola}
                    onChange={(e) => handleEvaluationChange('escola', e.target.value)}
                    className="evaluation-slider"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="submit-btn btn-3d">
              Adicionar Atleta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAthleteModal;

