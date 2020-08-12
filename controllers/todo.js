const connection = require("../db/mysql_connection");

// @desc      모든 할 일 목록을 불러오는 API
// @route     GET/api/v1/todo?offset=0&limit=25
// @request   offset,limit
// @response  title, date, completed(boolean)

exports.getTodo = async (req, res, next) => {
  let offset = req.query.offset;
  let limit = req.query.limit;

  if (!offset || !limit) {
    res.status(400).json({ message: "parameters setting error" });
    return;
  }

  let query = `select * from todo limit ${offset}, ${limit};`;
  console.log(query);
  try {
    [rows] = await connection.query(query);
    res.status(200).json({ success: true, items: rows, cnt: rows.length });
  } catch (e) {
    res.status(500).json({ success: false, message: "DB Error", error: e });
  }
};

// @desc      완료 여부 체크 및 해제하는 API
// @route     put/api/v1/todo/update
// @request   id , completed
// @response  completed(boolean)
exports.updateTodo = async (req, res, next) => {
  let id = req.body.id;
  let completed = req.body.completed;

  if (!id || !completed) {
    res.status(400).json({ message: "parameters setting error" });
    return;
  }
  console.log(completed);

  let query = `update todo set completed = ${completed} where id = ${id}`;
  try {
    [result] = await connection.query(query);
    res.status(200).json({ success: true, result: result });
  } catch (e) {
    res.status(400).json({ success: false, error: e });
  }
};
