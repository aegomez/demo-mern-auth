import ky from 'ky';
import jwtDecode from 'jwt-decode';
import { Dispatch } from 'redux';
import { History } from 'history';

import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

type RegisterData = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

type LoginData = {
  nameOrEmail: string;
  password: string;
};

// Register User
export const registerUser = (userData: RegisterData, history: History) => (
  dispatch: Dispatch
) => {
  ky.post('/api/users/register', {
    json: userData
  })
    .then(_ => history.push('/login'))
    .catch(err => {
      const { response } = err;
      // check if error comes from API
      if (response.status === 400) {
        return response.json();
      } else {
        // external error
        throw err;
      }
    })
    .then(errorData =>
      dispatch({
        type: GET_ERRORS,
        payload: errorData
      })
    )
    .catch(console.error);
};

// Login - get user token
export const loginUser = (userData: LoginData) => (dispatch: Dispatch) => {
  ky.post('/api/users/login', {
    json: userData
  })
    .json<any>()
    .then(response => {
      // Save token to localStorage
      const { token } = response;
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwtDecode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      const { response } = err;
      // check if error is from API
      if (response.status === 400 || response.status === 404) {
        return response.json();
      } else {
        // external error
        throw err;
      }
    })
    .then(errorData =>
      dispatch({
        type: GET_ERRORS,
        payload: errorData
      })
    )
    .catch(console.error);
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
  dispatch(setCurrentUser(''));
};

export const RootActions = {
  auth: { registerUser, loginUser, setCurrentUser, setUserLoading, logoutUser }
};
