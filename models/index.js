let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/movie-app", {useNewUrlParser: true, useFindAndModify: false});

module.exports = {
    Movie: require("./movie.js"),
    Review: require("./review.js"),
};