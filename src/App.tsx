import React from 'react';
import './App.css';
import PageBase from './layouts/PageBase';
import Homepage from './pages/Homepage'
import SearchResults from './pages/SearchResults';
import SignUp from './pages/SignUp';

function App() {
  return (
    <PageBase>
      <SearchResults />
    </PageBase>
  );
}

export default App;
