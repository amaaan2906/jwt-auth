const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { exist } = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const {
	loginValidation: login,
	registerValidation: register,
} = require("./validation");

router.post("/login", (req, res) => {});

router.post("/register", async (req, res) => {
	const validation = register(req.body);
	if (validation.error) return res.json(validation.error.details[0]);
	// check if email is available
	let exists = await User.findOne({ email: `${req.body.email}` });
	if (exists) {
		res.status(400).json({
			message: "duplicate email",
		});
	}
	// check if username is available
	exists = await User.findOne({ username: `${req.body.username}` });
	if (exists) {
		res.status(400).json({
			message: "duplicate username",
		});
	}
	// Hash password
	const hashedPwd = await bcrypt.hash(
		req.body.password,
		await bcrypt.genSalt(10)
	);
	// Save user in db
	const nU = new User({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: hashedPwd,
	});
	try {
		const save = await nU.save();
		res.status(200).json({ id: save._id, username: save.username });
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
