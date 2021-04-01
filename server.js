/* Dependencies */
// Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
// Cors for cross origin allowance
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));
const port = 8000;

// Spin up the server
const server = app.listen(port, function listening() {
  console.log(`running on localhost: ${port}`);
});

const projectData = [];

// Callback function to complete GET '/all'

app.get("/all", sendData);
function sendData(req, res) {
  res.send(projectData);
}

app.post("/add", addData);

function addData(req, res) {
  console.log(req.body);
  projectData.push(req.body);
  res.send(projectData);
}
