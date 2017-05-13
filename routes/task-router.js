'use strict';

const express = require('express');
const Task = require('./../models/task');

const router = express.Router();

/**
 * Lista todas as terefas da base de dados.
 */
router.get('/tasks', function (req, res, next) {
    Task.find().then(function (tasks) {
        res.send(tasks);
    }).catch(next);
});

/**
 * Seleciana uma tarefa de acordo com o id.
 */
router.get('/tasks/:id', function (req, res, next) {
    Task.findById(req.params.id).then(function (task) {
        res.send(task);
    }).catch(next);
});

/**
 * Salva uma nova tarefa na base de dados.
 */
router.post('/tasks', function (req, res, next) {
    // Tratando os labels antes de salvar
    req.body.labels = labelsToArray(req.body.labels);

    // Salva na base de dados
    Task.create(req.body).then(function (task) {
        res.send(task);
    }).catch(next);
});

/**
 * Remove uma tarefa da base de dados de acordo com o id.
 */
router.delete('/tasks/:id', function (req, res, next) {
    Task.findByIdAndRemove(req.params.id).then(function (task) {
        res.send(task);
    }).catch(next);
});

/**
 * Atualiza uma tarefa na base de dados de acordo com o id.
 */
router.put('/tasks/:id', function (req, res, next) {
    // Tratando os labels antes de atualizar
    req.body.labels = labelsToArray(req.body.labels);

    Task.findByIdAndUpdate(req.params.id, req.body).then(function () {
        Task.findById(req.params.id).then(function (task) {
            res.send(task);
        });
    }).catch(next);
});

/**
 * Recebe uma string com as labels separadas por virgula
 * e retorna um array.
 * 
 * @param {String} labels 
 * @returns {Array}
 */
function labelsToArray(labels) {
    let labels_arr = [];
    console.log(labels);
    if (labels != undefined && labels.length > 0) {
        labels.split(",").forEach(function (item) {
            labels_arr.push(item.trim());
        });
    }
    return labels_arr;
}

module.exports = router;