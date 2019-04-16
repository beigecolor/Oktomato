//Server side javaScript //
//server.js //

// express in app //
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

//Database
const db = require('./models');

// Serve Static Assets
app.use(express.static('public'));

// BodyParser Middleware
app.use(bodyParser.urlencoded({extended: true}));

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
app.get ('/api/movies', (req, res) => res.send(movies));

// get all books
app.get('/api/movie', (req,res) => {
    db.Movie.find({}, (err, movie) => {
        if (err) return console.log (`index error: ${err}`);
        res.json(movie);
    });
});

//create movie
app.post('/api/movie', (req, res) => {
    const newMovie = new db.Movie({
        title: req.body.title,
        year: req.body.year,

    });
});
// Start Server
app.listen(process.env.PORT || 3000, () => console.log('movie app listening at http://localhost:3000/'));