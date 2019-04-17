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
        name: "katie jones"
        review: "the movie was mind blowing"
    },
    {
        name: "george clooney"
        review: "im in that movie i think?"
    }
];

db.Review.deleteMany({}, (err, reviews) => {
    if (err) return console.log(err);
    console.log('removed all reviews');
    db.Review.create(review_list, (err, authors) => {
        if (err) return console.log(err);
        console.log('recreated all reviews');
        console.log(`created ${reviews.length} reviews`);

        db.Movie.deleteMany({}, (err, movies) => {
            if (err) return console.log(err);
            console.log('removed all movies');

            movies_list.forEach(movieData => {
                const movie = new db.Movie({
                    title: movieData.title,
                    year: movieData.year,
                    rating: movieData.rating
                    
                });

                db.Review.findOne({name: movieData.review}, (err, foundReview) => {
                    console.log(`found review ${foundReview.name} for movie ${movie.title}`);
                    if (err) return console.log(err);
                    

                    movie.review = foundReview;
                    movie.save((err, savedMovie) => {
                        if (err) return console.log(err);
                        console.log(`saved ${savedMovie.title} by ${foundReview.name}`);
                    });
                });
            });
        });
    });
});
//remove all data that match {} //

// db.Movie.deleteMany({}, function(err, movie) {
//     if(err) {
//         console.log('error occured in remove', err);
//     } else {
//         console.log('remove all movies');

//         db.Movie.create(movie_list, function(err, movie) {
//             if(err) { return console.log('err',err); }
//             console.log("created", movie.length, "movie");
//             process.exit();
//         });
//     }
// });