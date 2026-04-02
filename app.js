require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

// Access values from .env
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost";
const BACKEND_PORT = process.env.BACKEND_PORT || 5000;

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("form");
});

app.post("/submit", async (req, res) => {
    try {
        const response = await axios.post(`${BACKEND_URL}:${BACKEND_PORT}/process`, {
            name: req.body.name,
            email: req.body.email
        });

        res.send(response.data);
    } catch (error) {
        res.send("Error connecting to backend");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Frontend running on port ${PORT}`);
});
