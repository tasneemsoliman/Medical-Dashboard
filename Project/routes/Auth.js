const express = require("express");
const { body, validationResult } = require("express-validator");
const connection = require("../db/connection");
const util = require("util");
const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const query = util.promisify(connection.query).bind(connection);


class User {
  constructor() {
    this.router = express.Router();
    this.router.post("/login", this.login.bind(this));
    this.router.post("/register", this.register.bind(this));
    this.router.put("/:id", admin, this.update.bind(this));
    this.router.delete("/:id", admin, this.delete.bind(this));
    this.router.get("/", admin, this.list.bind(this));
  }

  async login(req, res) {
    try {
      // 1- VALIDATE REQUEST
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF EMAIL EXISTS
      const query = util.promisify(connection.query).bind(connection);
      const user = await query("SELECT * FROM user WHERE email = ?", [req.body.email]);
      if (user.length === 0) {
        return res.status(404).json({
          errors: [{ msg: "Email or password not found!" }],
        });
      }

      // 3- COMPARE HASHED PASSWORD
      const checkPassword = await bcrypt.compare(req.body.password, user[0].password);
      if (checkPassword) {
        const { password, ...rest } = user[0];
        return res.status(200).json(rest);
      } else {
        return res.status(404).json({
          errors: [{ msg: "Email or password not found!" }],
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async register(req,res) {
    try {
      // 1- VALIDATE REQUEST
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF EMAIL EXISTS
      const query = util.promisify(connection.query).bind(connection);
      const checkEmailExists = await query(
        "SELECT * FROM user WHERE email = ?",
        [req.body.email]
      );
      if (checkEmailExists.length > 0) {
        return res.status(200).json({ msg: 'Email Already Exists' });
      }

      // 3- PREPARE USER OBJECT TO SAVE
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        password: await bcrypt.hash(req.body.password, 10),
        token: crypto.randomBytes(16).toString("hex"),
      };

      // 4- SAVE USER TO DATABASE
      const saveUser = await query("INSERT INTO user SET ?", newUser);
      if (saveUser.affectedRows === 1) {
        res.status(200).json({ msg: 'Account registered successfully' });
      } else {
        return { success: false, errors: [{ msg: "Error saving user" }] };
      }
    } catch (err) {
      console.error(err);
      return { success: false, errors: [{ msg: "Internal Server Error" }] };
    }
  }
async update(req,res) {
    try {
      const id = req.params.id;
      const rows = await query("SELECT * FROM user WHERE id_user = ?", [id]);
      if (!rows.length) {
        return res.status(404).json({
          message: "User not found.",
        });
      }
      if (rows[0].role !== 0) {
        return res.status(400).json({
          message: "You cannot update an admin!",
        });
      }
      const userObj = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: await bcrypt.hash(req.body.password, 10),
        role: req.body.role,
      };
      await query("UPDATE user SET ? WHERE id_user = ?", [userObj, id]);
      return res.status(200).json(req.body);
    } catch (err) {
      console.error(err);
      return { status: 500, error: "Internal Server Error" };
    }
  }

  async delete(req,res) {
    try {
      const id = req.params.id;
      const rows = await query("SELECT * FROM user WHERE id_user = ?", [id]);
      if (!rows.length) {
        return res.status(404).json({
          message: "User not found.",
        });
      }

      if (rows[0].role !== 0) {
        return res.status(400).json({
          message: "You cannot delete and admin!",
        });
      }

      await query("DELETE FROM user WHERE id_user = ?", [id]);
      return res.status(200).json({
        message: "The user was deleted successfully.",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Internal server error.",
      });
    }
  }

  async list(req,res) {
    try {
      
      const rows = await query("SELECT * FROM user WHERE role = ?", [0]);
      return res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({error: "Internal Server Error."});
    }
  }
}

// const user = new User();

// router.post('/login', user.login.bind(user));
// router.post('/register', user.register.bind(user));
// router.put('/update/:id', user.update.bind(user));
// router.delete('/delete/:id', user.delete.bind(user));
// router.get('/list', user.list.bind(user));

module.exports = new User().router;