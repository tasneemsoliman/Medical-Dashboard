const express = require('express');
const { body, validationResult } = require('express-validator');
const util = require('util');
const connection = require('../db/connection');
const authorized = require('../middleware/authorize');
const admin = require('../middleware/admin');

const query = util.promisify(connection.query).bind(connection);

class Category {
  constructor() {
    this.router = express.Router();
    this.router.post('', admin, [
      body('name')
        .isString()
        .withMessage('Please enter a valid category name')
        .isLength({ min: 5 })
        .withMessage('Category name should be at least 5 characters'),
      body('description')
        .isString()
        .withMessage('Please enter a valid category description')
        .isLength({ min: 20 })
        .withMessage('Category description should be at least 20 characters'),
    ], this.createCategory);

    this.router.put('/:id', admin, this.updateCategory);
    this.router.delete('/:id', admin, this.deleteCategory);
    this.router.get('', authorized, this.getCategories);
  }

  async createCategory(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const category = {
        name: req.body.name,
        description: req.body.description,
      };

      await query('INSERT INTO category SET ?', category);
      res.status(200).json({ msg: 'Category created' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async updateCategory(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors });
      }

      const id = req.params.id;
      const category = await query('SELECT * FROM category WHERE id_category = ?', req.params.id);
      if (!category[0]) {
        return res.status(404).json({ msg: 'The category was not found' });
      }

      const categoryObj = {
        name: req.body.name,
        description: req.body.description,
      };

      await query('UPDATE category SET ? WHERE id_category = ?', [categoryObj, id]);
      res.status(200).json(req.body);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async deleteCategory(req, res) {
    try {
      const id = req.params.id;
      const category = await query('SELECT * FROM category WHERE id_category = ?', [id]);
      if (!category[0]) {
        return res.status(404).json({ msg: 'Category not found' });
      }

      await query('DELETE FROM category WHERE id_category = ?', [id]);
      res.status(200).json({ msg: 'Category deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await query('SELECT * FROM category');
      res.status(200).json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
}

module.exports = new Category().router;
