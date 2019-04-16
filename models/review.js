const mongoose = require('mongoose');
    Schema = mongoose.Schema;

    const ReviewSchema = new Schema ({
        name: String
        review: String
    });

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;