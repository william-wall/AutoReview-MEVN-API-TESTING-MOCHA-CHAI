var supertest = require("supertest");
var should = require("should");

let _ = require('lodash');

var server = supertest.agent("http://autoreview.herokuapp.com");


describe("SAMPLE unit test", function () {

    it("should return home page", function (done) {

        server
            .get("/reviews")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                res.status.should.equal(200);
                console.log(res.body);
                done();
            });
    });

});


