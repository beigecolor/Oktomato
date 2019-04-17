// seed the application with data//
//run seed at root of folder//

const db = require('./models');

const movie_list = [
    {
        title: 'the lord of the rings 2',
        year: 2002,
        rating: 8,
        reviewer: "j lipardo"
    },
    {
        title: 'Ghost Busters',
        year: 1984,
        rating: 8,
        reviewer: "katie jones"
    },
    {
        title: 'footloose',
        year: 1984,
        rating: 7,
        reviewer: "george clooney"
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
db.Review.deleteMany({}, function(err, reviews) {
    console.log('removed all reviews');
    db.Review.create(review_list, function(err, reviews){
      if (err) {
        console.log(err);
        return;
      }
      console.log('recreated all reviews');
      console.log("created", reviews.length, "reviews");


      db.Movie.deleteMany({}, function(err, movies){
        console.log('removed all movies');
        movie_list.forEach(function (movieData) {
          const movie = new db.Movie({
            title: movieData.title,
            year: movieData.image,
            rating: movieData.rating
          });
          db.Review.findOne({name: movieData.review}, function (err, foundReview) {
            // console.log('found review ' + foundReview.name + ' for movie ' + movie.title);
            if (err) {
              console.log(err);
              return;
            }
            movie.review = foundReview;
            movie.save(function(err, savedMovie){
              if (err) {
                console.log(err);
              }
              // console.log('saved ' + savedMovie.title + ' by ' + foundReview.name);
            });
          });
        });
      });

    });
  });