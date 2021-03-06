import { Dispatch } from 'react';
import { toast } from 'react-toastify';

import authValidation from '../validation/authValidation';
import users from './users.json';
import { SET_AUTH, CLEAR_USERS, CLEAR_POSTS, CLEAR_COMMENTS } from '../actions/types';
import { AuthAction } from '../models/AuthAction';


interface usersModal {
  [username: string]: string
};

const usersDb: usersModal = users;

// Validate auth details with schema
const validateInput = (username: string, password: string, dispatch: Dispatch<AuthAction>): boolean => {
  const { error } = authValidation.validate({ username, password });
  if (error) {
    dispatch({ type: SET_AUTH, auth: { status: 'unauthorized' } });
    toast.error(error.message);
    return false;
  }
  return true;
}

export const register = (username: string, password: string, dispatch: Dispatch<AuthAction>): boolean => {
  const isValid = validateInput(username, password, dispatch);
  if (!isValid) {
    return false;
  }

  // Check if user already exists
  if (usersDb[username]) {
    toast.error('User already exists');
    dispatch({ type: SET_AUTH, auth: { status: 'unauthorized' } });
    return false;
  }

  // create user and auth them

  dispatch({ type: SET_AUTH, auth: { status: 'authorized' } });
  return true;
};

export const login = (username: string, password: string, dispatch: Dispatch<AuthAction>): boolean => {
  const isValid = validateInput(username, password, dispatch);
  if (!isValid) {
    return false;
  }

  const user = usersDb[username];

  // Check if user exists
  if (!user) {
    toast.error(`User doesn't exist`);
    dispatch({ type: SET_AUTH, auth: { status: 'unauthorized' } });
    return false;
  }

  // Check if the provided password was correct
  if (user !== password) {
    toast.error(`Wrong password`);
    dispatch({ type: SET_AUTH, auth: { status: 'unauthorized' } });
    return false;
  }

  // Set the auth status
  dispatch({ type: SET_AUTH, auth: { status: 'authorized' } });

  return true;
};

export const logout = (dispatch: Dispatch<any>): boolean => {
  dispatch({ type: SET_AUTH, auth: { status: 'unauthorized' } });
  dispatch({ type: CLEAR_USERS });
  dispatch({ type: CLEAR_POSTS });
  dispatch({ type: CLEAR_COMMENTS });
  return true;
};

