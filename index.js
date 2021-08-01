const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const chalk = require('chalk');
const cros=require('cors')
const suc = chalk.greenBright;
const port = process.env.PORT || 8080;
const UserRouter = require('./Router.js');
const path = require('path');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cros());
app.use(UserRouter)
app.use(express.static(path.join(__dirname, './Public')));
app.get('/', (req, res) => {
  fs.readFile(__dirname + '\\index.html', 'utf8', function (err, text) {
    res.send(text, {
        root: './'
    });
});
})

app.listen(port, () => {
  console.log(suc(`Ready for targets`))
})