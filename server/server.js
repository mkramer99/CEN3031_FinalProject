
const express = require("express");
const app = express();
app.disable("x-powered-by");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
app.listen(port, async () => {
  // perform a database connection when server starts
  await dbo.connectToServer(function (err) {
    if (err) console.error("ERRRROOOORRRRR");
   });
  console.log(`Server is running on port: ${port}`);
});