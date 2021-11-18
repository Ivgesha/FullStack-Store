const { pool } = require("../utils/postgres.js");

const getAllPurchases = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM purchases");
    return rows ? rows : []; // empty array;
  } catch (error) {
    return error;
  }
};

const addNewPurchase = async (newPurchase) => {
  try {
    console.log("try");
    await pool.query(
      "INSERT INTO purchases (customerid,productid) values ($1,$2)",
      [newPurchase.customerid, newPurchase.productid]
    );
    console.log("success");
    return "Added new purchase";
  } catch (error) {
    console.log("fail");
    console.log(error);
    return error;
  }
};
const getPurchaseById = async (id) => {
  try {
    const { rows } = await pool.query("SELECT * FROM purchases WHERE id=$1", [
      id,
    ]);
    return rows ? rows : [];
  } catch (error) {
    return error;
  }
};
const deletePurchaseById = async (id) => {
  try {
    await pool.query("DELETE FROM purchases WHERE id=$1", [id]);
    return `Deleted purchase id: ${id}`;
  } catch (error) {
    return error;
  }
};
// pay attention, we are NOT updating the date.
const updatePurchase = async (id, purchaseForUpdate) => {
  try {
    await pool.query(
      "UPDATE purchases set (customerid,productid) = ($1,$2) WHERE id=$3",
      [purchaseForUpdate.customerid, purchaseForUpdateproductid, id]
    );
    return `Updated purchases id: ${id}`;
  } catch (error) {
    return error;
  }
};
const countAllPurchases = async () => {
  try {
    const { rows } = await pool.query("SELECT COUNT(*) FROM purchases");
    return rows ? rows : [];
  } catch (error) {
    return error;
  }
};
const getCustomersByProductId = async (id) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM customers c JOIN purchases p on c.id = p.customerid and p.productid = $1",
      [id]
    );
    console.log(rows);
    return rows ? rows : [];
  } catch (error) {
    return error;
  }
};
const deletePurchasesByProductId = async (id) => {
  try {
    await pool.query("DELETE FROM purchases WHERE productid=$1", [id]);
    return `Deleted all purchases with productId = ${id} `;
  } catch (error) {
    return error;
  }
};
const deletePurchasesByCustomerId = async (id) => {
  try {
    console.log("try");
    await pool.query("DELETE FROM purchases WHERE customerid=$1", [id]);
    console.log("deleted");
    return `Deleted all purchases with customerId = ${id} `;
  } catch (error) {
    console.log("fail");
    console.log(error);
    return error;
  }
};
const getPurchasesByCustomerId = async (id) => {
  console.log("holaa");
  try {
    const { rows } = await pool.query(
      "SELECT * FROM products pr join purchases pu on pr.id = pu.productid and pu.customerid = $1",
      [id]
    );
    console.log(rows);
    return rows ? rows : [];
  } catch (error) {
    return error;
  }
};

const getDatesAndProduts = async (id) => {
  try {
    const { rows } = await pool.query(
      " select pr.name,pu.date from purchases pu join products pr on pu.productid = pr.id and pu.customerid = $1",
      [id]
    );
    return rows ? rows : [];
  } catch (error) {
    return error;
  }
};

const getAllPurchasesWithExtraData = async () => {
  try {
    const { rows } = await pool.query(
      "SELECT purchases.*, customers.firstname, customers.lastname, products.name FROM purchases JOIN products ON purchases.productid = products.id JOIN customers ON purchases.customerid = customers.id"
    );
    return rows ? rows : [];
  } catch (error) {
    return error;
  }
};
module.exports = {
  getAllPurchases,
  addNewPurchase,
  getPurchaseById,
  deletePurchaseById,
  updatePurchase,
  countAllPurchases,
  getCustomersByProductId,
  deletePurchasesByProductId,
  deletePurchasesByCustomerId,
  getPurchasesByCustomerId,
  getDatesAndProduts,
  getAllPurchasesWithExtraData,
};
