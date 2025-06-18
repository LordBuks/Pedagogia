// src/services/athleteService.js
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

const COLLECTION_NAME = 'athletes';

// Adicionar um novo atleta
export const addAthlete = async (athleteData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...athleteData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...athleteData };
  } catch (error) {
    console.error('Erro ao adicionar atleta:', error);
    throw error;
  }
};

// Buscar todos os atletas
export const getAllAthletes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const athletes = [];
    querySnapshot.forEach((doc) => {
      athletes.push({ id: doc.id, ...doc.data() });
    });
    return athletes;
  } catch (error) {
    console.error('Erro ao buscar atletas:', error);
    throw error;
  }
};

// Buscar atletas por categoria
export const getAthletesByCategory = async (category) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where('category', '==', category),
      orderBy('name')
    );
    const querySnapshot = await getDocs(q);
    const athletes = [];
    querySnapshot.forEach((doc) => {
      athletes.push({ id: doc.id, ...doc.data() });
    });
    return athletes;
  } catch (error) {
    console.error('Erro ao buscar atletas por categoria:', error);
    throw error;
  }
};

// Atualizar um atleta
export const updateAthlete = async (athleteId, athleteData) => {
  try {
    const athleteRef = doc(db, COLLECTION_NAME, athleteId);
    await updateDoc(athleteRef, {
      ...athleteData,
      updatedAt: serverTimestamp()
    });
    return { id: athleteId, ...athleteData };
  } catch (error) {
    console.error('Erro ao atualizar atleta:', error);
    throw error;
  }
};

// Deletar um atleta
export const deleteAthlete = async (athleteId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, athleteId));
    return athleteId;
  } catch (error) {
    console.error('Erro ao deletar atleta:', error);
    throw error;
  }
};

// Migrar dados do localStorage para Firebase
export const migrateLocalStorageToFirebase = async (localStorageData) => {
  try {
    const migratedAthletes = {};
    
    for (const [category, athletes] of Object.entries(localStorageData)) {
      migratedAthletes[category] = [];
      
      for (const athlete of athletes) {
        // Remove o ID local e adiciona a categoria
        const { id, ...athleteWithoutId } = athlete;
        const athleteWithCategory = {
          ...athleteWithoutId,
          category: category,
          originalLocalId: id // Mantém referência ao ID original se necessário
        };
        
        const newAthlete = await addAthlete(athleteWithCategory);
        migratedAthletes[category].push(newAthlete);
      }
    }
    
    return migratedAthletes;
  } catch (error) {
    console.error('Erro na migração:', error);
    throw error;
  }
};

