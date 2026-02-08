const express = require('express');
const {
    getAllReviews,
    getReviewById
} = require('../controllers/reviewController');
const authMiddleware = require('../middleware/auth');
const {
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');
const { reviewSchema } = require('../middleware/validation');

const router = express.Router();

router.get('/', getAllReviews);
router.get('/:id', getReviewById);

router.use(authMiddleware);
router.post('/', async (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
}, createReview);

router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
