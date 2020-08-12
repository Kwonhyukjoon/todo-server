const connection = require("../db/mysql_connection");

// @desc      모든 할 일 목록을 불러오는 API
// @route     GET/api/v1/todo?offset=0&limit=25
// @request   offset,limit
// @response  title, date, completed(boolean)

exports.getTodo = async (req, res, next) => {
  let offset = req.query.offset;
  let limit = req.query.limit;

  let query = `select * from todo limit ${offset}, ${limit};`;
  console.log(query);
  try {
    [rows] = await connection.query(query);
    res.status(200).json({ success: true, items: rows, cnt: rows.length });
  } catch (e) {
    res.status(500).json({ success: false, message: "DB Error", error: e });
  }
};
