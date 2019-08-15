const clear         = require('clear');
const express       = require('express');
const passport      = require('passport');
const mongoose      = require('mongoose');
const cookieSession = require('cookie-session');

const keys = require('./config/keys');

require('./models/User');
require('./services/passport-service');

const app = express();
module.exports = app;

// start mongo db
mongoose.connect(keys.mongoURI)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// Configure cookie session
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: [ keys.cookieKey ]
}));

// configure passport cookies
app.use( passport.initialize() );
app.use( passport.session() );

// Load routes
const authRoutes = require('./routes/auth-routes');

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
	clear();
	console.log(`Listing on port ${PORT}`);
});
