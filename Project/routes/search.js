const { body, validationResult } = require("express-validator");
const util = require("util");
const connection = require("../db/connection");


class SearchController {
  constructor(express,authorized) {
    this.express = express
    this.router = express.Router();
    this.authorized = authorized;
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
      "",
      this.authorized,
      body("topic")
        .isString()
        .withMessage("Please enter a valid search topic")
        .isLength({ min: 5 })
        .withMessage("Search topic should be at least 5 characters"),
      body("user_id")
        .isNumeric()
        .withMessage("Please enter a valid user ID"),
      this.createSearch.bind(this)
    );

    this.router.get("", this.authorized, this.getSearchHistory.bind(this));
  }

  async createSearch(req, res) {
    try {
      // 1- Validate the request using express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- Prepare the search object
      const searchUser = {
        topic: req.body.topic,
        user_id: req.body.user_id,
      };

      // 3- Insert the search into the search table
      const query = util.promisify(connection.query).bind(connection);
      await query("INSERT INTO search SET ?", searchUser);

      res.status(200).json({
        msg: "Search created",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async getSearchHistory(req, res) {
    try {
      const query = util.promisify(connection.query).bind(connection);
      const search = await query("SELECT * FROM search");
      res.status(200).json(search);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
}

module.exports = new SearchController(require('express'), require('../middleware/authorize')).router;
