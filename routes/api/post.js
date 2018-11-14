// Posting + Comments page
const express = require("express");
const router = express.Router();

// res.json serves a JSON request
// Route GET api/post/test, this tests the post route
router.get("/test", (req, res) => res.json({ msg: "Post Works" }));

module.exports = router;
