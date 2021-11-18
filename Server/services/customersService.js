const { pool } = require("../utils/postgres.js");

const getAllCustomers = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM customers");
    return rows ? rows : []; // empty array;
  } catch (error) {
    return error;
  }
};

const getCustomerById = async (id) => {
  try {
    const { rows } = await pool.query("SELECT * FROM customers WHERE ID=$1", [
      id,
    ]);
    return rows ? rows : [];
  } catch (error) {
    return error;
  }
};

const addNewCustomer = async (newCustomer) => {
  try {
    await pool.query(
      "INSERT INTO customers (firstname,lastname,city) values ($1,$2,$3)",
      [newCustomer.firstname, newCustomer.lastname, newCustomer.city]
    );
    return "Created customer succesfully";
  } catch (error) {
    return error;
  }
};

const updateCustomer = async (id, customerForUpdate) => {
  try {
    console.log("try");
    await pool.query(
      "UPDATE customers SET (firstname,lastname,city) = ($1,$2,$3) WHERE id=$4",
      [
        customerForUpdate.firstname,
        customerForUpdate.lastname,
        customerForUpdate.city,
        id,
      ]
    );
    console.log("succes");
    return `Updated customer id: ${id}`;
  } catch (error) {
    console.log("fail");
    console.log(error);
    return error;
  }
};

const deleteCustomer = async (id) => {
  try {
    await pool.query("DELETE FROM customers WHERE id=$1", [id]);
    return `Deleted customer id: ${id}`;
  } catch (error) {
    return error;
  }
};

const getCustomersProductsAndDates = async () => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM customers c join purchases pu on c.id=pu.customerid join products pr on pu.productid = pr.id"
    );
    console.log(rows);
    return rows;
  } catch (error) {
    return error;
  }
};
const getDatesAndProducsByCustomerID = async (id) => {
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

module.exports = {
  getAllCustomers,
  getCustomerById,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomersProductsAndDates,
  getDatesAndProducsByCustomerID,
};
