'use strict';

const moment = require('moment');

const app = require('./config/app-config');
const db = require('./config/db-config');
const Task = require('./models/task');
const taskController = require('./controllers/task-controller');

/**
 * TRATANDO AS ROTAS
 */

/**
 * Exibe página inicial
 */
app.get('/api', function (request, response) {
    response.end('Welcome to API Task Manager');
});

/**
 * Seleciona todas as tarefas
 */
app.get('/api/tasks', function (request, response) {
    taskController.list(function (result) {
        response.json(result);
    });
});

/**
 * Seleciona uma tarefa de acordo com o id
 */
app.get('/api/tasks/:id', function (request, response) {
    let id = request.params.id;

    taskController.get(id, function (result) {
        response.json(result);
    });
});

/**
 * Salva uma nova tarefa
 */
app.post('/api/tasks', function (request, response) {
    let task = new Task();
    task.title = request.body.title;
    task.description = request.body.description;
    let noticeDate = request.body.noticeDate;
    if (noticeDate != undefined)
        task.noticeDate = moment(noticeDate).format();
    if (request.body.priority != undefined && request.body.priority != null)
        task.priority = request.body.priority;
    task.completionDate = request.body.completionDate;

    // Tratando as labels
    let labels = request.body.labels;
    let labels_arr = [];

    if (labels != undefined && labels.length > 0) {
        labels.split(",").forEach(function (item) {
            labels_arr.push(item.trim());
        });
    }
    task.labels = labels_arr;

    taskController.save(task, function (result) {
        response.json(result);
    });
});

/**
 * Remove uma tarefa de acordo com o id
 */
app.delete('/api/tasks/:id', function (request, response) {
    let id = request.params.id;

    taskController.delete(id, function (result) {
        response.json(result);
    });
});

/**
 * Atualiza os dados da tarefa.
 */
app.put('/api/tasks/:id', function (request, response) {
    let task = new Task();
    task._id = request.params.id;
    task.title = request.body.title;
    task.description = request.body.description;
    let noticeDate = request.body.noticeDate;
    if (noticeDate != undefined)
        task.noticeDate = moment(noticeDate).format();
    if (request.body.priority != undefined && request.body.priority != null)
        task.priority = request.body.priority;
    task.isFinalized = request.body.isFinalized;
    task.completionDate = request.body.completionDate;

    // Tratando as labels
    let labels = request.body.labels;
    let labels_arr = [];

    if (labels != undefined && labels.length > 0) {
        labels.split(",").forEach(function (item) {
            labels_arr.push(item.trim());
        });
    }
    task.labels = labels_arr;

    taskController.update(task, function (result) {
        response.json(result);
    });
});