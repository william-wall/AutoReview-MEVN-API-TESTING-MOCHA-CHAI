# Assignment 1 - API testing and Source Control. - AutoReview -

Name: William Wall
Student Number: 20070255

NOTE: Network connection is essential for successful running of tests. i.e. for mongo mLab and Heroku hosted server !

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

Note: For each test suite reviews, chats and rooms a database connection is made to an mLab cloud database.
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

## Sample Test execution.
. . . . . In this section include a listing of the output from running your tests, e.g.

        $ npm test

        > donationweb-3.0@0.0.0 test /Users/diarmuidoconnor/labs/donationsApp
        > mocha test/routes/donations-test.js

          Donationss
            GET /donations
              ✓ should GET all the donations (48ms)
            POST /donations
              ✓ should return confirmation message and update datastore (136ms)
            PUT /donations/:id/votes
              ✓ should return all donations with specified donation upvoted by 1
              ✓ should return a 404 status and message for invalid donation id


          4 passing (207ms)

        $

[ Markdown Tip: By indenting the above listing, GitHub will display it in a 'box' and preserve any formatting.]

## Extra features.

Please note: The chats route requires socket.io which enables real-time chat, but this can only be seen functioning on a client side display.
