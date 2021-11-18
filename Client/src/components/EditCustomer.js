import { observer } from "mobx-react-lite";
import ProductsBougthByCustomerList from "./ProductsBougthByCustomerList.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { toJS } from "mobx";
import { useNavigate } from "react-router";
const EditCustomer = ({ store }) => {
  const serverUrl = "http://localhost:8081";
  const navigate = useNavigate();
  const [productsOfCustomer, setProductsOfCustomer] = useState([]);
  const [editedCustomer, setEditedCustomer] = useState({});

  useEffect(() => {
    (async () => {
      console.log("selectedCustomer");
      console.log(store.getSelectedCustomer.id);
      const allProductsOfCustomer = await axios.get(
        `${serverUrl}/purchases/getPurchasesByCustomerId/${store.getSelectedCustomer.id}`
      );
      setProductsOfCustomer(allProductsOfCustomer.data);
      setEditedCustomer({ ...store.getSelectedCustomer });
    })();
  }, []);

  const onChageEditedCustomer = (e) => {
    setEditedCustomer({ ...editedCustomer, [e.target.name]: e.target.value });
  };

  const updateDeleteCustomerEventHandler = async (e) => {
    console.log(toJS(store.getSelectedCustomer));
    const id = store.getSelectedCustomer.id;
    if (e.target.name === "delete") {
      // axios -> remove customer from db.
      // delete customer then delete all hes purchases
      const deletedCustomer = await axios.delete(
        `${serverUrl}/customers/${id}`
      );
      if (deletedCustomer.data.startsWith("Deleted customer")) {
        // remove all purchases.
        const deletingPurchasesByCustomerResult = await axios.delete(
          `${serverUrl}/purchases/deletePurchasesByCustomerId/${id}`
        );
        navigate("/products");
      }
      // todo dont forteg to load data again (store.loadAllPocuts... countPurchases.)
    } else {
      // axios -> update customer in db.
      const res = await axios.put(`${serverUrl}/customers/${id}`, {
        firstname: editedCustomer.firstname,
        lastname: editedCustomer.lastname,
        city: editedCustomer.city,
      });
    }
  };
  return (
    <div>
      <div className="editCustomerPage">
        <div className="editCustomerPage-update-delete">
          <div className="editCustomerPage-update-delete-container">
            <label> First name: </label>
            <input
              type="text"
              name="firstname"
              value={editedCustomer?.firstname}
              onChange={onChageEditedCustomer}
            />
            <br />
            <label> Last name: </label>
            <input
              type="text"
              name="lastname"
              value={editedCustomer?.lastname}
              onChange={onChageEditedCustomer}
            />
            <br />
            <label> City: </label>
            <input
              type="text"
              name="city"
              value={editedCustomer?.city}
              onChange={onChageEditedCustomer}
            />{" "}
            <br />
            <button onClick={updateDeleteCustomerEventHandler} name="update">
              Update
            </button>
            <button onClick={updateDeleteCustomerEventHandler} name="delete">
              Delete
            </button>
          </div>
        </div>
        <div className="editCustomerPage-productList">
          <strong>{store.getSelectedCustomer.firstname}'s products </strong>
          <ProductsBougthByCustomerList
            props={productsOfCustomer}
            store={store}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(EditCustomer);
