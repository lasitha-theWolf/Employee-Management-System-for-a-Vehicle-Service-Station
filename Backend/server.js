const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070 ; 

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGO_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Mongo connection Success");
})





app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})


//Employee Managment

const employeeRouter = require("./routes/employees.js");
app.use("/employee", employeeRouter);



app.use("/employee",employeeRouter);
// '/employee' kiyla arn tiyenne url eke anthima eka