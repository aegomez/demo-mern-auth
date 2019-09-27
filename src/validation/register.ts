import Validator from 'validator';

import { TUserProps } from '../models/user';
import { isEmpty, isUsername } from '../utils';

interface RegisterInputData extends TUserProps {
  password2: string;
}

const validateRegisterInput = (data: RegisterInputData) => {
  let errors: Partial<RegisterInputData> = {};

  // Normalize fiels as string so Validator can be used
  let { name, email, password, password2 } = data;
  name = isEmpty(name) ? '' : name + '';
  email = isEmpty(email) ? '' : email + '';
  password = isEmpty(password) ? '' : password + '';
  password2 = isEmpty(password2) ? '' : password2 + '';

  // Check fields
  if (Validator.isEmpty(name)) {
    errors.name = 'Username field is required';
  } else if (!isUsername(name)) {
    errors.name =
      'Username may only contain alphanumeric characters, single hyphens or underscores, and cannot begin or end with an hyphen or underscore';
  } else if (!Validator.isLength(name, { min: 1, max: 40 })) {
    errors.password = 'Username must be 1 to 40 characters long';
  }

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  } else if (!Validator.isLength(password, { min: 6, max: 99 })) {
    errors.password = 'Password must be 6 to 99 characters long';
  }

  if (Validator.isEmpty(password2)) {
    errors.password2 = 'Confirm password field is required';
  }

  if (!Validator.equals(password, password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateRegisterInput;
