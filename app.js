'use strict';

const app = require('./config/app-config');
const db = require('./config/db-config');

// inicializando as rotas
app.use('/api', require('./routes/task-router'));

/**
 * Função para manipulação de erros
 */
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(422).send({error: err.message});
});