import React from 'react';
import { useAthletes } from '../../context/AthleteContext';
import './CategorySelector.css';

const CategorySelector = () => {
  const { selectedCategory, setSelectedCategory } = useAthletes();
  
  const categories = ['Sub 14', 'Sub 15', 'Sub 16', 'Sub 17', 'Sub 20'];

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

