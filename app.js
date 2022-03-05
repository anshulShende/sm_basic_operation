var express = require('express');
const cookieParser = require('cookie-parser');
var path = require('path');
var cors = require('cors');
const db = require('./config/dbconfig');
require('dotenv').config();
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.once('open', ()=>{
    console.log('Connected to Mongo DB Atlas');
});

db.on('error', (err) => {
    console.log(err);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
