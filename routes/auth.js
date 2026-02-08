const express = require('express');
const { register, login } = require('../controllers/authController');
const { registerSchema, loginSchema } = require('../middleware/validation');
const { validate } = require('joi');

const router = express.Router();

router.post('/register', async (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
}, register);

router.post('/login', async (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
}, login);

module.exports = router;
