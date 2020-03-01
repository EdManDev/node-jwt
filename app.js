const express = require("express");
const app = express();
const port = 3000;

const jwt = require("jsonwebtoken");

app.get("/api", (req, res) => res.json({ message: "welcome to the API" }));

// app.post("/api/posts", (req, res) => res.json({ message: "Post created" }));

app.post("/api/posts", verifyToken, (req, res) => {
	jwt.verify(req.token, "secretkey", (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			res.json({ message: "Post created", authData });
		}
	});
});

// try to secure the api
app.post("/api/login", (req, res) => {
	const user = {
		id: 1,
		username: "edman",
		email: "edman@exemple.com"
	};
	jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
		res.json({
			token: token
		});
	});
});

// verify the token
function verifyToken(req, res, next) {
	// the header value
	const bearerHeader = req.headers["authorization"];
	// if bearer is undefine
	if (typeof bearerHeader !== "undefined") {
		// spilt at the space
		const bearer = bearerHeader.split(" ");
		// get the token from the Arrray
		const bearerToken = bearer[1];
		//set the token
		req.token = bearerToken;
		// the  middleware
		next();
	} else {
		// message is FORBIDEN
		res.sendStatus(403);
	}
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
