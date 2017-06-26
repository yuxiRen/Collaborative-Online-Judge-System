var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://user1:user1@ds133321.mlab.com:33321/shutian');

var restRouter = require('./routes/rest.js');
app.use('/api/v1', restRouter);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
