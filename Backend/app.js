// app.js
const cors = require('cors');
const express = require("express");
var path = require('path')
const bodyParser = require("body-parser");
var config=require("./config/db");
const fetchDataController = require("./controllers/fetchDataController")

const app = express();
const port = process.env.PORT || 3301;
//mern stack
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**************************** Fetch Data Appi ************************/
// Create Excel Data
app
    .route("/api/Accounts/createData",)
    .get(fetchDataController.handleCreateData)
// Enter Data
app
    .route("/api/Accounts/EnterBodyData",)
    .post(fetchDataController.handleEnteData)
// Get
app 
    .route("/api/Accounts/showData",)
    .get(fetchDataController.handleShow)
    //Delete item
app
    .route("/api/Accounts/delItem/:Number",)
    .get(fetchDataController.delteItem)
// Delete All
app
    .route("/api/Accounts/deleData",)
    .get(fetchDataController.delData)

//Write Data
app
    .route("/api/Accounts/writeDataa",)
    .get(fetchDataController.writeData)
// Get  excel data
app
    .route("/api/Accounts/fetchdataa",)
    .get(fetchDataController.fetchData)
//delete fileitem
app
    .route("/api/Accounts/deleteFile",)
    .get(fetchDataController.deleteFileItem)



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
