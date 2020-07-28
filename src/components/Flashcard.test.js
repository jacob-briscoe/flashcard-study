import { validateFlashcard } from './Flashcard';

describe('validateFlashcard', () => {

  it('is valid', () => {
    expect(validateFlashcard('a', 'b')).toBeTruthy();
    expect(validateFlashcard('1', ' b ')).toBeTruthy();
    expect(validateFlashcard(' 1aa', ' b  a ')).toBeTruthy();
  });

  it('is invalid', () => {
    expect(validateFlashcard('', 'b')).toBeFalsy();
    expect(validateFlashcard('1', '  ')).toBeFalsy();
    expect(validateFlashcard('1', null)).toBeFalsy();
    expect(validateFlashcard(undefined, ' b  a ')).toBeFalsy();
  });

});