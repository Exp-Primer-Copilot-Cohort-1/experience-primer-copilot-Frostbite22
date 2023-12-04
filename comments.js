// Create web server

// Load modules
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const comments = require('./comments.json');

// Set up body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set up static file server
app.use(express.static(path.join(__dirname, 'public')));

// Set up route to handle comments
app.post('/comments', function(req, res) {
  // Create comment object
  const comment = {
    name: req.body.name,
    comment: req.body.comment,
  };

  // Add comment to comments array
  comments.push(comment);

  // Save comments to comments.json file
  fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Comment saved');
    }
  });
});

// Set up route to handle comments
app.get('/comments', function(req, res) {
  res.json(comments);
});

// Start server
app.listen(3000, function() {
  console.log('Server started on port 3000');
});