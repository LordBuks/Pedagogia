import React, { createContext, useContext, useState, useEffect } from 'react';

const AthleteContext = createContext();

export const useAthletes = () => {
  const context = useContext(AthleteContext);
  if (!context) {
    throw new Error('useAthletes must be used within an AthleteProvider');
  }
  return context;
};

export const AthleteProvider = ({ children }) => {
  const [athletes, setAthletes] = useState({
    'Sub 14': [],
    'Sub 15': [],
    'Sub 16': [],
    'Sub 17': [],
    'Sub 20': []
  });
  
  const [selectedCategory, setSelectedCategory] = useState('Sub 14');

  // Carregar dados do localStorage
  useEffect(() => {
    const savedAthletes = localStorage.getItem('internacional-athletes');
    if (savedAthletes) {
      console.log("Carregando atletas do localStorage:", JSON.parse(savedAthletes));
      setAthletes(JSON.parse(savedAthletes));
    }
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem('internacional-athletes', JSON.stringify(athletes));
  }, [athletes]);

  const addAthlete = (category, athlete) => {
    const newAthlete = {
      id: Date.now().toString(),
      ...athlete,
      createdAt: new Date().toISOString()
    };
    
    setAthletes(prev => {
      const newState = {
        ...prev,
        [category]: [...prev[category], newAthlete]
      };
      console.log("Atleta adicionado. Novo estado:", newState);
      return newState;
    });
  };

  const updateAthlete = (updatedAthlete) => {
    setAthletes(prev => {
      const newState = { ...prev };
      
      // Encontrar em qual categoria o atleta está
      for (const category in newState) {
        const athleteIndex = newState[category].findIndex(athlete => athlete.id === updatedAthlete.id);
        if (athleteIndex !== -1) {
          newState[category][athleteIndex] = { 
            ...updatedAthlete, 
            updatedAt: new Date().toISOString() 
          };
          break;
        }
      }
      
      return newState;
    });
  };

  const deleteAthlete = (athleteId) => {
    setAthletes(prev => {
      const newState = { ...prev };
      
      // Encontrar em qual categoria o atleta está e removê-lo
      for (const category in newState) {
        newState[category] = newState[category].filter(athlete => athlete.id !== athleteId);
      }
      
      return newState;
    });
  };

  const getAthletesByCategory = (category) => {
    return athletes[category] || [];
  };

  const value = {
    athletes,
    selectedCategory,
    setSelectedCategory,
    addAthlete,
    updateAthlete,
    deleteAthlete,
    getAthletesByCategory
  };

  return (
    <AthleteContext.Provider value={value}>
      {children}
    </AthleteContext.Provider>
  );
};

