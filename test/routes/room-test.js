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
        someRoom.save()
            .then(() => done());
    });

    describe('GET /rooms', () => {

        describe('Getting Rooms', () => {

            it('should return all of the rooms objects', function (done) {
                chai.request(app)
                    .get('/api/room/all_rooms')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        console.log(res.body);
                        // let result = _.map(res.body.reviews, (reviews) => {
                        //     return {
                        //         room_name: reviews.room_name,
                        //         description: reviews.description
                        //     }
                        // });
                        // console.log(result);
                        // expect(result).to.include({title: 'Honda Civic 2003', description: 'Fast car, very nice!'});
                        // expect(result).to.include({title: 'Review title 1', description: 'Review description 1'});
                        // expect(result).to.include({title: 'Review title delete-test', description: 'Great motor'});
                        // expect(res.body.reviews.length).to.equal(3);
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