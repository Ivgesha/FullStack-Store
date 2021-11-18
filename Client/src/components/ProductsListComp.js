import axios from "axios";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import SingleProductComp from "./SingleProductComp.js";
const ProductsListComp = ({ store, cameFromMainPage }) => {
  useEffect(() => {
    (async () => {
      store.loadAllProductsFromDb();
    })();
  }, []);

  return (
    <div className="productList">
      {store.allProductsFromDb.map((singleProduct) => {
        return (
          <SingleProductComp
            store={store}
            props={singleProduct}
            cameFromMainPage={cameFromMainPage}
          />
        );
      })}
    </div>
  );
};

export default observer(ProductsListComp);
