const Joi = require("@hapi/joi");

const login = (data) => {
  const schema = {
    eMail: Joi.string().max(200).required(),
    Password: Joi.string().max(99).required(),
  };
  return Joi.validate(data, schema);
};

const register = (data) => {
  const schema = (data = {
    Name: Joi.string().max(255).required(),
    eMail: Joi.string().max(200).required(),
    Password: Joi.string().min(6).max(255).required(),
  });
  return Joi.validate(data, schema);
};

module.exports.login = login;
module.exports.register = register;
