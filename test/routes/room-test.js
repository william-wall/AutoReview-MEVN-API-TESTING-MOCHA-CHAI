// william wall
"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const assert = require('assert');


let app = require('../../src/app.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
let should = chai.should();


chai.use(chaiHttp);
let _ = require('lodash');
chai.use(require('chai-things'));
var RoomSchema = require('mongoose').model('Room').schema

const Room = mongoose.model("Room", RoomSchema);

describe('Reviews', function () {

    before(function () {
        mongoose.connect('mongodb://will:william1@ds125341.mlab.com:25341/post-app');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to test database!');
        });
    });

    let someRoom;
    beforeEach((done) => {
        someRoom = new Room(
            {
                room_name: 'Room 1'
            });
        someRoom.save().then(() => done());
    });

    describe('GET /rooms', () => {

        describe('Getting Rooms', () => {

            it('should return all of the rooms objects', function (done) {
                let aRoom = new Room({room_name: 'Room 2'});
                aRoom.save()
                chai.request(app)
                    .get('/api/rooms/')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        let result = _.map(res.body, (rooms) => {
                            return {
                                room_name: rooms.room_name,
                                // created_date: rooms.created_date
                            }
                        });
                        expect(result).to.include({room_name: 'Room 1'});
                        expect(result).to.include({room_name: 'Room 2'});
                        expect(res.body.length).to.equal(2);
                        done();
                    });
            });
        });
    });
    describe('POST /rooms', () => {

        describe('Adding Rooms', () => {

            it('should add room to database and verify', function (done) {
                let newRoom = {
                    room_name: 'New Room'
                };
                chai.request(app)
                    .post('/api/rooms/')
                    .send(newRoom)
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            after(function (done) {
                chai.request(app)
                    .get('/api/rooms/')
                    .end(function (err, res) {
                        let result = _.map(res.body, (newRoom) => {
                            return {
                                room_name: newRoom.room_name
                            };
                        });
                        expect(result).to.include({room_name: 'New Room'});
                        done();
                    });
            });

        });

    });

    describe('PUT /rooms', () => {

        describe('Updating Rooms', () => {

            it('should update a specific record by id and verify its added to the database', (done) => {
                let updateRoom = {
                    room_name: 'Updated Room'
                };
                chai.request(app)
                    .get('/api/rooms/')
                    .end(function (err, res) {
                        chai.request(app)
                            .put('/api/rooms/' + res.body[0]._id)
                            .send(updateRoom)
                            .end(function (error, response) {
                                expect(res).to.have.status(200);
                                done();
                            });
                    });
            });
            after(function (done) {
                chai.request(app)
                    .get('/api/rooms/')
                    .end(function (err, res) {
                        let result = _.map(res.body, (rooms) => {
                            return {
                                room_name: rooms.room_name,
                            };
                        });
                        expect(result).to.include({room_name: 'Updated Room'});
                        done();
                    });
            });

        });

    });
    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    });
});