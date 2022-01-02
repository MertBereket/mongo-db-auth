//const joi = require("joi");
const Joi = require("@hapi/joi");

const find = (data) => {
  const schema = {
    _id: Joi.string().required(),
  };
  return Joi.validate(data, schema);
};

const update = (data) => {
  const schema = {
    _id: Joi.string(),
    Name: Joi.string().max(100),
    Surname: Joi.string().max(100),
    City: Joi.string().max(255),
    eMail: Joi.string().max(200).email(),
    Password: Joi.string().max(99),
    UpdatedAt: Joi.date(),
  };
  return Joi.validate(data, schema);
};

const insert = (data) => {
  const schema = {
    Name: Joi.string().max(100).required(),
    Surname: Joi.string().max(100).required(),
    eMail: Joi.string().max(200).email().required(),
    Password: Joi.string().max(99).required(),
    City: Joi.string().max(255).required(),
    CreatedAt: Joi.date(),
  };
  return Joi.validate(data, schema);
};

module.exports.find = find;
module.exports.update = update;
module.exports.insert = insert;
