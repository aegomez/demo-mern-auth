import Validator from 'validator';

import { TUserProps } from '../models/user';
import { isEmpty } from '../utils';

interface RegisterInputData extends TUserProps {
  password2: string;
}

const validateRegisterInput = (data: RegisterInputData) => {
  let errors: Partial<RegisterInputData> = {};

  // Normalize fiels as string so Validator can be used
  let { name, email, password, password2 } = data;
  if (isEmpty(name)) name = '';
  if (isEmpty(email)) email = '';
  if (isEmpty(password)) password = '';
  if (isEmpty(password2)) password2 = '';

  // Check fields
  if (Validator.isEmpty(name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  if (Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be 6 to 30 characters long';
  }

  if (Validator.isEmpty(password2)) {
    errors.password2 = 'Confirm password field is required';
  }

  if (Validator.equals(password, password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateRegisterInput;
