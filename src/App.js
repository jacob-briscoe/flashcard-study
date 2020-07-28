import React from 'react';
import './App.css';
import FlashcardStudy from './containers/FlashcardStudy';
import { initModel } from './model/model';

function App() {
  return (
    <FlashcardStudy model={initModel} />
  );
}

export default App;
