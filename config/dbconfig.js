const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

module.exports = db;