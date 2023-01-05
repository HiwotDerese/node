
const Joi = require("joi");

const validator = (schema) => (payload) =>
schema.validate(payload, { abortEarly: false});

// signup validation
const signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
});


// signin validation
const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
});


exports.validate = validator(signupSchema, signinSchema);