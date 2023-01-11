export function notFound(res, req, next) {
	// res.status(404)
	const error = new Error(`${req.originalUrl} - Not found`)
	next(error)
}
