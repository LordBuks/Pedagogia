import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAllAthletes, 
  getAthletesByCategory, 
  addAthlete as addAthleteToFirebase, 
  updateAthlete as updateAthleteInFirebase, 
  deleteAthlete as deleteAthleteFromFirebase,
  migrateLocalStorageToFirebase 
} from '../services/athleteService';

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
  const [loading, setLoading] = useState(true);
  const [migrationCompleted, setMigrationCompleted] = useState(false);

  // Verificar se a migração já foi realizada
  const checkMigrationStatus = () => {
    return localStorage.getItem('firebase-migration-completed') === 'true';
  };

  // Marcar migração como concluída
  const markMigrationCompleted = () => {
    localStorage.setItem('firebase-migration-completed', 'true');
    setMigrationCompleted(true);
  };

  // Carregar atletas do Firebase
  const loadAthletesFromFirebase = async () => {
    try {
      setLoading(true);
      const allAthletes = await getAllAthletes();
      
      // Organizar atletas por categoria
      const athletesByCategory = {
        'Turno Manhã - Escola São Francisco': [],
        'Turno Manhã - Escola Estadual Padre Léo': [],
        'Turno Noite - Escola Professor Estadual de Educação Básica Gentil Viegas Cardoso': [],
        'Turno Noite - Escola Estadual de Educação Básica Júlio César Ribeiro de Souza': [],
        'Turno Noite - E.M.E.F. Professor Juliano Nascimento': []
      };

      allAthletes.forEach(athlete => {
        if (athletesByCategory[athlete.category]) {
          athletesByCategory[athlete.category].push(athlete);
        }
      });

      setAthletes(athletesByCategory);
    } catch (error) {
      console.error('Erro ao carregar atletas do Firebase:', error);
    } finally {
      setLoading(false);
    }
  };

  // Migrar dados do localStorage para Firebase
  const migrateFromLocalStorage = async () => {
    try {
      const savedAthletes = localStorage.getItem('internacional-athletes');
      if (savedAthletes && !checkMigrationStatus()) {
        console.log('Iniciando migração do localStorage para Firebase...');
        const parsedAthletes = JSON.parse(savedAthletes);
        
        // Verificar se há dados válidos para migrar
        const hasValidData = Object.values(parsedAthletes).some(category => 
          Array.isArray(category) && category.length > 0
        );

        if (hasValidData) {
          await migrateLocalStorageToFirebase(parsedAthletes);
          console.log('Migração concluída com sucesso!');
          markMigrationCompleted();
          
          // Remover dados do localStorage após migração bem-sucedida
          localStorage.removeItem('internacional-athletes');
        } else {
          // Se não há dados válidos, apenas marcar como migrado
          markMigrationCompleted();
        }
      } else {
        setMigrationCompleted(true);
      }
    } catch (error) {
      console.error('Erro na migração:', error);
      // Em caso de erro, ainda marcar como tentativa de migração para evitar loops
      markMigrationCompleted();
    }
  };

  // Inicialização
  useEffect(() => {
    const initializeData = async () => {
      // Primeiro, tentar migrar dados do localStorage
      await migrateFromLocalStorage();
      
      // Depois, carregar dados do Firebase
      await loadAthletesFromFirebase();
    };

    initializeData();
  }, []);

  // Adicionar atleta
  const addAthlete = async (category, athlete) => {
    try {
      console.log('AthleteContext: [addAthlete] Adicionando atleta ao Firebase - Categoria:', category, 'Atleta:', athlete);
      
      const athleteWithCategory = {
        ...athlete,
        category: category
      };
      
      const newAthlete = await addAthleteToFirebase(athleteWithCategory);
      
      setAthletes(prev => {
        const currentCategoryAthletes = Array.isArray(prev[category]) ? prev[category] : [];
        const newState = {
          ...prev,
          [category]: [...currentCategoryAthletes, newAthlete]
        };
        console.log('AthleteContext: [addAthlete] Novo estado:', newState);
        return newState;
      });
      
      return newAthlete;
    } catch (error) {
      console.error('Erro ao adicionar atleta:', error);
      throw error;
    }
  };

  // Atualizar atleta
  const updateAthlete = async (updatedAthlete) => {
    try {
      const { id, ...athleteData } = updatedAthlete;
      await updateAthleteInFirebase(id, athleteData);
      
      setAthletes(prev => {
        const newState = { ...prev };
        for (const category in newState) {
          const athleteIndex = newState[category].findIndex(athlete => athlete.id === id);
          if (athleteIndex !== -1) {
            newState[category][athleteIndex] = updatedAthlete;
            break;
          }
        }
        return newState;
      });
    } catch (error) {
      console.error('Erro ao atualizar atleta:', error);
      throw error;
    }
  };

  // Deletar atleta
  const deleteAthlete = async (athleteId) => {
    try {
      await deleteAthleteFromFirebase(athleteId);
      
      setAthletes(prev => {
        const newState = { ...prev };
        for (const category in newState) {
          newState[category] = newState[category].filter(athlete => athlete.id !== athleteId);
        }
        return newState;
      });
    } catch (error) {
      console.error('Erro ao deletar atleta:', error);
      throw error;
    }
  };

  // Buscar atletas por categoria
  const getAthletesByCategory = (category) => {
    return athletes[category] || [];
  };

  // Recarregar dados do Firebase
  const refreshAthletes = async () => {
    await loadAthletesFromFirebase();
  };

  const value = {
    athletes,
    selectedCategory,
    setSelectedCategory,
    addAthlete,
    updateAthlete,
    deleteAthlete,
    getAthletesByCategory,
    refreshAthletes,
    loading,
    migrationCompleted
  };

  return (
    <AthleteContext.Provider value={value}>
      {children}
    </AthleteContext.Provider>
  );
};

