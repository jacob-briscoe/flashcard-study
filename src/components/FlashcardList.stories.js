import React from 'react';
import '../lookAndFeel';
import FlashcardList from './FlashcardList';

export default {
  title: 'Flashcard List',
  component: FlashcardList,
  excludeStories: /.*Data$/
};

const flashCardData = [
  {id: 1, question: 'What is 1+1?', answer: '2'},
  {id: 2, question: 'What is 1+2?', answer: '3'},
  {id: 3, question: 'What is 1+3?', answer: '4'},
  {id: 4, question: 'What is 1+4?', answer: '5'},
];

export const None = () => <FlashcardList cards={flashCardData.slice(0,0)} />

export const Some = () => <FlashcardList cards={flashCardData} />
