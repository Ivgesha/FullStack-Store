const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ShopDB",
  password: "12345678",
  port: "5432",
});
/* 
const init = () => {
  pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "ShopDB",
    password: "12345678",
    port: "5432",
  });
};
*/
// module.exports = { pool, init };
module.exports = { pool };
