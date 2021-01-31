import { AnyAction } from 'redux';
import { LOAD_USER_ACTION } from '../constants';

const initialState = {};

export function userReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case LOAD_USER_ACTION:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
