const mongoose = require("mongoose");

const tokenModel = new mongoose.Schema({
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Number,
		default: Date.now,
	},
});

module.exports = mongoose.model("Refresh-Token", tokenModel);
