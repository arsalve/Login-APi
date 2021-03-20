const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require("body-parser");
const chalk = require('chalk');
const ErrorC = chalk.red.inverse;
const suc = chalk.greenBright;
const port = process.env.PORT || 8080;
let debug = true;
const mongoose = require('mongoose')
const EmployeeS = require('./Employee.js');
const UserRouter = require('./Router.js');
const util = require('./util.js');
const DataManupulation = require('./Datamaipulation.js');
const catchHandler = util.catchHandler;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(UserRouter)

app.get('/', (req, res) => {
  res.status(200).send("Server is running")
})

app.listen(port, () => {
  console.log(suc(`Ready for target app listening at http://localhost:${port}`))
})