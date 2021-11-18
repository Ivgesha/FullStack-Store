const express = require("express");
const productsService = require("../services/productsService.js");
const router = express.Router();

router.route("/").get(async (req, res) => {
  const serviceResult = await productsService.getAllProducts();
  res.json(serviceResult);
});

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const serviceResult = await productsService.getProductById(id);
  res.json(serviceResult);
});

router.route("/").post(async (req, res) => {
  const newProduct = req.body;
  const serviceResult = await productsService.addNewProduct(newProduct);
  res.json(serviceResult);
});

router.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  const serviceResult = await productsService.deleteProduct(id);
  res.json(serviceResult);
});

router.route("/:id").put(async (req, res) => {
  const { id } = req.params;
  const productForUpdate = req.body;
  console.log(productForUpdate);
  const serviceResult = await productsService.updateProduct(
    id,
    productForUpdate
  );
  res.json(serviceResult);
});

router.route("/updateQyantity/:id").put(async (req, res) => {
  const { id } = req.params;
  const productForUpdate = req.body;
  const serviceResult = await productsService.updateProductQuantity(
    id,
    productForUpdate
  );
  res.json(serviceResult);
});
module.exports = router;
