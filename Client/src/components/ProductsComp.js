import AddProductToCustomer from "./AddProductToCustomer.js";

import ProductsListComp from "./ProductsListComp.js";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const ProductsComp = ({ store }) => {
  const serverUrl = "http://localhost:8081";
  useEffect(() => {
    console.log("rendered");
    (async () => {
      store.loadTotalPurchases();

      store.setAddedProduct(false);
    })();
  }, [store.getAddedProduct]);
  return (
    <div className="productPage">
      <h2 style={{ marginLeft: "10px" }}>
        Total amount of purchases: {store.totalPurchases}
      </h2>
      <div className="productPage-mainData">
        <div>
          <ProductsListComp store={store} cameFromMainPage={true} />
        </div>
        <div className={store.getAddProductToCustomerStyle}>
          <AddProductToCustomer store={store} />
        </div>
      </div>
    </div>
  );
};

export default observer(ProductsComp);
