const db = require("../models");
const Product = db.products;

exports.findAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const products = await Product.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Product.countDocuments();
    res.send({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(409).send({
      message: err.message,
    });
  }
};

exports.findOne = (req, res) => {
  Product.findOne({ code: req.params.code })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message,
      });
    });
};

exports.findProud = (req, res) => {
  Product.find({ proud: "true" })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message,
      });
    });
};

exports.findBestRating = (req, res) => {
  Product.find({ averageRating: { $gte: "4.9" } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message,
      });
    });
};
