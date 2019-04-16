//Server side javaScript //
//server.js //

// express in app //
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

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
app.get('/', (req, res) => {
    res.send('hello world');
});

//get all movies
app.get ('/api/movies', (req, res) => res.send(movies));


// Start Server
app.listen(PORT, () => console.log(`Server  running on port ${PORT}`));
