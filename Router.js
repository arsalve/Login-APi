const express = require('express');
const util = require('./util.js');
const fs = require('fs');
const pdf = require('pdf-parse');
const base64 = require('base64topdf');
const catchHandler = util.catchHandler;
const DataManupulation = require('./Datamaipulation.js');
const chalk = require('chalk');
const router = new express.Router();
const ErrorC = chalk.red.inverse;
const sucU = chalk.blue;
const sucM = chalk.yellow;
//Endpoint for Adding Normal user
router.post('/AddUser', (req, res) => {
    console.log(sucU("New User is beeing processed"))
    try {
        let Responce = DataManupulation.userData(req, (responce, status) => {
            res.status(status).send(responce);
        });
    } catch (error) {
        catchHandler("Error Occured in Router", error, ErrorC);
        res.status(500).send("Issue with server");
        return err;
    }
})
//Endpoint for Adding Employee user
router.post('/AddEMP', (req, res) => {
    console.log(sucM("New Employee is beeing processed"))
    try {
        let Responce = DataManupulation.EmpData(req, (responce, status) => {
            res.status(status).send(responce);
        });
    } catch (error) {
        catchHandler("Error Occured in Router", error, ErrorC);
        res.status(500).send("Issue with server");
        return err;
    }
})
//Endpoint for Login and Token genration
router.post('/ELogin', (req, res) => {
    console.log(sucM("User id Logged in"))
    try {
        let Responce = DataManupulation.ELogin(req, (responce, status) => {
            res.status(status).send(responce);
        });
    } catch (error) {
        catchHandler("Error Occured in Router", error, ErrorC);
        res.status(500).send("Issue with server");
        return err;
    }
})
//Endpoint for Finding Employee
router.post('/FindEmp', (req, res) => {
    console.log(sucU("Finding an Employee"))
    try {
        var Pagination = {
            "page": req.query.page || 1,
            "limit": req.query.limit || 99
        };
        let Responce = DataManupulation.FindEmp(req, (responce, status) => {
            res.status(status).send(responce);
        }, Pagination);
    } catch (error) {
        catchHandler("Error Occured in Router", error, ErrorC);
        res.status(500).send("Issue with server");
        return err;
    }
})
//Endpoint for Finding Normal user
router.post('/FindUser', (req, res) => {
    console.log(sucU("Finding an User"))
    try {
        var Pagination = {
            "page": req.query.page,
            "limit": req.query.limit
        };
        let Responce = DataManupulation.FindUser(req, (responce, status) => {
            res.status(status).send(responce);
        }, Pagination);
    } catch (error) {
        catchHandler("Error Occured in Router", error, ErrorC);
        res.status(500).send("Issue with server");
        return err;
    }
})
router.post('/OCR', (req, res) => {
    console.log(sucU("Decoding text"))
    try {
        let Responce = DataManupulation.OCR(req, (responce, status) => {
            res.status(status).send(responce);
        });
    } catch (error) {
        catchHandler("Error Occured in Router", error, ErrorC);
        res.status(500).send("Issue with server");
        return err;
    }

})

module.exports = router;