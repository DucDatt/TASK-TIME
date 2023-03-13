import { User } from './../../app/model/user.model';
import { createReducer, on } from '@ngrx/store';
import { UserState } from '../states/user.state';
import { UserActions } from '../actions/user.action';

export const initialState: UserState = {
  user: <User>{},
  loading: false,
  error: '',
};

export const UserReducer = createReducer(
  initialState,
  on(UserActions.create, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      loading: true,
      error: '',
    };
  }),
  on(UserActions.createSuccess, (state, { user, type }) => {
    console.log(type);
    return {
      ...state,
      loading: false,
    };
  }),
  on(UserActions.createFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      loading: false,
      error: error,
    };
  }),
  on(UserActions.get, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      loading: true,
      error: '',
    };
  }),
  on(UserActions.getSuccess, (state, { user, type }) => {
    console.log(type);
    return {
      ...state,
      user: user,
      loading: false,
    };
  }),
  on(UserActions.getFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      loading: false,
      error: error,
    };
  }),
  on(UserActions.clearUserInfo, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      user: <User>{},
      loading: false,
      error: '',
    };
  })
);
