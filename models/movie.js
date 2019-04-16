const mongoose = rewuire('mongoose');
    Schema = mongoose.Schema;

const MovieSchema = new Schema ({
    title: String,
    year: String,
    rating: Number,
    review: String
});

module.exports = Movie;