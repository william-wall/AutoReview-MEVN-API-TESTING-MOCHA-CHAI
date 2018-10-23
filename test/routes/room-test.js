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
        someRoom = new Room({
            room_name: 'Room 1'
        });
        someRoom.save()
            .then(() => done());
    });

    describe('GET /rooms', () => {

        describe('Getting Rooms', () => {

            it('should return all of the room objects', function () {

            });

        });
    });


    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    });
});