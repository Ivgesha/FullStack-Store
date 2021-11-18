const express = require("express");
const customersService = require("../services/customersService.js");
const router = express.Router();

router.route("/").get(async (req, res) => {
  const serviceResult = await customersService.getAllCustomers();
  res.json(serviceResult);
});

router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  const serviceResult = await customersService.getCustomerById(id);
  res.json(serviceResult);
});

router.route("/").post(async (req, res) => {
  const newCustomer = req.body;
  const serviceResult = await customersService.addNewCustomer(newCustomer);
  res.json(serviceResult);
});

router.route("/:id").put(async (req, res) => {
  console.log("inside customerController");
  const { id } = req.params;
  const customerForUpdate = req.body;
  const serviceResult = await customersService.updateCustomer(
    id,
    customerForUpdate
  );
  res.json(serviceResult);
});

router.route("/:id").delete(async (req, res) => {
  const { id } = req.params;
  const serviceResult = await customersService.deleteCustomer(id);
  res.json(serviceResult);
});

// consider deleting
// router.route("/get/CustomersProductsAndDates").get(async (req, res) => {
//   console.log("got to getCustomersProductsAndDates");
//   const serviceResult = await customersService.getCustomersProductsAndDates();
//   res.json(serviceResult);
// });

router
  .route("/get/getDatesAndProducsByCustomerID/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const serviceResult = await customersService.getDatesAndProducsByCustomerID(
      id
    );
    res.json(serviceResult);
  });
module.exports = router;
