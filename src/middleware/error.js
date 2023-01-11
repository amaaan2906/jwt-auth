export function errorHandler(err, req, res) {
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500
	const jsonRes = JSON.stringify({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	})
	res.json(jsonRes)
}
