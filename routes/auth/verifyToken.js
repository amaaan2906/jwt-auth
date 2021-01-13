const jwt = require("jsonwebtoken");
const User = require("../../models/User");

module.exports = function (req, res, next) {
	const token = req.header("jwt");
	if (!token) {
		req.user = { verified: false };
		next();
	} else {
		try {
			const tokenData = jwt.verify(token, process.env.JWT_SECRET);
			tokenData.verified = true;
			req.user = tokenData;
			next();
		} catch (error) {
			res.status(400).json(error);
		}
	}
};
