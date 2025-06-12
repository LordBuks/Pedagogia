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
    'Turno Manhã - Escola São Francisco': [],
    'Turno Manhã - Escola Estadual Padre Léo': [],
    'Turno Noite - Escola Professor Estadual de Educação Básica Gentil Viegas Cardoso': [],
    'Turno Noite - Escola Estadual de Educação Básica Júlio César Ribeiro de Souza': [],
    'Turno Noite - E.M.E.F. Professor Juliano Nascimento': []
  });
  
  const [selectedCategory, setSelectedCategory] = useState('Turno Manhã - Escola São Francisco');

  // Carregar dados do localStorage
  useEffect(() => {
    const savedAthletes = localStorage.getItem("internacional-athletes");
    if (savedAthletes) {
      try {
        const parsedAthletes = JSON.parse(savedAthletes);
        // Garante que o valor seja um objeto e não um array diretamente, para evitar o erro de iteração
        if (typeof parsedAthletes === 'object' && parsedAthletes !== null) {
          setAthletes(parsedAthletes);
        } else {
          console.error("Dados inválidos no localStorage, inicializando com objeto vazio.");
          setAthletes({});
        }
      } catch (e) {
        console.error("Erro ao analisar JSON do localStorage:", e);
        setAthletes({}); // Inicializa com um objeto vazio em caso de erro de parsing
      }
    } else {
      setAthletes({}); // Inicializa com um objeto vazio se não houver dados salvos
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

