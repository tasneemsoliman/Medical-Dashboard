const connection = require("../db/connection");
const util = require("util");

class CheckAuthorization {
  constructor(query, connection) {
    this.query = query;
    this.connection = connection;
  }

  async checkAuthorized(req, res, next, query) {
    const { token } = req.headers;
    const user = await query("SELECT * FROM user WHERE token = ?", [token]);

    if (user[0]) {
      // User is authorized, call the next middleware in the chain
      next();
    } else {
      // User is not authorized, return a 403 Forbidden response
      res.status(403).json({
        msg: "You are not authorized to access this route!",
      });
    }
  }
}

module.exports = new CheckAuthorization(util.promisify(connection.query).bind(connection), connection).checkAuthorized;
