import { AnyAction } from 'redux';

const initialState = {};

export function ownedBooksReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case 'ownedBooks/load':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
