import { createAction, props } from '@ngrx/store';
import { User } from '../data/Models/User.model';

export const updateUser = createAction('[User] Update User', props<{ user: User }>());
