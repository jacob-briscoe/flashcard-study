import React from 'react';
import Flashcard from './Flashcard';

const FlashcardList = ({ cards }) => cards.map(card => <FlashcardContainer key={card.id} card={card} />);

const FlashcardContainer = ({ card }) => (
  <div className="col-4 mt-3">
    <Flashcard flashcard={card} />
  </div>
);

export default FlashcardList;