import Validator from 'validator';

import { TUserProps } from '../models/user';
import { isEmpty } from '../utils';

interface LoginInputData extends TUserProps {
  password2: string;
}

const validateLoginInput = (data: LoginInputData) => {
  let errors: Partial<LoginInputData> = {};

  // Normalize fiels as string so Validator can be used
  let { name, password } = data;
  if (isEmpty(name)) name = '';
  if (isEmpty(password)) password = '';

  // Check fields
  if (Validator.isEmpty(name)) {
    errors.name = 'Name/Email field is required';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateLoginInput;
