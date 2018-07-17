// Author: CA

//Barebones express webserver for FbCommentAnalytic
//module dependencies
var cors = require('cors');
var express = require('express');
var app = express();
var path = require('path');

// Enable CORS
app.use(cors());
// Enable pre-flight for AWS S3
app.options('*', cors()); // include before other routes

app.use(express.static(path.join(__dirname, 'www/')));
app.get('*', function(){});

app.listen(4000, function () {
  console.log('Server is listening on port 4000');
})

