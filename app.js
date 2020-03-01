const express = require("express");
const app = express();
const port = 3000;

const jwt = require("jsonwebtoken");

app.get("/api", (req, res) => res.json({ message: "welcome to the API" }));

app.post("/api/posts", (req, res) => res.json({ message: "Post created" }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
