const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const User = require("./models/User");

const verifyToken = require("./routes/auth/verifyToken");

const app = express();
mongoose.connect(
	process.env.MONGO_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log(`Connected to db!`)
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/jwt", require("./routes/auth/auth"));

app.get("/", (req, res) => {
	res.json({ msg: "Hello" });
});

app.get("/protected", verifyToken, async (req, res) => {
	if (req.user.verified) {
		const userId = req.user.id;
		const user = await User.findById(userId);
		res.status(200).send(`Logged in as ${user.name.toUpperCase()}`);
	} else res.status(401).send("Logged Out");
});

const port = process.env.PORT || 1234;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
