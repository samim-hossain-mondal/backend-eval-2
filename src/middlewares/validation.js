const Joi = require('joi');
const HttpErrors = require('../utils/customError');

const getDataSchema = Joi.object({
  id: Joi.number().required(),
  company_id: Joi.number().required(),
  company_sector: Joi.string().required()
});

const validateDataSchema = (req, res, next) => {
  const { error } = getDataSchema.validate(req.body);
  if (error) {
    throw new HttpErrors(400, error.message);
  }
  next();
};

module.exports = { validateDataSchema };