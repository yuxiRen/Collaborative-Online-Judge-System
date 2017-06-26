var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://Rita:123@ds139262.mlab.com:39262/cojs');

var restRouter = require('./routes/rest.js');
app.use('/api/v1', restRouter);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
