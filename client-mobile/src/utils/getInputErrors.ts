import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

const getInputErrors = (validationErrors: ValidationError): Errors => {
  const errors: Errors = {};

  validationErrors.inner.forEach(err => {
    errors[err.path] = err.message;
  });

  return errors;
};

export default getInputErrors;
