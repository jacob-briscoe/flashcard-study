import React from 'react';

const actionContext = React.createContext({
  saveFlashcard: () => { },
  rateAnswer: () => { },
  deleteFlashcard: () => { }
});

export default actionContext;