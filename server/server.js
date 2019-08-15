const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

const keys = require('./config/keys');

const app = express();

// start mongo db
mongoose.connect(keys.mongoURI);

// Configure cookie session
app.use(cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys: [keys.cookieKey]
}));

// configure passport cookies
app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
	console.log(`Listing on port ${PORT}`);
})

module.exports = app;
