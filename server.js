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
// app.get('/api/movie', (req,res) => {
//     db.Movie.find({}, (err, movie) => {
//         if (err) return console.log (`index error: ${err}`);
//         res.json(movie);
//     });
// });

//create movie
// create new movie
app.post('/api/movies', function (req, res) {
    db.Movie.create(req.body, (err, newMovie) => {
      if (err) return res.status(500).json({msg: 'Something went wrong. Please try again'});
      res.json(newMovie);
    });
  });

  //

// update movie
app.put('/api/movies/:id', function(req,res){
    db.Movie.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedMovie) => {
      if (err) return res.status(400).json({msg: 'Book ID does not exist'});
      res.json(updatedMovie);
    });
  });
  
  // delete movie
  app.delete('/api/movies/:id', function (req, res) {
    db.Movie.findByIdAndRemove(req.params.id, (err, deletedMovie) => {
      if (err) return res.status(400).json({msg: 'Book ID does not exist'});
      res.json(deletedMovie);
    });
  });

  //for REview//


  
  
  
// Start Server
app.listen(process.env.PORT || 3000, () => console.log('movie app listening at http://localhost:3000/'));