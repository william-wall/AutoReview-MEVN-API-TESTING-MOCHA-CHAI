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

var ChatSchema = require('mongoose').model('Chat').schema


const Chat = mongoose.model("Chat", ChatSchema);

describe('mLab Cloud Database Tests', function () {
    before(function (done) {
        mongoose.connect('mongodb://will:william1@ds125341.mlab.com:25341/post-app');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to test database!');
        });
        var testChat = new Chat({
            room : '5bd04dc76067682a204fc3ed',
            nickname: 'Will',
            message: 'Hello'
        });
        testChat.save(done);
    });


    describe('GET /rooms', () => {

        describe('Getting Rooms', () => {

            it('should return all of the rooms objects', function (done) {
                let aChat = new Chat({room : '5bd04dc76067682a204fc3ed', nickname: 'Ger', message: 'Hello, will im new here!'});
                aChat.save()
                chai.request(app)
                    .get('/api/chats/'+'5bd04dc76067682a204fc3ed')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        let result = _.map(res.body, (chats) => {
                            return {
                                nickname: chats.nickname,
                                message: chats.message
                            }
                        });
                        // console.log(result);
                        expect(result).to.include({nickname: 'Will', message: 'Hello'});
                        expect(result).to.include({nickname: 'Ger', message: 'Hello, will im new here!'});
                        expect(res.body.length).to.equal(2);
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