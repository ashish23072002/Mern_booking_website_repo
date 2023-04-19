import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";
// var express = require('express')
// var dotenv = require('dotenv')
// var mongoose = require('mongoose')


const app = express()
dotenv.config()

const connect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB!")
    } catch (error) {
        throw error;
    }

};
//creating the Api 
app.get("/",(req,res)=>{
    res.send("hello first request..")
})

mongoose.connection.on("Disconnected", () => {
    console.log("mongoDB disconnected!")
})
mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!")
})


//middlewares
app.use(cookieParser())
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//error handling middle-ware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage, 
      stack: err.stack,
    });
});

app.listen(8800, () => {
    connect()
    console.log("Connected to Backend!")
})