const app = require('../src/server/routes')
var session = require('supertest-session');
var chai = require('chai');
var should = chai.should();
var rewire = require('rewire');
var request = require('supertest');

var express = require('express');
var authenticatedUser = request.agent('http://localhost:8080/');


var testSession = null;
var cookie;

var sap = rewire('../src/server/routes');


describe('before authentication',function () {
    beforeEach(function () {
        testSession = session(app);
    })

    it('should fail accessing the restricted page 1', function (done) {
        testSession.get('/main/data')
            .expect(404)
            .end(done)
    });

    it('should fail accessing the restricted page 2', function (done) {
        testSession.get('/db')
            .expect(404)
            .end(done)
    });

    it('should fail accessing the restricted page 3', function (done) {
        testSession.get('/addRequest')
            .expect(404)
            .end(done)
    });

    it('should fail accessing the restricted page 4', function (done) {
        testSession.get('/allRequests')
            .expect(404)
            .end(done)
    });
    it('should access login page', function (done) {
        testSession.get('/login')
            .expect(200)
            .end(done)
    });

})

describe('after Authentication session for Correct User', function () {
    var authenticatedSession;

    beforeEach(function (done) {
        testSession.post('/login')
            .type('form')
            .send({ username: 'vs056645', password: 'QwErT1@3' })
            .expect(302)
            .end(function (err) {
                if (err) return done(err);
                authenticatedSession = testSession;
                return done();
            });
    });

    it('should get the main page', function (done) {
        authenticatedSession.get('/main')
            .expect(200)
            .end(done)
    });

    it('should get the restricted page 1', function (done) {
        authenticatedSession.get('/main/data')
            .expect(200)
            .end(done)
    });

    it('should get the restricted page 2', function (done) {
        authenticatedSession.get('/db')
            .expect(200)
            .end(done)
    });

    it('should access logout', function (done) {
        authenticatedSession.get('/logout')
            .expect(302)
            .end(done)
    });

});



describe('after Authentication session for Wrong user', function () {
    var authenticatedSession;

    beforeEach(function (done) {
        testSession.post('/login')
            .type('form')
            .send({ username: 'vs0566', password: 'SAM@0330' })
            .expect(302)
            .end(function (err) {
                if (err) return done(err);
                authenticatedSession = testSession;
                return done();
            });
    });

    it('should not get the restricted page 1', function (done) {
        authenticatedSession.get('/main/data')
            .expect(404)
            .end(done)
    });

    it('should not get the restricted page 2', function (done) {
        authenticatedSession.get('/db')
            .expect(404)
            .end(done)
    });

    it('should not get the restricted page 3', function (done) {
        authenticatedSession.get('/addRequest')
            .expect(404)
            .end(done)
    });

    it('should not get the restricted page 4', function (done) {
        authenticatedSession.get('/allRequests')
            .expect(404)
            .end(done)
    });
});
