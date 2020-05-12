import React from 'react';

import './styles/css/style.css';

import Header from './components/header';
import Main from './pages/main';

function App() {
  return (
    <div className="App">
      <Header title="Controle Financeiro" />
      <Main />
    </div>
  );
}

export default App;
