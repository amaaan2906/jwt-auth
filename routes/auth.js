const router = require("express").Router();

router.post("/login", (req, res) => {
	res.json({ msg: "login" });
});

module.exports = router;
