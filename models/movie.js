const mongoose = require('mongoose');
    Schema = mongoose.Schema;

const MovieSchema = new Schema ({
    title: String,
    year: String,
    rating: Number,
    review: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    },
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;