const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const reviewSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    mangaTitle: Joi.string().min(2).max(100).required(),
    rating: Joi.number().min(1).max(10).required(),
    content: Joi.string().min(10).max(5000).required(),
    genres: Joi.array().items(Joi.string())
});

module.exports = {
    registerSchema,
    loginSchema,
    reviewSchema
};
