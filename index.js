const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const chalk = require('chalk');
const suc = chalk.greenBright;
const port = process.env.PORT || 8080;
const UserRouter = require('./Router.js');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(UserRouter)

app.get('/', (req, res) => {
  res.status(200).send("Server is running")
})

app.listen(port, () => {
  console.log(suc(`Ready for targets`))
})