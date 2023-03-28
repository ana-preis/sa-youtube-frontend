import React from 'react';
import './App.css';
import PageBase from './layouts/PageBase';
import Homepage from './pages/Homepage'
import SignUp from './pages/SignUp';

function App() {
  return (
    <PageBase>
      <Homepage />
    </PageBase>
  );
}

export default App;
