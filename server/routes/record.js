
// https://www.mongodb.com/languages/mern-stack-tutorial
const express = require("express");
const app = express();
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
 
// // This section will help you get a single record by id
// recordRoutes.route("/record/:id").get(function (req, res) {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect
//    .collection("records")
//    .findOne(myquery, function (err, result) {
//      if (err) throw err;
//      res.json(result);
//    });
// });
 
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
    return;
});

// New Business
recordRoutes.route("/RegisterBusiness").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password,
    lat: req.body.lat,
    long: req.body.long
  };
  db_connect.collection("Businesses").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
    console.log("registered business");
    });
    response.sendStatus(204);
    return;
});
 
// This section will help you update a record by id.
// recordRoutes.route("/update/:id").post(function (req, response) {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  let newvalues = {
//    $set: {
//      name: req.body.name,
//      position: req.body.position,
//      level: req.body.level,
//    },
//  };
//  db_connect
//    .collection("records")
//    .updateOne(myquery, newvalues, function (err, res) {
//      if (err) throw err;
//      console.log("1 document updated");
//      response.json(res);
//    });
// });
 
// // This section will help you delete a record
// recordRoutes.route("/:id").delete((req, response) => {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//    if (err) throw err;
//    console.log("1 document deleted");
//    response.json(obj);
//  });
// });
 
module.exports = recordRoutes;