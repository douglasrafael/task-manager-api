'use strict';

const chai = require('chai')
const assert = chai.assert
const expect = chai.expect
const should = chai.should()

const request = require('supertest')

const app = require('../app')
const User = require('../models/user')

describe('Test API /users', function () {
    const userTest = {
        firstName: 'Test',
        lastName: 'API',
        email: 'test@mail.com',
        password: '123456'
    }

    before('Limpa collection User e adiciona usuário test', function (done) {
        User.remove({}, function (err) {
            if (err) return done(err)

            User.create(userTest, function (err, res) {
                if (err) return done(err)
                done()
            })
        })
    })

    after(function (done) {
        User.remove({}, function (err) {
            if (err) return done(err)
            done()
        })
    })

    describe('Autenticação do usuário', function () {
        it('Deve retornar status 403/usuário inválido', function (done) {
            request(app)
                .post('/api/users/authenticate')
                .send({ email: 'test@mail.com', password: '1234' })
                .expect(403, done)
        });

        it('Deve retornar 200 e dados do usuário autenticado', function (done) {
            request(app)
                .post('/api/users/authenticate')
                .send({ email: 'test@mail.com', password: '123456' })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err)

                    expect(res.body.user).to.be.an('object')
                    expect(res.body.user).to.have.property('_id')
                    expect(res.body.user).to.have.property('firstName')
                    expect(res.body.user).to.have.property('lastName')
                    expect(res.body.user).to.have.property('email')
                    expect(res.body).to.have.property('token')

                    done()
                })
        })

        // it('Não deve autenticar usuário pois email é inválido', function (done) {
        //     request(app)
        //         .post('/api/users/authenticate')
        //         .send({ email: 'test123@mail.com', password: '1234' })
        //         .expect(403, done)
        // });
    });

    describe('Atulização dos dados de usuário.', function () {
        var userToken = '';

        before('Obter token do usuário', function (done) {
            request(app)
                .post('/api/users/authenticate')
                .send(userTest)
                .end(function (err, res) {
                    if (err) return done(err)

                    userToken = res.body.token
                    done();
                })
        })

        it('Deve atualizar dados do usuário', function (done) {
            request(app)
                .put('/api/users')
                .set('Authorization', 'JWT '.concat(userToken))
                .send({ firstName: 'Test Update', lastName: 'API Update' })
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err)

                    expect(res.body.firstName).to.not.equal(userTest.firstName)
                    expect(res.body.lastName).to.not.equal(userTest.lastName)

                    done()
                })
        })

        describe("Atualização de password", function () {
            it('Não deve atualizar password do usuário, pois senha atual estar errada', function (done) {
                request(app)
                    .put('/api/users/password')
                    .set('Authorization', 'JWT '.concat(userToken))
                    .send({ passwordOld: 'test123', password: 'nova123' })
                    .expect(403, done)
            })

            it('Deve atualizar password do usuário', function (done) {
                request(app)
                    .put('/api/users/password')
                    .set('Authorization', 'JWT '.concat(userToken))
                    .send({ passwordOld: '123456', password: 'nova123' })
                    .expect(201)
                    .end(function (err, res) {
                        if (err) return done(err)

                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('firstName')
                        expect(res.body).to.have.property('lastName')
                        expect(res.body).to.have.property('email')

                        done()
                    })
            })
        })
    })
})