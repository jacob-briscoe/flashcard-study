import * as R from 'ramda';

export const RATING = {
  UNRATED: -1,
  BAD: 0,
  GOOD: 1,
  GREAT: 2
};

export const initModel = [];

const cardId = R.lensProp('id');

const ratingProp = R.lensProp('rating');

const maxCardId = R.reduce((acc, value) => R.max(acc, R.view(cardId, value)), 0);

const nextCardId = R.pipe(
  maxCardId,
  R.inc
);

const getRating = R.view(ratingProp);

export const setRating = rating => R.set(ratingProp, rating);

export const unratedToBest = R.ascend(getRating);

export const idEquals = id => R.propEq('id', id);

export const findCardIndexById = id => R.findIndex(idEquals(id));

export const createFlashcard = cards => ({
  id: nextCardId(cards),
  question: '',
  answer: '',
  isNew: true,
  rating: RATING.UNRATED
});

const stringLength = s => s.length;

export const notBlank = R.pipe(
  R.defaultTo(''),
  R.trim,
  stringLength,
  R.lt(0)
);

export const spacer = R.join(' ');
