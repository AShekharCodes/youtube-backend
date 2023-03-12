const express = require("express");
const app = express();
const { ObjectId } = require("mongodb");
const subscribers = require("./models/subscribers");
app.use(express.json());

// all responses will be sent in json

//defining default route with a response message and status
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message:
      "Hello, Welcome to the Youtube-backend project to fetch subscribers data from Mongo Atlas Cluster Database😄",
  });
});

// defining the "/subscribers" route to get the list of all the subscribers from the database in a json format
app.get("/subscribers", (req, res) => {
  //if successfully found from database then this response
  subscribers
    .find()
    .select("-__v")
    .then((result) => {
      res.status(200).json({
        status: true,
        message: "Fetched all subscriber's data from Atlas DB!",
        result: result,
      });
    })
    //if any error occurs then this response
    .catch((err) => {
      res.status(500).json({
        status: false,
        message:
          "Some error occured in fetching data from Atlas DB. Check connection and try again!",
        error: err,
      });
    });
});

// defining the "/subscribers/names" route to get response with an array of subscribers with only 2 fields, "name" and "subscribedChannel"
app.get("/subscribers/names", (req, res) => {
  // if success then this response excluding the fields mentioned in select method
  subscribers
    .find()
    .select("-__v -_id -subscribedDate")
    .then((result) => {
      res.status(200).json({
        status: true,
        message: "Fetched name and subscribedChannel fields from Atlas DB!",
        result: result,
      });
    })
    // if any error occurs then this response
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: false,
        message: "subscribers fetched type by names err",
        error: err,
      });
    });
});

// defining the "/subscribers/:id" route to get subscriber data of only the requested id
app.get("/subscribers/:id", (req, res) => {
  // Validate that the ID is a valid MongoDB ObjectID
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(500).json({
      status: false,
      error: "Invalid ID format used, use the valid MongoDB format",
    });
  }

  // Fetch the subscriber data from Atlas database based on the id requested
  subscribers
    .findOne({ _id: ObjectId(req.params.id) })
    .select("-__v")
    .then((result) => {
      if (!result) {
        // If no subscriber was found with the specified id, return a 400 error
        return res.status(400).json({
          status: false,
          error: "Subscriber not found with the requested id!",
        });
      }

      // If a subscriber was found with the specified id, return the data
      res.status(200).json({
        status: true,
        message: "Fetched subscriber data from Atlas DB with the requested id",
        result: result,
      });
    })
    .catch((err) => {
      // If there was an error while fetching the subscriber data, return a 500 error
      res.status(500).json({
        status: false,
        error: "Error in fetching data from Atlas DB",
      });
    });
});

module.exports = app;
