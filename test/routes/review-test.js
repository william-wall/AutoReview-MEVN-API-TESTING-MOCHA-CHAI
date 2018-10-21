// william wall
"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const assert = require('assert');

let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;

chai.use(chaiHttp);
let _ = require('lodash');
chai.use(require('chai-things'));

const ReviewSchema = new Schema({
    title: String,
    description: String
});

const Review = mongoose.model("Review", ReviewSchema);

describe('Reviews', function () {
    before(function (done) {
        mongoose.connect('mongodb://will:william1@ds125341.mlab.com:25341/post-app');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to test database!');
            // done();
        });
        var testReview = new Review({
            title: "Honda Civic 2003",
            description: "Fast car, very nice!"
        });
        testReview.save(done);
    });

    describe('GET /reviews', () => {
        it('', function () {

        });
    });
    describe('POST /reviews', function () {
        describe('Add a Review', function () {
            it('should save a review to database', function (done) {
                let aReview = new Review({title: 'Citroen', description: 'Great motor'});
                aReview.save()
                    .then(() =>{
                        assert(!aReview.isNew);
                        done();
                    })
            });
        });
    });
    describe('PUT /reviews/:id/', () => {
        it('', function () {

        });
        it('', function () {

        });
    });
});
describe('DELETE /reviews/:id', () => {
    describe('', function () {
        it('', function () {

        });
    });
    describe('', function () {
        it('', function () {

        });
    });
    after(function (done) {
            mongoose.connection.close(done);
    });
});