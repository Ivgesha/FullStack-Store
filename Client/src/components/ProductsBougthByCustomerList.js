import { observer } from "mobx-react-lite";
import SingleProductBougthByCustomer from "./SingleProductBougthByCustomer.js";
import SingleProductComp from "./SingleProductComp.js";
const ProductsBougthByCustomerList = ({ props, store }) => {
  return (
    <div>
      {props.map((singleProduct) => {
        return (
          // <SingleProductBougthByCustomer props={singleProduct} store={store} />
          <SingleProductComp props={singleProduct} store={store} />
        );
      })}
      {/* run in while loop and create singleCustomer comp and insert his data. */}
    </div>
  );
};

export default observer(ProductsBougthByCustomerList);
