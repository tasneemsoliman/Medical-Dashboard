const express = require('express');
const { body, validationResult } = require('express-validator');
const util = require('util');
const fs = require('fs');
const connection = require('../db/connection');
const authorized = require('../middleware/authorize');
const admin = require('../middleware/admin');
const upload = require('../middleware/uploadimage');

class MedicineController {
  constructor() {
    this.router = express.Router();
    this.router.post(
      '',
      admin,
      upload.single('image'),
      [
        body('name')
          .isString()
          .withMessage('Please enter a valid medicine name')
          .isLength({ min: 5 })
          .withMessage('Medicine name should be at least 5 characters'),
        body('description')
          .isString()
          .withMessage('Please enter a valid medicine description')
          .isLength({ min: 20 })
          .withMessage('Medicine description should be at least 20 characters'),
        body('price')
          .isInt()
          .withMessage('Please enter a valid medicine price'),
        body('expiration_date')
          .isString()
          .withMessage('Please enter a valid medicine expiration date'),
        body('fk_id_catagory')
          .isInt()
          .withMessage('Please enter a valid medicine category ID'),
      ],
      this.createMedicine.bind(this)
    );

    this.router.put(
      '/:id',
      admin,
      upload.single('image'),
      [
        body('name'),
        body('description'),
        body('price'),
        body('expiration_date'),
      ],
      this.updateMedicine.bind(this)
    );

    this.router.delete('/:id', admin, this.deleteMedicine.bind(this));

    this.router.get('', authorized, this.listMedicines.bind(this));

    this.router.get('/:id', authorized, this.showMedicine.bind(this));
  }
async createMedicine(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (!req.file) {
        return res.status(400).json({
          errors: [{ msg: "Image is required!" }],
        });
      }

      const med = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        expiration_date: req.body.expiration_date,
        image: req.file.originalname,
        fk_id_catagory: req.body.fk_id_catagory,
      };

      const query = util.promisify(connection.query).bind(connection);
      await query("INSERT INTO medicine SET ?", med);

      res.status(200).json({
        msg: "Medicine created",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  async updateMedicine(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Invalid input.",
        });
      }

      const query = util.promisify(connection.query).bind(connection);
      const id = req.params.id;

      const medicine = await query(
        "SELECT * FROM medicine WHERE id_medicine = ?",
        [id]
      );

      if (!medicine[0]) {
        return res.status(404).json({
          error: "The medicine was not found.",
        });
      }

      const medicineObj = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        expiration_date: req.body.expiration_date,
      };

      if (req.file) {
        medicineObj.image = req.file.originalname;

        fs.unlinkSync(`./upload/${medicine[0].image}`);
      }

      await query("UPDATE medicine SET ? WHERE id_medicine = ?", [
        medicineObj,
        id,
      ]);

      return res.status(200).json(req.body);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: "Internal server error.",
      });
    }
  }

  async deleteMedicine(req, res) {
    try {
      const query = util.promisify(connection.query).bind(connection);
      const id = req.params.id;

      const medicine = await query(
        "SELECT * FROM medicine WHERE id_medicine = ?",
        [id]
      );

      if (!medicine[0]) {
        return res.status(404).json({
          error: "The medicine was not found.",
        });
      }

      await query("DELETE FROM medicine WHERE id_medicine = ?", [id]);

      return res.status(200).json({
        message: "The medicine was deleted successfully.",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: "Internal server error.",
      });
    }
  }
async listMedicines(req, res) {
    const query = util.promisify(connection.query).bind(connection);

    let search = '';
    if (req.query.search) {
      search = `WHERE name LIKE "%${req.query.search}%" OR description LIKE "%${req.query.search}"`;
    }

    const medicines = await query(`SELECT * FROM medicine ${search}`);

    medicines.map((medicine) => {
      medicine.image = `http://${req.hostname}:4000/${medicine.image}`;
      return medicine;
    });

    return res.status(200).json(medicines);
  }

  async showMedicine(req, res) {
    const query = util.promisify(connection.query).bind(connection);

    const id = req.params.id;
    const medicine = await query("SELECT * FROM medicine WHERE id_medicine = ?", req.params.id);
    if (!medicine[0]) {
      res.status(404).json({
        msg: "Medicine not found!",
      });
    }

    medicine.image = `http://${req.hostname}:4000/${medicine.image}`;
    res.status(200).json(medicine);
  }
}

// usage
module.exports = new MedicineController().router;

