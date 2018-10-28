var supertest = require("supertest");
var should = require("should");
var chai = require('chai');
var expect = chai.expect;

let _ = require('lodash');

var server = supertest.agent("http://autoreview.herokuapp.com");


describe("SuperTest Reviews", function () {

    var review = {
        title: 'Citroën C4 Cactus 2018',
        description: 'The Citroën C4 Cactus is a subcompact crossover SUV,' +
        ' produced by French automaker Citroën in Spain' +
        ' between April 2014 and December 2017.'
    };

    describe('Get Reviews', function () {

        it("should return reviews", function (done) {
            server
                .get('/reviews')
                .expect('Content-type', /json/)
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    // console.log(res.body.reviews);
                    let result = _.map(res.body.reviews, (reviews) => {
                        return {
                            _id: reviews._id,
                            title: reviews.title,
                            description: reviews.description
                        }
                    });
                    console.log(result);
                    done();
                });
        });
    });


    describe('Post Review ', function() {
        it('should create a review', function(done) {
                server
                    .post('/reviews')
                .send(review)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    review = res.body;
                    done();
                });
        });
    });





    describe('Get a review by id', function() {

        it('should get a review by its id', function(done) {
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


    describe('Update a review by id', function() {
        it('should modify a review', function(done) {

        review.title = 'updated title', review.description = 'updated description'
            server
                .get('/reviews')
                .end(function (err, res) {
                    server
                        .put('/reviews/'+ res.body.reviews[0]._id)
                        .send(review)
                        .end(function(err, res) {
                            expect(res.statusCode).to.equal(200);
                            done();
                        });
                });

        });
    });

});


