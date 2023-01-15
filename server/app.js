// Importing packages
import express from "express";
import './db/conn.js'; //connect to database
import { config } from 'dotenv';

//Defining essential variables
config({ path: './config.env' });
const app = express();
const port = process.env.PORT || 8000;

//Middleware
const middleware = (res, req, next) => {
    console.log("Hello My Middleware");
    next();
}

// User Routes
app.get("/", (req, res) => {
    res.send("Hello World from the server");
})
app.get("/about", middleware, (req, res) => {
    res.send("Hello About World from server")
})
app.get("/contact", (req, res) => {
    res.send("Hello Contact World from server")
})
app.get('/signin', (req, res) => {
    res.send("Hello Login World from Server ")
})
app.get('/signup', (req, res) => {
    res.send("Hello Register World from Server ")
})
// Running the server
app.listen(port, () => console.log(`Listening at port ${port}`))