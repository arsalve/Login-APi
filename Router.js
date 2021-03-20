const express = require('express');
const util = require('./util.js');
const catchHandler = util.catchHandler;
const DataManupulation = require('./Datamaipulation.js');
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const router = new express.Router();
const ErrorC = chalk.red.inverse;
const suc = chalk.greenBright;

  router.post('/AddUser', (req, res) => {
  
    try {
        let Responce = DataManupulation.userData(req, (responce,status) => {
            res.status(status).send(responce);
        });
    } catch (error) {
        catchHandler("Error Occured in Router", error, ErrorC);
        res.status(500).send("Issue with server");
        return err;
    }
  })
  router.post('/AddEMP', (req, res) => {
  
    try {
        let Responce = DataManupulation.EmpData(req, (responce,status) => {
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
  router.post('/FindEmp', (req, res) => {
  
    try {
        let Responce = DataManupulation.FindEmp(req, (responce,status) => {
            res.status(status).send(responce);
        });
    } catch (error) {
        catchHandler("Error Occured in Router", error, ErrorC);
        res.status(500).send("Issue with server");
        return err;
    }
  })
  router.post('/FindUser', (req, res) => {
  
    try {
        let Responce = DataManupulation.FindUser(req, (responce,status) => {
            res.status(status).send(responce);
        });
    } catch (error) {
        catchHandler("Error Occured in Router", error, ErrorC);
        res.status(500).send("Issue with server");
        return err;
    }
  })

module.exports = router;