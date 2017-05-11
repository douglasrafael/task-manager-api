const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const allowCors = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '127.0.0.1:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');

	next();
};

app.use(allowCors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({	extended: true }));

// levanta o server na porta 3000
app.listen(3000);

module.exports = app;