import express from "express"
const auth = express.Router()

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import "#config/db.mongo.js"
import User from "#model/user.mongo.js"

auth
	.route("/login")
	.get((req, res) => {
		res.status(200).json({
			route: "/auth/login",
			method: "POST",
			body: "{ 'username', 'password' }",
			header: "",
		})
	})
	.post(async (req, res) => {
		// // user data validation
		// const validation = loginValidation(req.body)
		// if (validation.error)
		// 	return res.status(400).json(validation.error.details[0])
		// check if username exists
		const exists = await User.findOne({ username: req.body.username })
		if (!exists) return res.status(400).json({ msg: "invalid username" }) // invalid username error response

		// password check
		const validPwd = await bcrypt.compare(req.body.password, exists.password)
		if (!validPwd) return res.status(400).json({ msg: "invalid password" }) // invalid password error response

		// copy user datq
		const userInfo = JSON.parse(JSON.stringify(exists))
		delete userInfo.password

		// create jwt access token
		const accessToken = jwt.sign(
			{ id: exists._id },
			process.env.ACCESS_SECRET,
			{ expiresIn: 60 } // 1 min
		)

		// create jwt refresh token
		const refreshToken = jwt.sign(
			{ id: exists._id },
			process.env.REFRESH_SECRET
		)
		// send refresh and access token on login
		res.cookie("refresh", refreshToken, { httpOnly: true })
		return res.status(200).json({ userInfo, accessToken, refreshToken })
	})

auth
	.route("/register")
	.get((req, res) => {
		res.status(200).json({
			route: "/auth/register",
			method: "POST",
			body: "{ 'name', 'email', 'username', 'password' }",
			header: "",
		})
	})
	.post(async (req, res) => {
		// // user data validation
		// const validation = registerValidation(req.body)
		// if (validation.error)
		// 	return res.status(400).json(validation.error.details[0])
		// check if email is available
		let exists = await User.findOne({ email: req.body.email })
		if (exists) {
			res.status(400).json({
				message: "duplicate email",
			})
		}
		// check if username is available
		exists = await User.findOne({ username: req.body.username })
		if (exists) {
			res.status(400).json({
				message: "duplicate username",
			})
		}
		// Hash password
		const hashedPwd = await bcrypt.hash(
			req.body.password,
			await bcrypt.genSalt(10)
		)
		// Save user in db
		const nU = new User({
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: hashedPwd,
		})
		try {
			const save = await nU.save()
			res.status(200).json({ id: save._id, username: save.username })
		} catch (error) {
			res.status(500).json(error)
		}
	})

export default auth
