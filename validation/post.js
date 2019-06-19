const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBlogPostInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.title = !isEmpty(data.title) ? data.title : '';
  data.post = !isEmpty(data.post) ? data.post : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to be between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Post handle is required';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.post)) {
    errors.post = 'Post field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
