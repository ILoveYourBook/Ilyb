import { LOAD_USER_ACTION } from '../constants';
import { User } from '../../types/User';

export const loadUserAction = (user: User) => ({
  type: LOAD_USER_ACTION,
  payload: user,
});
