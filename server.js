const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

// BodyParser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Serve Static Assets
app.use(express.static(__dirname + '/public'));

// ROUTES

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

// Start Server
app.listen(PORT, () => console.log(`Server  running on port ${PORT}`));
