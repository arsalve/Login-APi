const express = require('express');
const util = require('./util.js');
const catchHandler = util.catchHandler;
const DataManupulation = require('./Datamaipulation.js');
const chalk = require('chalk');
const router = new express.Router();
const ErrorC = chalk.red.inverse;
const suc = chalk.greenBright;
  router.post('/AddUser', (req, res) => {
  
    try {
        let Responce = DataManupulation.Updatrdata(req, (responce,status) => {
            res.status(status).send(responce);
        });
    } catch (error) {
        catchHandler("Error Occured in Router", error, ErrorC);
        res.status(500).send("Issue with server");
        return err;
    }
  })
  
  router.post('/ELogin', (req, res) => {
  
    try {
        let Responce = DataManupulation.ELogin(req, (responce,status) => {
            res.status(status).send(responce);
        });
    } catch (error) {
        catchHandler("Error Occured in Router", error, ErrorC);
        res.status(500).send("Issue with server");
        return err;
    }
  })
  router.post('/FindObj', (req, res) => {
  
    try {
        let Responce = DataManupulation.FindObj(req, (responce,status) => {
            res.status(status).send(responce);
        });
    } catch (error) {
        catchHandler("Error Occured in Router", error, ErrorC);
        res.status(500).send("Issue with server");
        return err;
    }
  })

module.exports = router;