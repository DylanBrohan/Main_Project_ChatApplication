// Users Authentication Modal
const express = require("express");
const router = express.Router();

// res.json serves a JSON request
// Route GET api/users/test, this tests the users route
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

module.exports = router;
