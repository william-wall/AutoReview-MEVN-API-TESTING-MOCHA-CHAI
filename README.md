# Assignment 1 - API testing and Source Control. - AutoReview -

Name: William Wall
Student Number: 20070255

NOTE: Network connection is essential for successful running of tests. i.e. for mongo mLab and Heroku hosted server!

## Run server.

npm start

## Run test script's.

npm test

## Overview.

AutoReview is a web app by where users write reviews about motor vehicles and topics.
Users also have the opportunity to create or join chat rooms and chat in real-time to other authenticated users using socket I/O.

The AutoReview API has three main functional areas.

1. Reviews
2. Rooms
3. Chats

## API endpoints.

- Reviews

 + GET /reviews - Get all reviews.
 + GET /reviews/:id - Get a single review by id.
 + POST /reviews - Post a review to database.
 + PUT /reviews/:id - Update a review by its id.
 + DELETE /reviews/:id - Delete a review by its id.

- Chats

 + GET /api/chats/room:id - Get all chats per chat room.
 + GET /api/chats/:id - Get a single chat by id.
 + POST /api/chats - Post a chat to database.
 + PUT /api/chats/:id - Update a chat by its id.
 + DELETE /api/chats/:id - Delete a chat by its id.

 - Rooms

  + GET /api/rooms - Get all chat rooms.
  + GET /api/rooms/:id - Get a single room by id.
  + POST /api/rooms - Post a chat room to database.
  + PUT /api/rooms/:id - Update a room by its id.
  + DELETE /api/rooms/:id - Delete a chat room by its id.

## Data storage.

- Mongodb

NOTE: For each test suite reviews, chats and rooms a database connection is made to an mLab cloud database.
The tests are then completed and finally the database is dropped at the end ensuring the mLab database is NOT populated with large amounts of unwanted data.

- Schemas

  + Reviews
    - title: String,
    - description: String

  + Chats
     - room: { type: Schema.Types.ObjectId, ref: 'Room' },
     - nickname: String,
     - message: String,
     - created_date: { type: Date, default: Date.now }

  + Rooms
     - room_name: String,
     - created_date: { type: Date, default: Date.now }

- supertest

The test suite using supertest points to the hosted Heroku application which has mLab embedded into its code,
meaning that a direct mLab connection is not made rather it is automatically rendered by the hosted server.

NOTE: Heroku is naturally slow for the FIRST http response, run npm start a second time for guaranteed success if supertest shows failure the first time.

URL: http://autoreview-testing.herokuapp.com/

## Sample Test execution.

Note: npm test - will run all test scripts

        > server@1.0.0 test C:\Users\william\Documents\SSD4\Agile Software Practice\Assignment_1\Assignment_1\server
        > set NODE_ENV=test && mocha test/routes/database-mLab-test.js && mocha test/routes/review-test.js && mocha test/routes/chat-test.js && mocha test/routes/room-test.js && mocha test/routes/super-test-review.js



          mLab Cloud Database Tests
        We are connected to test database!
            Test Database Connection By Adding a Review
              √ New review saved to test database
            Verify That The Review Got Added To Database
              √ Should retrieve data from test database


          2 passing (420ms)



          Reviews
            GET /reviews
              Returning Reviews
                Return all Reviews
        mLab Connection Successful
                  √ should return all of the reviews objects (121ms)
                Return Single Review by ID
                  √ should return a single object by its id (64ms)
                  √ should find a user with a particular id
                Error Handling
                  √ should return a 500 status for incorrect id entered
            POST /reviews
              Adding Reviews
                √ should save a review to database
                √ should add review to database, verify and get correct message from post request (52ms)
            PUT /reviews/:id
              Updating Reviews
                √ should update an instance of review title
                √ should update a specific record by choosing title
                Error Handling
                  √ should not update anything and get status 500 for incorrect id (124ms)
                Update Single Review by ID
                  √ should update a specific record by id and verify its added to the database (280ms)
            DELETE /reviews/:id
              Deleting Reviews
                √ should remove instance of the model review (96ms)
                √ should find review by its title and remove (72ms)
                Delete Single Review by ID
                  √ should delete by id (80ms)
                  √ should delete specific database entry and check that it is removed (100ms)
                Error Handling
                  √ should not delete anything and get status 500 for incorrect id (40ms)


          15 passing (2s)



          Chat
        mLab Connection Successful
            GET /api/chats
              Getting Chats
                Return all Chats
                  √ should return all of the rooms objects (244ms)
                Return Single Chat by ID
                  √ should return a single object by its id (120ms)
                Error Handling
                  √ should throw a 500 error for incorrect id
            POST /api/chats
              Adding Chats
                √ should add chat to database directly to a specific room, verify and get correct message from post function (104ms)
            PUT /api/chats
              Update Single Chat by ID
                √ should update a specific record by id and verify its added to the database (80ms)
                Error Handling
                  √ should not update anything and get status 500 for incorrect id (64ms)
            DELETE /api/chats
              Delete Single Chat by ID
                √ should delete chat by id and remove the object instance (84ms)
              Error Handling
                √ should not delete anything and get status 500 for incorrect id


          8 passing (2s)



          Rooms
            GET /api/rooms
              Getting Rooms
                Return all Rooms
        mLab Connection Successful
                  √ should return all of the rooms objects (289ms)
                Error Handling
                  √ should throw a 500 error for incorrect id
                Return Single Room by ID
                  √ should return a single object by its id
            POST /rooms
              Adding Rooms
                √ should add room to database and verify
            PUT /rooms
              Updating Rooms
                Update Single Room by ID
                  √ should update a specific record by id and verify its added to the database (100ms)
                Error Handling
                  √ should not update anything and get status 500 for incorrect id (56ms)
            DELETE /rooms
              Deleting Rooms
                Delete Single Room by ID
                  √ should delete room by id and remove the object instance (92ms)
                Error Handling
                  √ should not delete anything and get status 500 for incorrect id (72ms)


          8 passing (2s)



          SuperTest Reviews
            Post Review
              √ should create a review and verify its added to the database (192ms)
              √ should create a review
            Get Reviews
              Return all Reviews
                √ should return all reviews and verify (76ms)
              Return Single Review by ID
                √ should return a single review object by its id and verify (152ms)
            Update a review by id
              √ should modify a review and verify its changes (124ms)
            Delete a review by id
              √ should delete a review and verify it has been removed (80ms)


          6 passing (728ms)

## Extra features.

Please note: The chats route requires socket.io which enables real-time chat, but this can only be seen functioning on a client side display.
Authentication is also build into the front end via cloud based Firebase.
