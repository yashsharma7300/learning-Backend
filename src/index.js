// require("dotenv").config({path: "./env"});

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });


// import mongoose from "mongoose";
// import {DB_NAME} from "./constants.js";
import connectDB from "./db/index.js";
import app from "./app.js";



connectDB()
  .then(() => {
    app.on("error" , (error)=>{
        console.log("error :" , error);
        throw error ;
    })
    app.listen(process.env.PORT || 8000, () =>
      console.log(`server is running at port : ${process.env.PORT}`)
    );
  })
  .catch((error) => {
    console.log("mongodb connection failed!! ", error);
  });

/*

import express from "express";
const app = express();


;(async ()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error" , (error)=>{
        console.log("ERROR:" , error);
        throw error 
       })

       app.listen(process.env.PORT , ()=>{
        console.log(`app is running on port ${process.env.PORT}`);
       })
       
    }
    catch(err){
        console.error("ERROR: " , err)
        throw err;
    }
}) ()

*/
