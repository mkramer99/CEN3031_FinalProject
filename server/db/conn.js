
const { MongoClient, ServerApiVersion } = require("mongodb");
const Db = process.env.ATLAS_URI;

var _db;
var url = "mongodb+srv://melaniekramer:cen3031@team18cluster.qowtrfz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
module.exports = {
  connectToServer: function (callback) {
    console.log("trying client.connect");
    (async () => {
      try {
        await client.connect(url) 
        // Verify we got a good "db" object
          console.log("attempting to connect to db");
          try {
            _db = client.db("FoodFighters");
            const collection = _db.collection("Users");
            console.log("Successfully connected to MongoDB."); 
          } catch {
            console.log("didn't work");
          }
        return callback();
        }
    catch (error) {
      console.log(error);
     }
  })()
  },


 
  getDb: function () {
    return _db;
  },
};