import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

const SingleCostumerBougthComp = ({ props, store, cameFromMainPage }) => {
  const navigate = useNavigate();
  const addProductToCustomerEventHandler = (e) => {
    // save customer id and product id
    store.setAddBtnCustomerId(+props.customerid);
    store.setAddBtnProductId(+props.productid);
    store.setSelectedCustomerName(props.firstname);
    store.setAddProductToCustomerStyle("addProductToCustomer-visible");
  };

  // save the clicked customer.
  const editCustomerEventHandler = () => {
    const selectedCustomer = {
      id: +props.customerid,
      firstname: props.firstname,
      lastname: props.lastname,
      city: props.city,
      date: props.date,
    };
    // console.log(selectedCustomer);
    // console.log(props);
    store.setSelectedCustomer(selectedCustomer);
    navigate("/editCustomer");
  };

  return (
    <div className="singleCostumerBougthComp">
      <div
        className="singleCostumerBougthComp-titles"
        onClick={editCustomerEventHandler}
      >
        <strong>Name: </strong>
        <label>{props.firstname}</label>
        <br />
        <strong>Date bougth: </strong>
        <label>{props.date.slice(0, 10)}</label>
        <br />
      </div>
      <br />
      {cameFromMainPage && (
        <div className="singleCostumerBougthComp-buttons">
          <button
            onClick={addProductToCustomerEventHandler}
            className="singleCostumerBougthComp-buttons-btn"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default observer(SingleCostumerBougthComp);
