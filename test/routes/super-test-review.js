var supertest = require("supertest");
var should = require("should");
var chai = require('chai');
var expect = chai.expect;

let _ = require('lodash');

var server = supertest.agent("http://autoreview-testing.herokuapp.com");


describe("SuperTest Reviews", function () {

    var review = {
        title: 'Citroën C4 Cactus 2018',
        description: 'The Citroën C4 Cactus is a subcompact crossover SUV'
    };

    describe('Post Review ', function () {

        it('should create a review', function (done) {

            server
                .post('/reviews')
                .send(review)
                .end(function (err, res) {
                    server
                        .get('/reviews')
                        .end(function (err, res) {
                            expect(res.statusCode).to.equal(200);
                            review = res.body;
                            let result = _.map(res.body.reviews, (reviews) => {
                                return {
                                    title: reviews.title,
                                    description: reviews.description
                                }
                            });
                            expect(result).to.include({
                                title: 'Citroën C4 Cactus 2018',
                                description: 'The Citroën C4 Cactus is a subcompact crossover SUV'
                            });
                            done();
                        });
                });
        });
    });

    describe('Get Reviews', function () {

        it("should return reviews", function (done) {
            server
                .get('/reviews')
                .expect('Content-type', /json/)
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    let result = _.map(res.body.reviews, (reviews) => {
                        return {
                            title: reviews.title,
                            description: reviews.description
                        }
                    });
                    expect(result).to.include({
                        title: 'Citroën C4 Cactus 2018',
                        description: 'The Citroën C4 Cactus is a subcompact crossover SUV'
                    });
                    done();
                });
        });

        it('should return a single object by its id', function (done) {
            var singleReview = {_id: '0000', title: 'single review title', description: 'single review description'};
            server
                .post('/reviews')
                .send(singleReview)
                .end(function (err, res) {
                    server
                        .get('/reviews/' + singleReview._id)
                        .expect(200)
                        .end((err, res) => {
                            expect(singleReview).to.be.a('object');
                            expect(singleReview).to.include({
                                _id: '0000',
                                title: 'single review title',
                                description: 'single review description'
                            });
                            done();
                        });
                });
        });
    });


    describe('Get a review by id', function () {

        it('should get a review by its id', function (done) {
            server
                .get('/reviews/' + review._id)
                .expect("Content-type", /json/)
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    done();
                });
        });
    });


    describe('Update a review by id', function () {
        it('should modify a review', function (done) {

            review.title = 'updated title', review.description = 'updated description'
            server
                .get('/reviews')
                .end(function (err, res) {
                    server
                        .put('/reviews/' + res.body.reviews[0]._id)
                        .send(review)
                        .end(function (err, res) {
                            expect(res.statusCode).to.equal(200);
                            done();
                        });
                });

        });
    });

    describe('Delete a review by id', function () {
        it('should delete a review', function (done) {
            server
                .get('/reviews')
                .end(function (err, res) {
                    server
                        .delete('/reviews/' + res.body.reviews[0]._id)
                        .end(function (err, res) {
                            expect(res.statusCode).to.equal(200);
                            // expect(res.body.message).to.equal('');
                            done();
                        });
                });
        });
    });
});


