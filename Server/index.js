const express = require("express");
const cors = require("cors");
const postgres = require("./utils/postgres.js");
const productsController = require("./controllers/productsController.js");
const customersController = require("./controllers/customersController.js");
const purchasesController = require("./controllers/purchasesController.js");

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());
// postgres.init();

app.use("/products", productsController);
app.use("/customers", customersController);
app.use("/purchases", purchasesController);

app.listen(port, console.log(`Listening to port ${port}...`));
