// src/services/attendanceService.js
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

const COLLECTION_NAME = 'attendance';

// Gerar ID do documento baseado na escola, ano e mês
const generateDocumentId = (school, year, month) => {
  const schoolId = school.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  return `${schoolId}_${year}_${month}`;
};

// Buscar registro de presença para uma escola em um mês específico
export const getAttendanceRecord = async (school, year, month) => {
  try {
    const docId = generateDocumentId(school, year, month);
    const docRef = doc(db, COLLECTION_NAME, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      // Retorna estrutura vazia se não existir
      return {
        id: docId,
        school: school,
        year: year,
        month: month,
        records: {}
      };
    }
  } catch (error) {
    console.error('Erro ao buscar registro de presença:', error);
    throw error;
  }
};

// Atualizar presença de um atleta em um dia específico
export const updateAttendance = async (school, year, month, athleteId, day, status) => {
  try {
    const docId = generateDocumentId(school, year, month);
    const docRef = doc(db, COLLECTION_NAME, docId);
    
    // Busca o documento atual
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Atualiza documento existente
      const currentData = docSnap.data();
      const updatedRecords = {
        ...currentData.records,
        [athleteId]: {
          ...currentData.records[athleteId],
          [day]: status
        }
      };
      
      await updateDoc(docRef, {
        records: updatedRecords,
        updatedAt: serverTimestamp()
      });
    } else {
      // Cria novo documento
      await setDoc(docRef, {
        school: school,
        year: year,
        month: month,
        records: {
          [athleteId]: {
            [day]: status
          }
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar presença:', error);
    throw error;
  }
};

// Buscar presença de um atleta específico em um mês
export const getAthleteAttendance = async (school, year, month, athleteId) => {
  try {
    const record = await getAttendanceRecord(school, year, month);
    return record.records[athleteId] || {};
  } catch (error) {
    console.error('Erro ao buscar presença do atleta:', error);
    throw error;
  }
};

// Buscar todos os registros de presença de uma escola
export const getSchoolAttendanceRecords = async (school) => {
  try {
    const schoolId = school.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    const q = query(
      collection(db, COLLECTION_NAME),
      where('school', '==', school)
    );
    
    const querySnapshot = await getDocs(q);
    const records = [];
    
    querySnapshot.forEach((doc) => {
      records.push({ id: doc.id, ...doc.data() });
    });
    
    return records;
  } catch (error) {
    console.error('Erro ao buscar registros da escola:', error);
    throw error;
  }
};

// Migrar dados de presença do localStorage para Firebase
export const migrateAttendanceToFirebase = async (localStorageAttendance) => {
  try {
    const migratedRecords = [];
    
    for (const [schoolKey, yearData] of Object.entries(localStorageAttendance)) {
      for (const [year, monthData] of Object.entries(yearData)) {
        for (const [month, athleteData] of Object.entries(monthData)) {
          const docId = generateDocumentId(schoolKey, parseInt(year), parseInt(month));
          
          await setDoc(doc(db, COLLECTION_NAME, docId), {
            school: schoolKey,
            year: parseInt(year),
            month: parseInt(month),
            records: athleteData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          
          migratedRecords.push({
            id: docId,
            school: schoolKey,
            year: parseInt(year),
            month: parseInt(month)
          });
        }
      }
    }
    
    return migratedRecords;
  } catch (error) {
    console.error('Erro na migração de presença:', error);
    throw error;
  }
};

