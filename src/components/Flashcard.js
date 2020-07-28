import React, { Fragment, useState, useEffect } from 'react';
import * as R from 'ramda';
import styles from './Flashcard.module.css';
import { RATING, notBlank, spacer } from '../model/model';
import ActionContext from '../context/flashcard-action-context';

const Flashcard = ({ flashcard }) => {
  const [isEditing, setEditing] = useState(flashcard.isNew);
  const [isAnswering, setAnswering] = useState(false);

  const toggleEditingHandler = () => setEditing(prev => !prev);
  const toggleAnswerHandler = () => setAnswering(prev => !prev);

  const cardConfig = {
    toggleEditing: toggleEditingHandler,
    toggleAnswer: toggleAnswerHandler,
    flashcard
  };

  let body = <View {...cardConfig} />;

  if (isEditing) {
    body = <Edit {...cardConfig} onCancel={toggleEditingHandler} />;
  } else if (isAnswering) {
    body = <Answer {...cardConfig} />;
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="row justify-content-between">
          <div>
            <h5 className="card-title">Question</h5>
          </div>
          <div className="mr-2">
            <ActionContext.Consumer>
              {(context) => (
                <button type="button" className="btn btn-link p-0"
                  hidden={!flashcard.id}
                  onClick={() => context.deleteFlashcard(flashcard.id)}>X</button>
              )}
            </ActionContext.Consumer>
          </div>
        </div>
        {body}
      </div>
    </div>);
};

const View = ({ flashcard, toggleAnswer, toggleEditing }) => {
  return (
    <Fragment>
      <div className={spacer(['row', styles.editable])} onClick={toggleEditing}>
        <p className="card-text">{flashcard.question}</p>
      </div>
      <div className="row mt-3">
        <button type="button" className="btn btn-link p-0" onClick={toggleAnswer}>Show Answer</button>
      </div>
    </Fragment>);
};

export const validateFlashcard = (question, answer) => {
  return R.all(notBlank)([question, answer]);
};

const Edit = ({ flashcard, toggleEditing, onCancel }) => {
  const [isValid, setValid] = useState(false);
  const [questionFieldValue, setQuestionFieldValue] = useState(flashcard.question);
  const [answerFieldValue, setAnswerFieldValue] = useState(flashcard.answer);

  useEffect(() =>
    R.pipe(
      validateFlashcard,
      setValid
    )(questionFieldValue, answerFieldValue),
    [questionFieldValue, answerFieldValue]);

  const getFlashcard = () => ({
    ...flashcard,
    question: questionFieldValue,
    answer: answerFieldValue,
    isNew: false
  });

  const saveHandler = context => {
    toggleEditing();
    context.saveFlashcard(getFlashcard());
  };

  return (
    <Fragment>
      <div className="row">
        <div className="form-group">
          <textarea id="question" className="form-control"
            value={questionFieldValue} onChange={e => setQuestionFieldValue(e.target.value)}></textarea>
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="answer">Answer</label>
          <textarea id="answer" className="form-control"
            value={answerFieldValue} onChange={e => setAnswerFieldValue(e.target.value)}></textarea>
        </div>
      </div>
      <div className="row">
        <ActionContext.Consumer>
          {(context) => (
            <button type="button" className="btn btn-primary"
              disabled={!isValid}
              onClick={() => saveHandler(context)}>Save</button>
          )}
        </ActionContext.Consumer>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </Fragment>);
};

const Answer = ({ flashcard, toggleAnswer }) => {

  const rateHandler = (context, rating) => {
    toggleAnswer();
    context.rateAnswer(flashcard.id, rating);
  };

  return (
    <Fragment>
      <div className="row">
        <p className="card-text">{flashcard.question}</p>
      </div>
      <div className="row mt-3">
        {flashcard.answer}
      </div>
      <div className="row mt-3">
        <ActionContext.Consumer>
          {(context) => (
            <Fragment>
              <div className="col">
                <button type="button" className="btn btn-danger"
                  onClick={() => rateHandler(context, RATING.BAD)}>Bad</button>
              </div>
              <div className="col">
                <button type="button" className="btn btn-success"
                  onClick={() => rateHandler(context, RATING.GOOD)}>Good</button>
              </div>
              <div className="col">
                <button type="button" className="btn btn-info"
                  onClick={() => rateHandler(context, RATING.GREAT)}>Great</button>
              </div>
            </Fragment>
          )}
        </ActionContext.Consumer>
      </div>
    </Fragment>);
};

export default Flashcard;