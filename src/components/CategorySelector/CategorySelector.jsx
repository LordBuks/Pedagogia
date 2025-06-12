import React from 'react';
import { useAthletes } from '../../context/AthleteContext';
import './CategorySelector.css';

const CategorySelector = () => {
  const { selectedCategory, setSelectedCategory } = useAthletes();
  
  const categories = [
    'Turno Manhã - Escola São Francisco', 
    'Turno Manhã - Escola Estadual Padre Léo', 
    'Turno Noite - Escola Professor Estadual de Educação Básica Gentil Viegas Cardoso', 
    'Turno Noite - Escola Estadual de Educação Básica Júlio César Ribeiro de Souza', 
    'Turno Noite - E.M.E.F. Professor Juliano Nascimento'
  ];

  return (
    <div className="category-selector">
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            <span className="category-text">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;

