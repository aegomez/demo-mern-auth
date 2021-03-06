import { AnyAction } from 'redux';
import { isEmpty } from 'validator';

import { SET_CURRENT_USER, USER_LOADING } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

const authReducers = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload + ''),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default authReducers;
