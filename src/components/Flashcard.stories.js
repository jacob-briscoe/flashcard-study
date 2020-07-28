import React from 'react';
import '../lookAndFeel';
import { action } from '@storybook/addon-actions';
import Flashcard from './Flashcard';

export default {
  title: 'Flashcard',
  component: Flashcard,
  excludeStories: /.*Data$/
};

const componentData = {
  flashcard: {
    id: 1,
    question: 'What is 1+1?',
    answer: '2',
  },
  onSave: action('onSave'),
  onRateAnswer: action('onRateAnswer'),
  onDelete: action('onDelete')
};

const FlashCardContainerData = ({ children }) => (
  <div className="row">
    <div className="col-4">
      {children}
    </div>
  </div>
);

export const View = () => <FlashCardContainerData><Flashcard {...componentData} /></FlashCardContainerData>

export const Edit = () => <FlashCardContainerData><Flashcard showEdit {...componentData} /></FlashCardContainerData>

export const Answer = () => <FlashCardContainerData><Flashcard showAnswer {...componentData} /></FlashCardContainerData>