import React from 'react';
import { AthleteProvider } from './context/AthleteContext';
import Header from './components/Header/Header';
import CategorySelector from './components/CategorySelector/CategorySelector';
import AthleteGrid from './components/AthleteGrid/AthleteGrid';
import './App.css';

function App() {
  return (
    <AthleteProvider>
      <div className="App geometric-pattern">
        <Header />
        <CategorySelector />
        <AthleteGrid />
      </div>
    </AthleteProvider>
  );
}

export default App;

