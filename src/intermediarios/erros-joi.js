const joi = require('joi');

const joiError = async (error, req, res, next) => {
  if (error instanceof joi.ValidationError) {
    res.status(400).json({ mensagem: error.message });
  } else {
    next(error);
  }
};

module.exports = joiError;
