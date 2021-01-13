/**
 * Middle-ware for protected API routes that require user authentication via JWT
 * 	- It checks for a valid authorization token in the request header
 * 	- Returns an 'Unauthorized' status code if no token is found
 * 	- Returns an error message and status code if the token is invalid or expired
 * 	- If token is valid, the token is decrypted and the data is passed onto the callback function in the request
 */

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	// get access token from request header
	const token = req.header("authorization");
	if (!token) {
		// NO token = unauthorized access
		res.sendStatus(401);
	} else {
		try {
			const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);
			// verified token is saved in request body for the server
			req.user = tokenData;
			next();
		} catch (error) {
			// token is not verified or expired
			res.status(401).json(error);
		}
	}
};
