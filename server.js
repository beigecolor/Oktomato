//Server side javaScript //
//server.js //

// express in app //
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

//Database
const db = require('./models');

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve Static Assets
app.use(express.static('public'));

// BodyParser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// DAta //

const movies = [
    {
        title: 'lord of the rings',
        year: 2001,
        rating: 8,
        review: 'The movie was awsome'
    },
    {
        title: 'the mechanic',
        year: 2011,
        rating: 6,
        review: 'Jason was dynamite'
    },
    {
        title: ''
    }
];

let newMovieUUID = 18;

// Routes //

// root route: localhost:3000//
app.get("/", (request, response) => {
    // send back the response: 'Hello World'
    response.sendFile('views/index.html', { root : __dirname});
  });
//get all movies
// app.get ('/api/movies', (req, res) => res.send(movies));

// get all movie
app.get('/api/movies', (req, res) => {
  db.Movie.find({})
  .populate('reviews')
  .exec((err, movies) => {
    if (err) return console.log(`error: ${err}`);
    res.json(movies);
  });
});

// Get one movie by ID
app.get('/api/movies/:id', (req,res) => {
    db.Movie.findById(req.params.id)
      .populate('reviews')
      .exec((err, movie) => {
        if (err) return console.log (`index error: ${err}`);
        res.json(movie);
    });
});

//create movie
// create new movie
app.post('/api/movies', function (req, res) {
    db.Movie.create(req.body, (err, newMovie) => {
      if (err) return res.status(500).json({msg: 'Something went wrong. Please try again'});
      db.Review.create({review: req.body.review}, (err, newReview) => {
        if (err) return res.status(400).json({msg: 'error creating review'});
        newMovie.reviews = newReview;
        newMovie.title = req.body.title;
        newMovie.year = req.body.year;
        newMovie.save((err, savedMovie) => {
          if (err) return res.status(400).json({msg: 'Error creating movie'});
        res.json(newMovie);
        });
      });
    });
  });

  //

// update movie
app.put('/api/movies/:id', function(req,res){
  db.Movie.findById(req.params.id, (err, foundMovie) => {
    if (err) return res.status(400).json({msg: 'Book ID does not exist'});
    db.Review.create({review: req.body.review}, (err, newReview) => {
      if (err) return res.status(400).json({msg: 'Error creating Review'});
      foundMovie.reviews = newReview;
      foundMovie.title = req.body.title;
      foundMovie.year = req.body.year;
      foundMovie.save((err, savedMovie) => {
        if (err) return res.status(400).json({msg: 'Error saving Review'});
        res.json(savedMovie);
      })
    })
  });
});

  // delete movie
  app.delete('/api/movies/:id', function (req, res) {
    db.Movie.findByIdAndRemove(req.params.id, (err, deletedMovie) => {
      if (err) return res.status(400).json({msg: 'movie ID does not exist'});
      res.json(deletedMovie);
    });
  });

  //for REview//


  
  
  
// Start Server
app.listen(PORT, () => console.log('movie app listening at http://localhost:3000/'));