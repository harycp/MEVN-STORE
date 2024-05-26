const db = require("../models");
const Order = db.orders;

exports.findOrder = (req, res) => {
  const id = Number(req.params.id);

  Order.aggregate([
    {
      $match: {
        user_id: id,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "cart_items.code",
        foreignField: "code",
        as: "products",
      },
    },
  ])
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while retrieving products.",
      });
    });
};

exports.addToCart = (req, res) => {
  const id = Number(req.params.id);
  const productCode = String(req.body.product.code);
  const quantity = Number(req.body.quantity);

  Order.findOneAndUpdate(
    {
      user_id: id,
      "cart_items.code": productCode,
    },
    {
      $inc: { "cart_items.$.quantity": quantity },
    },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        // If product not found, add a new product to the cart
        Order.updateOne(
          {
            user_id: id,
          },
          {
            $addToSet: {
              cart_items: { code: productCode, quantity },
            },
          }
        )
          .then((updateResult) => {
            res.send(updateResult);
          })
          .catch((err) => {
            res.status(409).send({
              message: err.message || "Some error while adding to cart.",
            });
          });
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while adding to cart.",
      });
    });
};

exports.removeFromCart = (req, res) => {
  const id = Number(req.params.id);
  const productCode = String(req.params.product); // Mengambil dari params

  Order.updateOne(
    {
      user_id: id,
    },
    {
      $pull: {
        cart_items: { code: productCode }, // Menggunakan objek
      },
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while removing the product.",
      });
    });
};

exports.updateCartItem = (req, res) => {
  const id = Number(req.params.id);
  const productCode = String(req.body.product.code);
  const quantity = Number(req.body.quantity);

  Order.updateOne(
    {
      user_id: id,
      "cart_items.code": productCode,
    },
    {
      $set: {
        "cart_items.$.quantity": quantity,
      },
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while updating product quantity.",
      });
    });
};
