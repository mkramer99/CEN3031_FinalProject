
// https://www.mongodb.com/languages/mern-stack-tutorial
const express = require("express");
const app = express();
app.disable("x-powered-by");
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const recordRoutes = express.Router();
recordRoutes.use(express.json());
recordRoutes.use(express.urlencoded({extended: true}));
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

 
// get all users
recordRoutes.route("/Users/Get/All").get(function (req, res) {
 let db_connect = dbo.getDb("FoodFighters");
 console.log("Fetching users");
 db_connect.collection("Users").find({}).toArray()
 .then((data) => {
    console.log(data);
    res.json(data);
  });
});
// get all businesses
recordRoutes.route("/Businesses/Get/All").get(function (req, res) {
  let db_connect = dbo.getDb("FoodFighters");
  console.log("Fetching businesses");
  db_connect.collection("Businesses").find({}).toArray()
  .then((data) => {
    console.log(data);
    res.json(data);
  });
 });
 
 // get all businesses without passwords
 recordRoutes.route("/Businesses/Get/AllLocations").get(function (req, res) {
  let db_connect = dbo.getDb("FoodFighters");
  console.log("Fetching businesses");
  db_connect.collection("Businesses").find({}).project({password:0}).toArray()
  .then((data) => {
    console.log(data);
    res.json(data);
  });
 });

// Get one account
recordRoutes.route("/Users/Get/One").post(function (req, res) {
 let db_connect = dbo.getDb();
 let myobj = {
  email: req.body.email,
  password: req.body.password
};
 console.log("Getting user account");
 db_connect.collection("Users").findOne(myobj)
 .then((data) => {
    console.log(data);
    res.json(data);
  });
});

// Get one account
recordRoutes.route("/Businesses/Get/One").post(function (req, res) {
  let db_connect = dbo.getDb();
  console.log("Getting business account");
  let myobj = {
    email: req.body.email,
    password: req.body.password
  };
  db_connect.collection("Businesses").findOne(myobj)
  .then((data) => {
     console.log(data);
     res.json(data);
   });
 });
 
// New User
recordRoutes.route("/Register").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };
  db_connect.collection("Users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
    console.log("registered user");
    });
    response.sendStatus(204);
});

// New Business
recordRoutes.route("/RegisterBusiness").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    address: `${req.body.street}, ${req.body.city}, ${req.body.state} ${req.body.zip}, ${req.body.country}`,
    email: req.body.email,
    password: req.body.password,
    lat: req.body.lat,
    lon: req.body.lon
  };
  db_connect.collection("Businesses").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
    console.log("registered business");
    });
    response.sendStatus(204);
});

// delete user
recordRoutes.route("/Users/Delete/One").post(function (req, res) {
  let db_connect = dbo.getDb();
  console.log("Deleting user account");
  db_connect.collection("Users").findOne({email: req.params.email})
  .then((data) => {
     console.log(data);
     res.json(data);
   });
 });

 // delete business
 recordRoutes.route("/Businesses/Delete/One").post(function (req, res) {
  let db_connect = dbo.getDb();
  console.log("Deleting business account");
  db_connect.collection("Businesses").findOne({email: req.params.email})
  .then((data) => {
     console.log(data);
     res.json(data);
   });
 });
 
module.exports = recordRoutes;
