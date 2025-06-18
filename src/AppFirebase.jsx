import React, { useState } from 'react';
import { AthleteProvider } from './context/AthleteContextFirebase';
import Header from './components/Header/Header';
import CategorySelector from './components/CategorySelector/CategorySelector';
import AthleteGrid3D from './components/AthleteGrid/AthleteGrid3D';
import SchoolAttendance from './components/SchoolAttendance/SchoolAttendance';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('athletes'); // 'athletes' ou 'attendance'

  return (
    <AthleteProvider>
      <div className="App geometric-pattern">
        <Header />
        
        {/* Barra lateral de navegação */}
        <div className="sidebar">
          <div className="sidebar-content">
            <button 
              className={`sidebar-button ${currentPage === 'athletes' ? 'active' : ''}`}
              onClick={() => setCurrentPage('athletes')}
            >
              <span className="sidebar-icon">👥</span>
              <span className="sidebar-text">Atletas</span>
            </button>
            <button 
              className={`sidebar-button ${currentPage === 'attendance' ? 'active' : ''}`}
              onClick={() => setCurrentPage('attendance')}
            >
              <span className="sidebar-icon">📋</span>
              <span className="sidebar-text">Chamada Escolar</span>
            </button>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="main-content">
          {currentPage === 'athletes' ? (
            <>
              <CategorySelector />
              <AthleteGrid3D />
            </>
          ) : (
            <SchoolAttendance />
          )}
        </div>

        <Footer />
      </div>
    </AthleteProvider>
  );
}

export default App;

