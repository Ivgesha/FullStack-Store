import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import axios from "axios";
import { useState } from "react";
const AddProductToCustomer = ({ store }) => {
  const serverUrl = "http://localhost:8081";

  const [selectedProduct, setSelectedProduct] = useState(-1);
  const saveProductEventhandler = async () => {
    if (selectedProduct == -1 || selectedProduct == "Select a prodcut") {
      alert("No product has been chosen");
      return;
    }
    const res = await axios.get(`${serverUrl}/products/${selectedProduct}`);
    const quantity = +res.data[0].quantity - 1;
    if (+res.data[0].quantity < 0) {
      alert(`No prodcuts left in store`);
      return;
    }

    // insert into purchases
    const resFromPurchases = await axios.post(`${serverUrl}/purchases`, {
      customerid: store.getAddBtnCustomerId,
      productid: store.getAddBtnProductId,
    });
    // update quantity of product   // todo nede to check if quantity > 0
    const resFromProducts = await axios.put(
      `${serverUrl}/products/updateQyantity/${selectedProduct}`,
      {
        quantity: quantity,
      }
    );

    store.loadAllCustomersFromDb();
    store.loadAllProductsFromDb();
    store.loadAllPurchasesFromDb();
    store.loadTotalPurchases();
  };

  const selectedProductEventHandler = (e) => {
    setSelectedProduct(e.target.value);
  };

  return (
    <div className="AddProductToCustomer">
      <h1>Add product to {store.selectedCustomerName}</h1>
      <div className="AddProductToCustomer-select">
        <select onChange={selectedProductEventHandler}>
          <option>Select a prodcut</option>
          {console.log(toJS(store.allProductsFromDb))}
          {store.allProductsFromDb.map((singleProduct) => {
            return (
              <option key={singleProduct.id} value={singleProduct.id}>
                {singleProduct.name}
              </option>
            );
          })}
        </select>
      </div>
      <button
        className="AddProductToCustomer-btn"
        onClick={(e) => {
          saveProductEventhandler(e);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default observer(AddProductToCustomer);
