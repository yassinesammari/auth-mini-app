import { createReducer, on } from '@ngrx/store';
import { updateUser } from './user.actions';
import { User } from '../data/Models/User.model';

export interface UserState {
  user: User | null;
}
export const initialState: UserState = {
  user: null,
};
export const userReducer = createReducer(
  initialState,
  on(updateUser, (state, { user }) => ({ ...state, user })),
);
