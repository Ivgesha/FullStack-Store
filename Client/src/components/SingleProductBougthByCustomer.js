import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
const SingleProductBougthByCustomer = ({ props, store }) => {
  const navigate = useNavigate();
  const editProductEventHandler = () => {
    console.log("Props on editProductEventHandler: ");
    console.log(props);
    const selectedProduct = {
      id: +props.id,
      name: props.name,
      price: props.price,
      quantity: +props.quantity,
    };

    console.log("updated selectedProduct ");
    console.log(selectedProduct);
    store.setSelectedProduct(props);
    navigate("/editProduct");
  };
  return (
    <div className="SingleProductBougthByCustomer">
      <label onClick={editProductEventHandler}>Name: {props.name}</label> <br />
      <label>Price: {props.price}</label>
      <br />
      <label>Quantity: {props.quantity}</label>
      <br />
    </div>
  );
};

export default observer(SingleProductBougthByCustomer);
