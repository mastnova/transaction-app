const express = require('express');
var bodyParser = require('body-parser')

const app = express();
const PORT = 8080;

app.use( express.static( __dirname + '/dist') );
app.use( bodyParser.json({strict: false}) );

app.get('/api/transactions', function (req, res) {
	res.sendFile(__dirname + '/data-transactions.json');
});

app.get('/api/banks', function (req, res) {
	res.sendFile(__dirname + '/data-banks.json');
});

app.post('/api/auth', function (req, res) {
	console.log('user login: ' + req.body.login);
	console.log('user password: ' + req.body.password)
	res.status(200);
	res.end();
});

app.post('/api/add_transaction', function (req, res) {
	console.log(`got new transaction:[amount: ${req.body.amount} bankId: ${req.body.bankId}]`);
	res.status(200);
	res.end();
});

app.get('*', function (req, res) {
	res.sendFile(__dirname +'/app/index.html')
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
