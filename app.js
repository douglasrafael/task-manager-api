'use strict';

const app = require('./config/app-config');
const db = require('./config/db-config');

// inicializando as rotas
app.use('/api', require('./routes/task-router'));

module.exports = app;