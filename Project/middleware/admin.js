const connection = require("../db/connection");
const util = require("util");
// const query = util.promisify(connection.query).bind(connection);

class CheckAdminPrivileges {

  Constructor(query, connection) {
    this.query = query;
    this.connection = connection;
  }

  checkAdmin(req, res, next, query) {
    const { token } = req.headers;

    try {
      const user = query("SELECT * FROM user WHERE token = ?", [token]);

      if (user[0] && user[0].role == '1') {
        next();
      } else {
        res.status(403).json({
          msg: "You are not authorized to access this route!",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Something went wrong!",
      });
    }
  }
}

module.exports = new CheckAdminPrivileges(util.promisify(connection.query).bind(connection),connection).checkAdmin;
