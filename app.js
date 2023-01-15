// Importing packages
import express from "express";

//Defining essential variables
const app = express();
const port = process.env.PORT || 8000;

// User Routes
app.get("/", (req, res) => {
    res.send("Hello World from the server");
})
app.get("/about", (req, res) => {
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