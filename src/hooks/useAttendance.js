// src/hooks/useAttendance.js
import { useState, useEffect } from 'react';
import { 
  getAttendanceRecord, 
  updateAttendance, 
  getAthleteAttendance,
  migrateAttendanceToFirebase 
} from '../services/attendanceService';

export const useAttendance = () => {
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(false);
  const [attendanceMigrationCompleted, setAttendanceMigrationCompleted] = useState(false);

  // Verificar se a migração de presença já foi realizada
  const checkAttendanceMigrationStatus = () => {
    return localStorage.getItem('firebase-attendance-migration-completed') === 'true';
  };

  // Marcar migração de presença como concluída
  const markAttendanceMigrationCompleted = () => {
    localStorage.setItem('firebase-attendance-migration-completed', 'true');
    setAttendanceMigrationCompleted(true);
  };

  // Migrar dados de presença do localStorage para Firebase
  const migrateAttendanceFromLocalStorage = async () => {
    try {
      const savedAttendance = localStorage.getItem('internacional-attendance');
      if (savedAttendance && !checkAttendanceMigrationStatus()) {
        console.log('Iniciando migração de presença do localStorage para Firebase...');
        const parsedAttendance = JSON.parse(savedAttendance);
        
        // Verificar se há dados válidos para migrar
        const hasValidData = Object.keys(parsedAttendance).length > 0;

        if (hasValidData) {
          await migrateAttendanceToFirebase(parsedAttendance);
          console.log('Migração de presença concluída com sucesso!');
          markAttendanceMigrationCompleted();
          
          // Remover dados do localStorage após migração bem-sucedida
          localStorage.removeItem('internacional-attendance');
        } else {
          // Se não há dados válidos, apenas marcar como migrado
          markAttendanceMigrationCompleted();
        }
      } else {
        setAttendanceMigrationCompleted(true);
      }
    } catch (error) {
      console.error('Erro na migração de presença:', error);
      // Em caso de erro, ainda marcar como tentativa de migração para evitar loops
      markAttendanceMigrationCompleted();
    }
  };

  // Inicialização
  useEffect(() => {
    const initializeAttendanceData = async () => {
      await migrateAttendanceFromLocalStorage();
    };

    initializeAttendanceData();
  }, []);

  // Carregar dados de presença para uma escola e mês específicos
  const loadAttendanceData = async (school, year, month) => {
    try {
      setLoading(true);
      const record = await getAttendanceRecord(school, year, month);
      
      const key = `${school}_${year}_${month}`;
      setAttendanceData(prev => ({
        ...prev,
        [key]: record
      }));
      
      return record;
    } catch (error) {
      console.error('Erro ao carregar dados de presença:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar presença de um atleta
  const updateAthleteAttendance = async (school, year, month, athleteId, day, status) => {
    try {
      await updateAttendance(school, year, month, athleteId, day, status);
      
      // Atualizar estado local
      const key = `${school}_${year}_${month}`;
      setAttendanceData(prev => {
        const currentRecord = prev[key] || { records: {} };
        return {
          ...prev,
          [key]: {
            ...currentRecord,
            records: {
              ...currentRecord.records,
              [athleteId]: {
                ...currentRecord.records[athleteId],
                [day]: status
              }
            }
          }
        };
      });
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar presença:', error);
      throw error;
    }
  };

  // Buscar presença de um atleta específico
  const getAthleteAttendanceData = async (school, year, month, athleteId) => {
    try {
      const attendance = await getAthleteAttendance(school, year, month, athleteId);
      return attendance;
    } catch (error) {
      console.error('Erro ao buscar presença do atleta:', error);
      throw error;
    }
  };

  // Obter dados de presença do estado local
  const getLocalAttendanceData = (school, year, month) => {
    const key = `${school}_${year}_${month}`;
    return attendanceData[key] || { records: {} };
  };

  // Obter presença de um atleta do estado local
  const getLocalAthleteAttendance = (school, year, month, athleteId) => {
    const record = getLocalAttendanceData(school, year, month);
    return record.records[athleteId] || {};
  };

  return {
    attendanceData,
    loading,
    attendanceMigrationCompleted,
    loadAttendanceData,
    updateAthleteAttendance,
    getAthleteAttendanceData,
    getLocalAttendanceData,
    getLocalAthleteAttendance
  };
};

