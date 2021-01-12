const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 255,
	},
	username: {
		type: String,
		required: true,
		min: 5,
		max: 255,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		min: 8,
		max: 1024,
	},
	registerDate: {
		type: Number,
		default: Date.now,
	},
});

module.exports = mongoose.model("User", userModel);
