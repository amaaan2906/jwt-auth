const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const User = require("./models/User");
require("dotenv").config();

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

const port = process.env.PORT || 1234;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
