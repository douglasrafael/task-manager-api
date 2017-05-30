'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

const app = require('../app');
const request = require('supertest').agent(app);

const Task = require('../models/task');

describe('Teste de API - Rotas', () => {

    var id;
    var task;
    var task_post;

    // É executado ANTES de todos os testes neste bloco
    before((done) => {
        task = new Task({
            title: 'Task inserida para teste de api',
            completionDate: '2017-05-29',
            labels: ['teste', 'api', 'rotas', 'mocha', 'chai']
        }).save((err, res) => { // Insere
            if (err) return done(err);

            task = res;
            done();
        });
    });

    // É executado APÓS todos os testes neste bloco
    after(() => {
        removeTask(task._id);
    });

    describe('ROTAS GET', () => {
        it('GET /api/task - Deve retornar status 404 quando rota for inválida.', (done) => {
            request
                .get('/api/task')
                .expect(404)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });

        it('GET /api/tasks - Deve retornar lista de tasks.', (done) => {
            request
                .get('/api/tasks')
                .expect("Content-type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.charset).to.equal('utf-8');

                    expect(res.error).to.be.false;
                    expect(res.body).to.be.an('array');

                    // Espera pelo menos um registro >=
                    expect(res.body.length).to.be.at.least(1);

                    done();
                });
        });

        it('GET /api/tasks/12 - Retorna status 404 quando task não for encontrada.', (done) => {
            request
                .get('/api/tasks/12')
                .expect(404)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });

        it('GET /api/tasks/:_id - Deve retornar uma task de acordo com o _id.', (done) => {
            request
                .get('/api/tasks/' + task._id)
                .expect("Content-type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');

                    expect(res.body.labels).to.be.an('array').that.include('mocha');

                    expect(res.body.title).to.equal(task.title);

                    expect(res.body).to.have.property('noticeDate');
                    expect(res.body).to.have.property('priority').that.is.a('number');

                    done();
                });
        });
    });

    describe('ROTAS POST', () => {
        it('POST /api/tasks	- Não deve inserir uma task sem title e completionDate', (done) => {
            request
                .post('/api/tasks')
                .send({
                    description: 'Tentando inserir sem os campos obrigatórios: title e completionDate'
                })
                .expect(400)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('errors');
                    done();
                })
        });

        it('POST /api/tasks	- Deve inserir uma nova task e retornar o objeto inserido.', (done) => {
            let t = {
                title: 'Task inserida usando rota POST /api/tasks',
                description: 'Descrição da task',
                priority: 2, // 1 prioridade máxima, 2 média, 3 normal
                completionDate: '2017-05-28',
                labels: 'Test, POST',
                noticeDate: '2017-05-28 09:30:00',
                isFinalized: true
            };

            request
                .post('/api/tasks')
                .send(t)
                .expect("Content-type", /json/)
                .expect(201)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body).to.be.an('object');

                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('title');
                    expect(res.body).to.have.property('description');
                    expect(res.body).to.have.property('priority');
                    expect(res.body).to.have.property('completionDate');
                    expect(res.body).to.have.property('labels');
                    expect(res.body).to.have.property('noticeDate');
                    expect(res.body).to.have.property('isFinalized');
                    expect(res.body).to.have.property('created_at');
                    expect(res.body).to.have.property('updated_at');

                    expect(res.body.title).to.equal(t.title);

                    // remove a task inserida
                    removeTask(res.body._id);
                    done();
                });
        });
    });

    describe('ROTAS PUT', () => {
        it('PUT /api/tasks/:_id - Deve retornar erro 404 quando a task a ser atualizada não existir.', (done) => {
            request
                .put('/api/tasks/12')
                .send({ title: 'Não atualizar!!!' })
                .expect(404)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });

        it('PUT /api/tasks/:_id - Deve atualizar uma task de acordo com o _id e retornar o objeto atualizado.', (done) => {
            let t = {
                title: 'Task foi atualizada',
                isFinalized: true
            };

            request
                .put('/api/tasks/' + task._id)
                .send(t)
                .expect("Content-type", /json/)
                .expect(201)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body.title).to.equal(t.title);
                    expect(res.body.isFinalized).to.be.true;

                    done();
                });
        });
    });

    describe('ROTAS DELETE', () => {
        it('PUT /api/tasks/:_id - Deve retornar erro 404 quando a task a ser removida não existir.', (done) => {
            request
                .delete('/api/tasks/12')
                .expect(404)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404);
                    done();
                });
        });

        it('DELETE /api/tasks/:_id - Deve remover uma task de cordo com o _id e retornar o objeto removido.', (done) => {
            // Insere novamente uma nova task para depois tentar remover pela rota
            task.save(function (err, t) {
                request
                    .delete('/api/tasks/' + t._id)
                    .expect("Content-type", /json/)
                    .expect(200)
                    .end((err, res) => {
                        // expect(res.body).to.be.an('object');
                        done();
                    });
            });
        });
    });
});

function removeTask(id) {
    Task.findByIdAndRemove(id, (err, res) => {
        if (err) return done(err);
        done();
    });
}