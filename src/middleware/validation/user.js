
const Joi = require("joi");
const User = require("../../models/user");

// const validator = (schema) => (payload) =>
// schema.validate(payload, { abortEarly: false});

exports.validate=(type, data)=>{
    const signupSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(10).required(),
    });

    const signinSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(10).required(),
    });

    if (type === "SIGNUP"){
        return signupSchema.validate(data)
    }
    if (type === "SIGNIN"){
        return signinSchema.validate(data)
    }
}
