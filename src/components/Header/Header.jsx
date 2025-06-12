import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-placeholder">
            <span className="logo-text">SC</span>
          </div>
          <div className="title-section">
            <h1 className="main-title">Sport Club Internacional</h1>
            <p className="subtitle">Categorias de Base</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

