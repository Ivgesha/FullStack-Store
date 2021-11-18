import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomerBoughtList from "./CustomerBoughtList.js";
import { useNavigate } from "react-router";

const SingleProductComp = ({ store, props, cameFromMainPage }) => {
  const serverUrl = "http://localhost:8081";

  const [customersWithProduct, setCustomerWIthProduct] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const allCustomersWithProduct = await axios.get(
        `${serverUrl}/purchases/getCustomersByProductId/${props.id}`
      );
      setCustomerWIthProduct(allCustomersWithProduct.data);
    })();
  }, [store.allProductsFromDb]);

  const editProductEventHandler = () => {
    if (props.productid) {
      props.id = +props.productid;
    }
    store.setSelectedProduct(props);
    navigate("/editProduct");
  };
  return (
    <div className="singleProduct">
      <div className="SingleProductComp-leftSide">
        <div
          className="SingleProductComp-leftSide-titles"
          onClick={editProductEventHandler}
        >
          <strong>Name: </strong>
          <label>{props.name}</label>
          <br />
          <strong>Price:</strong>
          <label> {props.price}</label>
          <br />
          <strong>Quantity:</strong>
          <label> {props.quantity}</label>
          <br />
        </div>
      </div>
      {customersWithProduct?.length > 0 && (
        <div className="SingleProductComp-rightSide">
          <strong>List of customers</strong>
          <br />
          <br />
          <CustomerBoughtList
            props={customersWithProduct}
            store={store}
            cameFromMainPage={cameFromMainPage}
          />
        </div>
      )}
    </div>
  );
};

export default observer(SingleProductComp);
