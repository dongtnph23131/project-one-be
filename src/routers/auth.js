const express = require("express");
const { signin, signup } = require("../controllers/auth");

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
module.exports = router;
