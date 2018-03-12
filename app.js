'use strict';

// Obtendo as dependencias
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./config/passport')(require('passport'));
const fs = require('fs');
const https = require('https');
const forceSSL = require('express-force-ssl');

// stating db
const db = require('./config/db-config');

const app = express();

const allowCors = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.header('Accept-Charset', 'utf-8');
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
};

/**
 * Parsers para dados POST
 */
app.use(allowCors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use the passport package in our application
app.use(passport.initialize());

// Apontar o caminhos estáticos
app.use(express.static(path.resolve('./public')));

/**
 * Definir as rotas da API REST
 */
app.use('/api/tasks', require('./routes/task-router'));
app.use('/api/users', require('./routes/user-router'));

/**
 * Obter a porta do ambiente e armazenar no Express.
 */
const port = process.env.PORT || 443;
app.set('port', port);

/**
 * HTTPS
 */
const key = fs.readFileSync('./cert/server.key');
const cert = fs.readFileSync('./cert/server.crt');

const options = {
  key: key,
  cert: cert
};

// app.use(forceSSL);
// create server https
https.createServer(options, app).listen(port, function () {
  // console.log('Node app HTTPS is running on port', port);
});

module.exports = app;