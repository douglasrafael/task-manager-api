'use strict';

const express = require('express');
const Task = require('./../models/task');

const router = express.Router();

/**
 * Lista todas as terefas da base de dados.
 */
router.get('/tasks', function (req, res, next) {
    Task.find().then(function (tasks) {
        res.status(200).send(tasks);
    }).catch(next);
});

/**
 * Seleciana uma tarefa de acordo com o id.
 */
router.get('/tasks/:id', function (req, res, next) {
    Task.findById(req.params.id).then(function (task) {
        res.status(200).send(task);
    }).catch(function (err, next) {
        res.status(404).send(err);
    });
});

/**
 * Salva uma nova tarefa na base de dados.
 */
router.post('/tasks', function (req, res, next) {
    if (typeof req.body.labels === 'string') {
        // Tratando os labels antes de salvar
        req.body.labels = labelsToArray(req.body.labels);
    }

    // Salva na base de dados
    Task.create(req.body).then(function (task) {
        res.status(201).send(task);
    }).catch(function (err, next) {
        res.status(400).send(err);
    });
});

/**
 * Remove uma tarefa da base de dados de acordo com o id.
 */
router.delete('/tasks/:id', function (req, res, next) {
    Task.findByIdAndRemove(req.params.id).then(function (task) {
        res.send(task);
    }).catch(function (err, next) {
        res.status(404).send(err);
    });
});

/**
 * Atualiza uma tarefa na base de dados de acordo com o id.
 */
router.put('/tasks/:id', function (req, res, next) {
    // Tratando os labels antes de atualizar
    req.body.labels = labelsToArray(req.body.labels);

    Task.findByIdAndUpdate(req.params.id, req.body).then(function () {
        Task.findById(req.params.id).then(function (task) {
            res.status(201).send(task);
        });
    }).catch(function (err, next) {
        res.status(404).send(err);
    });
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

    if (labels != undefined && labels.length > 0) {
        labels.split(",").forEach(function (item) {
            labels_arr.push(item.trim());
        });
    }
    return labels_arr;
}

module.exports = router;