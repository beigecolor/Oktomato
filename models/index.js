let mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/movie-app';

mongoose.connect(DB_URL, {useNewUrlParser: true, useFindAndModify: false});

module.exports = {
    Movie: require("./movie.js"),
    Review: require("./review.js"),
};