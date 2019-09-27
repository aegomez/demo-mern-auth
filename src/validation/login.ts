import Validator from 'validator';

import { isEmpty } from '../utils';

interface LoginInputData {
  nameOrEmail: string;
  password: string;
}

const validateLoginInput = (data: LoginInputData) => {
  let errors: Partial<LoginInputData> = {};

  // Normalize fiels as string so Validator can be used
  let { nameOrEmail, password } = data;
  nameOrEmail = isEmpty(nameOrEmail) ? '' : nameOrEmail + '';
  password = isEmpty(password) ? '' : password + '';

  // Check fields
  if (Validator.isEmpty(nameOrEmail)) {
    errors.nameOrEmail = 'Name/Email field is required';
  } else if (!Validator.isLength(nameOrEmail, { min: 1, max: 40 })) {
    errors.password = 'Incorrect username or password';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  } else if (!Validator.isLength(password, { min: 6, max: 99 })) {
    errors.password = 'Incorrect username or password';
  }

  return {
    errors,
    isEmail: Validator.isEmail(nameOrEmail),
    isValid: isEmpty(errors)
  };
};

export default validateLoginInput;
