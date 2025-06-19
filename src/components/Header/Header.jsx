import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <img 
            src="/internacional-logo.png" 
            alt="Sport Club Internacional" 
            className="logo"
          />
          <div className="title-section">
            <h1 className="main-title">Sport Club Internacional</h1>
            <p className="subtitle">Departamento de Pedagogia da Categoria de Base</p>
          </div>
        </div>
        {currentUser && (
          <div className="user-info">
            <span className="user-email">{currentUser.email}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

