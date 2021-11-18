import { observer } from "mobx-react-lite";

import SingleCostumerBougthComp from "./SingleCostumerBougthComp.js";
const CustomerBoughtList = ({ props, store, cameFromMainPage }) => {
  return (
    <div className="customerBoughtList">
      {props?.map((singleCustomer) => {
        return (
          <SingleCostumerBougthComp
            props={singleCustomer}
            store={store}
            cameFromMainPage={cameFromMainPage}
          />
        );
      })}
    </div>
  );
};

export default observer(CustomerBoughtList);
