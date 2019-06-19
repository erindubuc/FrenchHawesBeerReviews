const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  // First test for empty strings
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (_isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (_isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};