/**
 * Middle-ware for protected API routes that require user authentication via JWT
 * 	- It checks for a valid authorization token in the request header
 * 	- Returns an 'Unauthorized' status code if no token is found
 * 	- Returns an error message and status code if the token is invalid or expired
 * 	- If token is valid, the token is decrypted and the data is passed onto the callback function in the request
 */

import jwt from "jsonwebtoken"

export default function (req, res, next) {
	// get token from req header
	const token = req.header("Authorization")
	if (!token) {
		res.sendStatus(401)
	} else {
		const tokenData = jwt.verify(token, process.env.ACCESS_SECRET)
		req.user = tokenData
		next()
	}
}
