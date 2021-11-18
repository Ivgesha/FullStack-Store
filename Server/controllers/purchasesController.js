const express = require("express");
const purchasesService = require("../services/purchasesService.js");
const router = express.Router();

router.route("/").get(async (req, res) => {
  const serviceResult = await purchasesService.getAllPurchases();
  console.log(serviceResult);
  res.json(serviceResult);
});

// insert new purchase
router.route("/").post(async (req, res) => {
  const newPurchase = req.body;
  const serviceResult = await purchasesService.addNewPurchase(newPurchase);
  res.json(serviceResult);
});

// get count(*) of all purchases.
router.route("/countAllPurchases").get(async (req, res) => {
  console.log("6");
  console.log("hello from countAllPurchases");
  const serviceResult = await purchasesService.countAllPurchases();
  res.json(serviceResult);
});
// get purchase by id
router.route("/:id").get(async (req, res) => {
  console.log("3");
  const { id } = req.params;
  const serviceResult = await purchasesService.getPurchaseById(id);
  res.json(serviceResult);
});

// delete purchase
router.route("/:id").delete(async (req, res) => {
  console.log("4");
  const { id } = req.params;
  const serviceResult = await purchasesService.deletePurchaseById(id);
  res.json(serviceResult);
});

// update purchase
router.route("/:id").post(async (req, res) => {
  console.log("5");

  const { id } = req.params;
  const purchaseForUpdate = req.body;
  const serviceResult = await purchasesService.updatePurchase(
    id,
    purchaseForUpdate
  );
  res.json(serviceResult);
});
//countAllPurchases

// get customer by product id.
router.route("/getCustomersByProductId/:id").get(async (req, res) => {
  console.log("7");
  const { id } = req.params;
  const serviceResult = await purchasesService.getCustomersByProductId(id);
  res.json(serviceResult);
});
// delete purchases by product id
router.route("/deletePurchasesByProductId/:id").delete(async (req, res) => {
  console.log("8");
  const { id } = req.params;
  const serviceResult = await purchasesService.deletePurchasesByProductId(id);
  res.json(serviceResult);
});

// delete purchases by customer id
router.route("/deletePurchasesByCustomerId/:id").delete(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const serviceResult = await purchasesService.deletePurchasesByCustomerId(id);
  res.json(serviceResult);
});

// get purchases by customer id (for dates of purchase)
router.route("/getPurchasesByCustomerId/:id").get(async (req, res) => {
  const { id } = req.params;
  const serviceResult = await purchasesService.getPurchasesByCustomerId(id);
  res.json(serviceResult);
});

router.route("/getDatesAndProduts/:id").get(async (req, res) => {
  const { id } = req.params;
  const serviceResult = await purchasesService.getDatesAndProduts(id);
  res.json(serviceResult);
});

router.route("/get/allPurchases/withData").get(async (req, res) => {
  const serviceResult = await purchasesService.getAllPurchasesWithExtraData();
  res.json(serviceResult);
});

module.exports = router;
