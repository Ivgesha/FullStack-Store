const { pool } = require("../utils/postgres.js");
// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "ShopDB",
//   password: "12345678",
//   port: "5432",
// });

const getAllProducts = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM products order by id");
    return rows ? rows : []; // empty array;
  } catch (error) {
    return error;
  }
};
const getProductById = async (id) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products where id=$1", [
      id,
    ]);
    return rows ? rows : [];
  } catch (error) {
    return error;
  }
};

const addNewProduct = async (newProduct) => {
  try {
    await pool.query(
      "INSERT INTO products (name,price,quantity) values($1,$2,$3)",
      [newProduct.name, newProduct.price, newProduct.quantity]
    );

    return "Added new row";
  } catch (error) {
    return error;
  }
};

const deleteProduct = async (id) => {
  try {
    await pool.query("DELETE FROM products WHERE id=$1", [id]);
    return `Deleted product id: ${id}`;
  } catch (error) {
    return error;
  }
};
const updateProduct = async (id, productForUpdate) => {
  try {
    await pool.query(
      "UPDATE products SET(name,price,quantity) = ($1,$2,$3) WHERE id = $4",
      [
        productForUpdate.name,
        productForUpdate.price,
        productForUpdate.quantity,
        id,
      ]
    );
    return `Updated produt id: ${id}`;
  } catch (error) {
    return error;
  }
};
const updateProductQuantity = async (id, productForUpdate) => {
  console.log("id " + id);
  console.log(productForUpdate.quantity);
  try {
    console.log("tryr");
    await pool.query("UPDATE products SET quantity = $1 WHERE id = $2", [
      productForUpdate.quantity,
      id,
    ]);
    console.log("success");
    return `Updated produt id: ${id}`;
  } catch (error) {
    console.log("fail");
    console.log(error);
    return error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  deleteProduct,
  updateProduct,
  updateProductQuantity,
};
