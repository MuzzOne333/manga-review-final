const express = require('express');
const authMiddleware = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/userController');
const { reviewSchema } = require('../middleware/validation');

const router = express.Router();

router.use(authMiddleware);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

module.exports = router;
