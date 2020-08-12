const express = require("express");
const { getTodo, updateTodo } = require("../controllers/todo");

const router = express.Router();
router.route("/").get(getTodo);
router.route("/update").put(updateTodo);

module.exports = router;
