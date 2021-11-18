import { observer } from "mobx-react-lite";
import { useState } from "react";
import { toJS } from "mobx";
import axios from "axios";
const PurchaseProduct = ({ store, props }) => {
  const serverUrl = "http://localhost:8081";

  const [selectedProduct, setSelectedProduct] = useState();

  const selectedProductEventHandler = (e) => {
    setSelectedProduct(e.target.value);
    console.log(e.target.value);
  };
  const buyProduct = async (e) => {
    console.log("selected product: ");
    console.log(selectedProduct);
    console.log("to customer: ");
    console.log(toJS(props));

    if (selectedProduct == null) {
      alert("No product was chosen!");
      return;
    }
    const res = await axios.get(`${serverUrl}/products/${selectedProduct}`);
    const quantity = +res.data[0].quantity - 1;
    if (+res.data[0].quantity < 0) {
      alert(`No prodcuts left in store`);
      return;
    }

    const resFromPurchases = await axios.post(`${serverUrl}/purchases`, {
      customerid: +props.id,
      productid: selectedProduct,
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
  return (
    <div className="PurchaseProduct">
      <h1 style={{ textDecoration: "underline", paddingBottom: "5%" }}>
        Purchase product
      </h1>
      <select
        onChange={selectedProductEventHandler}
        className="PurchaseProduct-select"
      >
        <option>Select a prodcut</option>
        {store.allProductsFromDb.map((singleProduct) => {
          return (
            // <div>
            //   {/* <input type="checkbox" />
            // <label>{singleProduct}</label> */}
            // </div>
            <option key={singleProduct.name} value={singleProduct.id}>
              {singleProduct.name}
            </option>
          );
        })}
      </select>
      <br />
      <button onClick={buyProduct} className="PurchaseProduct-button">
        Buy it!
      </button>
    </div>
  );
};

export default observer(PurchaseProduct);
