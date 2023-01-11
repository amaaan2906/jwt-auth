import express from "express"
const route = express.Router()

// Server health status
route.get("/health", (req, res) => {
	res.sendStatus(200)
})

import auth from "#routes/auth/index.js"
route.use("/auth", auth)

export default route
