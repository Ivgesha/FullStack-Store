import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import axios from "axios";
import { toJS } from "mobx";
import { useNavigate } from "react-router";

import CustomerBoughtList from "./CustomerBoughtList.js";

const EditProductComp = ({ store }) => {
  const serverUrl = "http://localhost:8081";
  const navigate = useNavigate();
  const [customersWithProduct, setCustomerWIthProduct] = useState([]);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    (async () => {
      console.log("selected product");
      console.log(store.selectedProduct?.id);
      const allCustomersWithProduct = await axios.get(
        `${serverUrl}/purchases/getCustomersByProductId/${store.selectedProduct?.id}`
      );
      setCustomerWIthProduct(allCustomersWithProduct.data);
      setEditedProduct({ ...store.selectedProduct });
    })();
  }, []);

  const onChageEditedProduct = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const updateDeleteProductEventHandler = async (e) => {
    const id = store.selectedProduct.id;
    if (e.target.name === "delete") {
      // axios -> remove product from db.
      const deletedProduct = await axios.delete(`${serverUrl}/products/${id}`);
      if (deletedProduct.data.startsWith("Deleted product")) {
        const deletingPurchasesByProductResult = await axios.delete(
          `${serverUrl}/purchases/deletePurchasesByProductId/${id}`
        );
        console.log(deletingPurchasesByProductResult);
        navigate("/products");
      }
    } else {
      // axios -> update prodcut in db.
      const res = await axios.put(`${serverUrl}/products/${id}`, {
        name: editedProduct.name,
        price: editedProduct.price,
        quantity: editedProduct.quantity,
      });
    }
  };
  return (
    <div>
      <div className="editProductPage">
        <div className="editProductPage-update-delete">
          <div className="editProductPage-update-delete-container">
            <label> Name: </label>
            <input
              name="name"
              type="text"
              value={editedProduct?.name}
              onChange={onChageEditedProduct}
            />
            <br />
            <label> Price: </label>
            <input
              name="price"
              type="text"
              value={editedProduct?.price}
              onChange={onChageEditedProduct}
            />
            <br />
            <label> Quantity: </label>
            <input
              name="quantity"
              type="text"
              value={editedProduct?.quantity}
              onChange={onChageEditedProduct}
            />
            <br />
            <button onClick={updateDeleteProductEventHandler} name="update">
              Update
            </button>
            <button onClick={updateDeleteProductEventHandler} name="delete">
              Delete
            </button>
          </div>
        </div>
        <div className="editProductPage-customerList">
          <strong>Customers who purchased</strong>
          {<br />}
          {<br />}
          {<label>{store.selectedProduct?.name}</label>}
          {<br />}
          {<br />}
          {customersWithProduct.length > 0 && (
            <div className="editProductPage-customerList-container">
              <CustomerBoughtList props={customersWithProduct} store={store} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(EditProductComp);
