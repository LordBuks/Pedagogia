import React from 'react';
import { AthleteProvider } from './context/AthleteContext';
import Header from './components/Header/Header';
import CategorySelector from './components/CategorySelector/CategorySelector';
import AthleteGrid3D from './components/AthleteGrid/AthleteGrid3D';
import './App.css';

function App() {
  return (
    <AthleteProvider>
      <div className="App geometric-pattern">
        <Header />
        <CategorySelector />
        <AthleteGrid3D />
      </div>
    </AthleteProvider>
  );
}

export default App;

