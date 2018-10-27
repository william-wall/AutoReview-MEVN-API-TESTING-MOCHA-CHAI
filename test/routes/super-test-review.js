'use strict';

var app = require('../../src/app.js');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const assert = require('assert');

var RoomSchema = require('mongoose').model('Room').schema

const Room = mongoose.model("Room", RoomSchema);

describe('API Tests', function() {
    before(function (done) {
        mongoose.connect('mongodb://will:william1@ds125341.mlab.com:25341/post-app');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to test database!');
        });
        var testReview = new Review({
            title: "Honda Civic 2003",
            description: "Fast car, very nice!"
        });
        testReview.save(done);
    });



});
