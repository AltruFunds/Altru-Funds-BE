const Joi = require('joi');
const { password } = require('../utils/custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      phonenumber: Joi.string(),
      gender: Joi.string(),
      image: Joi.string(),
      address: Joi.string(),
      city: Joi.string(),
      country: Joi.string(),
      validIdNumber: Joi.string(),
    })
    .min(1),
};

const updateUserRole = {
  params: Joi.object().keys({
    userId: Joi.required(),
    roleName: Joi.string().required().valid('user', 'admin'),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  updateUserRole,
  deleteUser,
};
