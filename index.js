const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require("body-parser");
const chalk = require('chalk');
const ErrorC = chalk.red.inverse;
const suc = chalk.greenBright;
const port = process.env.PORT || 8080;
let debug = true;

app.get('/', (req, res) => {
    res.status(200).send("Exicuted successfully")
  })
  
  app.listen(port, () => {
    console.log(suc(`Ready for target app listening at http://localhost:${port}`))   
  })
