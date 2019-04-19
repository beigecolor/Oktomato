const mongoose = require('mongoose');
    Schema = mongoose.Schema;
    Review = require('./review');



const MovieSchema = new Schema ({
    title: String,
    year: Number,
    rating: Number,
    reviews: {type: Schema.Types.ObjectId, ref: 'Review'},
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;