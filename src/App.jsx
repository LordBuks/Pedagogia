import React, { useState } from 'react';
import { AthleteProvider } from './context/AthleteContext';
import Header from './components/Header/Header';
import CategorySelector from './components/CategorySelector/CategorySelector';
import AthleteGrid3D from './components/AthleteGrid/AthleteGrid3D';
import SchoolAttendance from './components/SchoolAttendance/SchoolAttendance';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('athletes'); // 'athletes' ou 'attendance'

  return (
    <AthleteProvider>
      <div className="App geometric-pattern">
        <Header />
        
        {/* Navegação */}
        <div className="navigation-bar">
          <button 
            className={`nav-button ${currentPage === 'athletes' ? 'active' : ''}`}
            onClick={() => setCurrentPage('athletes')}
          >
            Atletas
          </button>
          <button 
            className={`nav-button ${currentPage === 'attendance' ? 'active' : ''}`}
            onClick={() => setCurrentPage('attendance')}
          >
            Chamada Escolar
          </button>
        </div>

        {/* Conteúdo da página */}
        {currentPage === 'athletes' ? (
          <>
            <CategorySelector />
            <AthleteGrid3D />
          </>
        ) : (
          <SchoolAttendance />
        )}
      </div>
    </AthleteProvider>
  );
}

export default App;

