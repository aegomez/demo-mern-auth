import { ActionType, StateType } from 'typesafe-actions';

export const GET_ERRORS = 'GET_ERRORS';
export const USER_LOADING = 'USER_LOADING';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

declare module 'typesafe-actions' {
  export type Store = StateType<typeof import('../store').default>;

  export type RootState = StateType<typeof import('../reducers').default>;

  export type RootAction = ActionType<
    typeof import('../actions/authActions').RootActions
  >;

  interface Types {
    RootAction: RootAction;
  }
}
