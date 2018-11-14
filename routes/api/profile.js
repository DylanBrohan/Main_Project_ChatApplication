// Fetch the users profile
const express = require("express");
const router = express.Router();

// res.json serves a JSON request
// Route GET api/profile/test, this tests the profile route
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

module.exports = router;
