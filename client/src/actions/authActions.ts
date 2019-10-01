import ky from 'ky';
import jwtDecode from 'jwt-decode';
import { Dispatch } from 'redux';

import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

// Register User
export const registerUser = (userData, history) => (dispatch: Dispatch) => {
  ky.post('/api/users/register', userData)
    .then(_ => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => (dispatch: Dispatch) => {
  ky.post('/api/users/login', userData)
    .then(res => res.json())
    .then(data => {
      // Save token to localStorage
      const { token } = data;
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwtDecode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set logged in user
export const setCurrentUser = (decoded: any) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => (dispatch: Dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which
  // will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
