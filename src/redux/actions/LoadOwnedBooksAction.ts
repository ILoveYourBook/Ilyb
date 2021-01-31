import { Book } from '../../types/Book';
import { LOAD_OWNED_BOOKS_ACTION } from '../constants';

export const loadOwnedBooksAction = (books: Array<Book>) => ({
  type: LOAD_OWNED_BOOKS_ACTION,
  payload: books,
});
