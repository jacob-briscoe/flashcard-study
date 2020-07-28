import React, { useState } from 'react';
import * as R from 'ramda';
import FlashcardList from '../components/FlashcardList';
import ActionContext from '../context/flashcard-action-context';
import { idEquals, findCardIndexById, createFlashcard, setRating, unratedToBest } from '../model/model';

const FlashcardStudy = ({ model }) => {
  const [cards, setCards] = useState(model);

  const addHandler = () => R.pipe(
    createFlashcard,
    R.partialRight(R.prepend, [cards]),
    setCards
  )(cards);

  const saveHandler = card => R.pipe(
    findCardIndexById(card.id),
    R.partialRight(R.update, [card, cards]),
    setCards
  )(cards);

  const rateAnswerHandler = (id, rating) => R.pipe(
    findCardIndexById(id),
    R.partialRight(R.adjust, [setRating(rating), cards]),
    R.sort(unratedToBest),
    setCards
  )(cards);

  const deleteHandler = id => R.pipe(
    R.reject(idEquals(id)),
    setCards
  )(cards);

  return (
    <div className="container">
      <div className="row justify-content-center border-bottom">
        <div>
          <h3 style={{ display: 'inline' }}>Flashcard Study</h3><small className="font-weight-light ml-2">v{process.env.REACT_APP_VERSION}</small>
        </div>
      </div>
      <div className="row mt-3">
        <button className="btn btn-primary" onClick={addHandler}>+ Add Flashcard</button>
      </div>
      <div className="row justify-content-center">
        <ActionContext.Provider
          value={{
            saveFlashcard: saveHandler,
            rateAnswer: rateAnswerHandler,
            deleteFlashcard: deleteHandler
          }}
        >
          <FlashcardList cards={cards} />
        </ActionContext.Provider>
      </div>
    </div>);
};

export default FlashcardStudy;