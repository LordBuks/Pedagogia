import React, { useState } from 'react';
import { AthleteProvider } from './context/AthleteContextFirebase';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header/Header';
import CategorySelector from './components/CategorySelector/CategorySelector';
import AthleteGrid3D from './components/AthleteGrid/AthleteGrid3D';
import SchoolAttendance from './components/SchoolAttendance/SchoolAttendance';
import Footer from './components/Footer/Footer';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import './App.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('athletes'); // 'athletes' ou 'attendance'
  const [showAuth, setShowAuth] = useState(true); // Controla a exibição da tela de autenticação
  const [isLogin, setIsLogin] = useState(true); // Controla se é login ou cadastro
  const { currentUser, logout } = useAuth();

  if (showAuth && !currentUser) {
    return (
      <div className="App geometric-pattern">
        <Header />
        <div className="main-content auth-container">
          {isLogin ? (
            <Login onSwitchToSignup={() => setIsLogin(false)} onSuccess={() => setShowAuth(false)} />
          ) : (
            <Signup onSwitchToLogin={() => setIsLogin(true)} onSuccess={() => setShowAuth(false)} />
          )}
        </div>
        <Footer />
      </div>
    );
  }

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
            {currentUser && (
              <button 
                className="sidebar-button"
                onClick={logout}
              >
                <span className="sidebar-icon">🚪</span>
                <span className="sidebar-text">Sair</span>
              </button>
            )}
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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;


