module.exports = (app) => {
  const products = require("../controller/product.controller");
  const router = require("express").Router();

  router.get("/", products.findAll);
  router.get("/all", products.findAll);
  router.get("/:code", products.findOne);
  router.get("/all/proud", products.findProud);
  router.get("/all/best", products.findBestRating);

  app.use("/api/products", router);
};
