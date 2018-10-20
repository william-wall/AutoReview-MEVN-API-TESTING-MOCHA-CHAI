// william wall
"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

const ReviewSchema = new Schema({
    title: String,
    description: String
});

const Review = mongoose.model("Review", ReviewSchema);

describe('mLab Cloud Database Tests', function() {
    before(function (done) {
        mongoose.connect('mongodb://will:william1@ds125341.mlab.com:25341/post-app');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test database!');
            done();
        });
    });
    after(function(done){
        mongoose.connection.close(done);
    });
});
