const express = require("express");
const { getTodo } = require("../controllers/todo");

const router = express.Router();
router.route("/").get(getTodo);

module.exports = router;
