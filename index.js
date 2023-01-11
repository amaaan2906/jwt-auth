import express from "express"
import morgan from "morgan"
import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser"
import { fileURLToPath } from "url"

global.__filename = fileURLToPath(import.meta.url)
global.__dirname = path.dirname(__filename)
global.__root = path.resolve()

const app = express()
app.use(morgan("common"))
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
)

/* Routes */
import route from "#routes/index.js"
app.use("/", route)

/* Middlewares */
// import { notFound } from "./src/middlewares/404.js"
// import { errorHandler } from "./src/middlewares/error.js"
// app.use(notFound)
// app.use(errorHandler)

// Run app
const PORT = process.env.PORT || 2906
app.listen(PORT, () => {
	console.log("server is live on " + PORT)

	let route,
		routes = []

	app._router.stack.forEach(function (middleware) {
		if (middleware.route) {
			// routes registered directly on the app
			routes.push(middleware.route)
		} else if (middleware.name === "router") {
			// router middleware
			middleware.handle.stack.forEach(function (handler) {
				route = handler.route
				route && routes.push(route)
			})
		}
	})
	global.r = routes
})
