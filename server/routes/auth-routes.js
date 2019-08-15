const passport = require('passport');

const app = require('../index');

app.get('/', (req, res) => {
	return res.json({
		greeting: "Hello World"
	})
});

app.get('/auth/google', passport.authenticate('google', {
	scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
	res.send({
		login: true
	})
});

app.get('/api/current_user', (req, res) => {
	res.send(`${req.user}`);
});

app.get('/api/logout', (req, res) => {
	req.logout();
	res.send(req.user);
});
