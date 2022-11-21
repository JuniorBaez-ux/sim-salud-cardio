//importing modules
const express = require("express");
const db = require("../Models");
//Assigning db.users to User variable
 const Pressure = db.pressure;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
 const saveUser = async (req, res, next) => {
 //search the database to see if user exist
 try {
    const systolicpressure = req.body.systolicpressure;
    const diastolicpressure = req.body.diastolicpressure;

   
    
   next();
 } catch (error) {
   console.log(error);
 }
};

//exporting module
 module.exports = {
 saveUser,
};