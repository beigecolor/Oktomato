// seed the application with data//
//run seed at root of folder//

const db = require('./models');

const movie_list = [
    {
        title: 'the lord of the rings 2',
        year: 2002,
        rating: 8,
        reviews: 'movie was great'
    },
    {
        title: 'Ghost Busters',
        year: 1984,
        rating: 8,
        reviews: 'takes me back to childhood'
    },
    {
        title: 'footloose',
        year: 1984,
        rating: 7,
        reviews: 'kevin is great!!'
    }
];

const review_list = [
    {
        name: "j lipardo",
        review: "the movie was great it was life changing"
    },
    {
        name: "katie jones",
        review: "the movie was mind blowing"
    },
    {
        name: "george clooney",
        review: "im in that movie i think?"
    }
];

//remove all data that match {} //

db.Movie.deleteMany({}, function(err, movie) {
    if(err) {
        console.log('error occured in remove', err);
    } else {
        console.log('remove all movies');

        db.Movie.create(movie_list, function(err, movie) {
            if(err) { return console.log('err',err); }
            console.log("created", movie.length, "movie");
            process.exit();
        });
    }
});