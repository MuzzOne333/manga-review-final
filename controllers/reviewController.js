const Review = require('../models/Review');

const createReview = async (req, res) => {
    try {
        const review = new Review({
            ...req.body,
            author: req.user.id
        });
        await review.save();
        await review.populate('author', 'username');
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('author', 'username').sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('author', 'username');
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const review = await Review.findOneAndUpdate(
            { _id: req.params.id, author: req.user.id },
            req.body,
            { new: true, runValidators: true }
        ).populate('author', 'username');

        if (!review) {
            return res.status(404).json({ message: 'Review not found or unauthorized' });
        }
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({ _id: req.params.id, author: req.user.id });
        if (!review) {
            return res.status(404).json({ message: 'Review not found or unauthorized' });
        }
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
};
