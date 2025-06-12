import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAthletes } from '../../context/AthleteContext';
import AthleteCard from '../AthleteCard/AthleteCard';
import AddAthleteModal from '../AddAthleteModal/AddAthleteModal';
import AthleteDetailsModal from '../AthleteDetailsModal/AthleteDetailsModal';
import './AthleteGrid.css';

const AthleteGrid = () => {
  const { selectedCategory, getAthletesByCategory } = useAthletes();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  
  const athletes = getAthletesByCategory(selectedCategory);

  const handleCardClick = (athlete) => {
    setSelectedAthlete(athlete);
  };

  const handleCloseDetailsModal = () => {
    setSelectedAthlete(null);
  };

  return (
    <div className="athlete-grid-container">
      <div className="grid-header">
        <h2 className="category-title">{selectedCategory}</h2>
        <p className="athletes-count">
          {athletes.length} {athletes.length === 1 ? 'atleta' : 'atletas'} cadastrado{athletes.length === 1 ? '' : 's'}
        </p>
      </div>
      
      <div className="athlete-grid">
        {athletes.map((athlete) => (
          <AthleteCard 
            key={athlete.id} 
            athlete={athlete} 
            onCardClick={handleCardClick}
          />
        ))}
        
        <div className="add-athlete-card card-3d" onClick={() => setShowAddModal(true)}>
          <div className="add-card-content">
            <div className="add-icon-container">
              <Plus size={48} />
            </div>
            <h3 className="add-card-title">Adicionar Atleta</h3>
            <p className="add-card-subtitle">Clique para cadastrar um novo atleta na categoria {selectedCategory}</p>
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddAthleteModal 
          category={selectedCategory}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {selectedAthlete && (
        <AthleteDetailsModal 
          athlete={selectedAthlete}
          category={selectedCategory}
          onClose={handleCloseDetailsModal}
        />
      )}
    </div>
  );
};

export default AthleteGrid;

