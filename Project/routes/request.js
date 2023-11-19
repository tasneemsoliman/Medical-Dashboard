const express = require("express");
const { body, validationResult } = require("express-validator");
const util = require("util");
const connection = require("../db/connection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");

class RequestController {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/",
      authorized,
      body("name")
        .isString()
        .withMessage("Please enter a valid request name")
        .isLength({ min: 5 })
        .withMessage("Request name should be at least 5 characters"),
      body("description")
        .isString()
        .withMessage("Please enter a valid request description")
        .isLength({ min: 20 })
        .withMessage("Request description should be at least 20 characters"),
      this.createRequest.bind(this)
    );

    this.router.put(
      "/:id",
      admin,
      body("state"),
      this.updateRequest.bind(this)
    );

    this.router.get("", authorized, this.getRequestHistory.bind(this));
  }

  async createRequest(req, res) {
    try {
      // 1- Validate the request using express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- Prepare the request object
      const request = {
        name: req.body.name,
        description: req.body.description,
        user_id: req.body.user_id,
      };

      // 3- Insert the request into the request table
      const query = util.promisify(connection.query).bind(connection);
      await query("INSERT INTO request SET ?", request);

      res.status(200).json({
        msg: "Request created",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  async updateRequest(req, res) {
    try {
      // 1- Validate the request using express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          msg: errors,
        });
      }

      // 2- Prepare the request object
      const requestObj = {
        state: req.body.state,
      };

      // 3- Update the request object in the database
      const query = util.promisify(connection.query).bind(connection);
      const id = req.params.id;
      await query("UPDATE request SET ? WHERE id_request = ?", [
        requestObj,
        id,
      ]);

      res.status(200).json({
        msg: "Request updated (accepted or declined)",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  async getRequestHistory(req, res) {
    try {
      const query = util.promisify(connection.query).bind(connection);
      const requests = await query("SELECT * FROM request");
      res.status(200).json(requests);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

module.exports = new RequestController().router;
