const Joi = require("joi");

const registerValidation = (data) => {
	const validUser = Joi.object({
		name: Joi.string().min(3).max(255).required(),
		username: Joi.string().min(5).max(255).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(1024).required(),
	});
	return validUser.validate(data);
};

const loginValidation = (data) => {
	const validUser = Joi.object({
		username: Joi.string().min(5).max(255).required(),
		password: Joi.string().min(8).max(1024).required(),
	});
	return validUser.validate(data);
};

module.exports = { registerValidation, loginValidation };
