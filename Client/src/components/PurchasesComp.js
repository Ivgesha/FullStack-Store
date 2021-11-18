import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { toJS } from "mobx";
import axios from "axios";
const PurchasesComp = ({ store }) => {
  const serverUrl = "http://localhost:8081";

  const [selectedProduct, setSelectedProduct] = useState("Filter by products");
  const [selectedCustomer, setSelectedCustomer] = useState(
    "Filter by customers"
  );
  const [selectedDate, setSectedDate] = useState("");
  const [filteredTable, setFilteredTable] = useState([]);
  const [table, setTable] = useState([]);
  useEffect(() => {
    store.loadAllCustomersFromDb();
    store.loadAllProductsFromDb();
    store.loadAllPurchasesFromDb();

    (async () => {
      const res = await axios.get(
        `${serverUrl}/purchases/get/allPurchases/withData`
      );
      console.log(res.data);
      setTable(res.data);
      setFilteredTable(res.data);
    })();

    // load table with all the filters but, if all filters are -1, then return
  }, []);
  const searchEventHandler = () => {
    // use filter data -> which will filter by states and update the Obj of table.
    console.log("search! ");
    console.log("data from db/");

    console.log("Original");
    console.log(table);

    const beforeFilterTable = table;
    const filteredTable = beforeFilterTable
      .filter((singleProd) => {
        if (selectedCustomer != "Filter by customers") {
          return singleProd.firstname == selectedCustomer;
        } else {
          return true;
        }
      })
      .filter((singleProd) => {
        if (selectedProduct != "Filter by products") {
          return singleProd.name == selectedProduct;
        } else {
          return true;
        }
      })
      .filter((singleProd) => {
        if (selectedDate == "") {
          return true;
        } else {
          return singleProd.date.slice(0, 10) == selectedDate;
        }
      });

    setFilteredTable(filteredTable);
  };

  const selectEventHandler = (e) => {
    if (e.target.name === "customer") {
      setSelectedCustomer(e.target.value);
    } else {
      // product
      setSelectedProduct(e.target.value);
    }
  };

  const dateEventHandler = (e) => {
    setSectedDate(e.target.value);
  };

  return (
    <div className="purchasesComp">
      <div className="purchasesComp-buttons">
        <select
          onChange={selectEventHandler}
          name="customer"
          className="purchasesComp-buttons-select"
        >
          <option>Filter by customers</option>
          {store.allCustomersFromDb.map((singleCustomer) => {
            return <option>{singleCustomer.firstname}</option>;
          })}
        </select>
        <select
          onChange={selectEventHandler}
          name="product"
          className="purchasesComp-buttons-select"
        >
          <option>Filter by products</option>
          {store.allProductsFromDb.map((singleProduct) => {
            return <option>{singleProduct.name}</option>;
          })}
        </select>
        <input
          type="date"
          onChange={dateEventHandler}
          className="purchasesComp-buttons-date"
        />
        <button
          onClick={searchEventHandler}
          className="purchasesComp-buttons-search"
        >
          Seach
        </button>
      </div>
      <div className="purchasesComp-table">
        <table border="1">
          <thead>
            <tr>
              <th>Customer name</th>
              <th>Purchased product</th>
              <th>Purcase date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTable.map((singlePurchase) => {
              return (
                <tr>
                  <td>{singlePurchase.firstname}</td>
                  <td>{singlePurchase.name}</td>
                  <td>{singlePurchase.date.slice(0, 10)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default observer(PurchasesComp);
