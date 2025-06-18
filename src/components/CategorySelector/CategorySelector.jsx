import React from 'react';
import { useAthletes } from '../../context/AthleteContext';
import './CategorySelector.css';

const CategorySelector = () => {
  const { selectedCategory, setSelectedCategory } = useAthletes();
  
  // Mapeamento de categorias para exibir apenas o nome da escola sem o turno
  const categoryMap = {
    'Turno Manhã - Escola São Francisco': {
      displayName: 'Escola São Francisco',
      turno: 'Manhã'
    },
    'Turno Manhã - Escola Estadual Padre Léo': {
      displayName: 'Escola Padre Léo',
      turno: 'Manhã'
    },
    'Turno Noite - Escola Estadual de Educação Básica Gentil Viegas Cardoso': {
      displayName: 'Escola Gentil Viegas',
      turno: 'Noite'
    },
    'Turno Noite - Escola Estadual de Educação Básica Júlio César Ribeiro de Souza': {
      displayName: 'Escola Júlio César',
      turno: 'Noite'
    },
    'Turno Noite - E.M.E.F. Professor Juliano Nascimento': {
      displayName: 'Escola Juliano Nascimento',
      turno: 'Noite'
    }
  };

  const categories = [
    'Turno Manhã - Escola São Francisco', 
    'Turno Manhã - Escola Estadual Padre Léo', 
    'Turno Noite - Escola Estadual de Educação Básica Gentil Viegas Cardoso', 
    'Turno Noite - Escola Estadual de Educação Básica Júlio César Ribeiro de Souza', 
    'Turno Noite - E.M.E.F. Professor Juliano Nascimento'
  ];

  // Separar escolas por turno
  const nightSchools = categories.filter(cat => cat.includes('Noite'));
  const morningSchools = categories.filter(cat => cat.includes('Manhã'));

  return (
    <div className="category-selector">
      <div className="category-tabs">
        {/* Escolas da noite em cima */}
        <div className="night-schools">
          {nightSchools.map((category) => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className="category-text">{categoryMap[category].displayName}</span>
            </button>
          ))}
        </div>
        
        {/* Escolas da manhã embaixo */}
        <div className="morning-schools">
          {morningSchools.map((category) => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className="category-text">{categoryMap[category].displayName}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;

