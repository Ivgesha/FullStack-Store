import axios from "axios";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useNavigate } from "react-router";
import PurchaseProduct from "./PurchaseProduct";

const CustomersComp = ({ store }) => {
  const serverUrl = "http://localhost:8081";
  const navigate = useNavigate();

  const [chosenCustomer, setChosenCustomer] = useState();

  useEffect(() => {
    store.loadAllCustomersFromDb();
    store.loadAllProductsFromDb();
    store.loadAllPurchasesFromDb();

    // (async () => {})(); // testing
  }, []);

  // callback from "purchase product" when on click will insert into purchases, and remove from quantity,
  // then will load all data again. or not all ()
  // the data to load:
  /*
      store.loadAllCustomersFromDb();
    store.loadAllProductsFromDb();
    store.loadAllPurchasesFromDb();
  */

  const getDateAndProducts = async (id) => {
    console.log(id);
    const dateAndProducts = await axios.get(
      `${serverUrl}/customers/get/getDatesAndProducsByCustomerID/${id}`
    );
    return dateAndProducts.data;
  };

  const productClickEventHandler = (e, clickedProduct) => {
    store.setSelectedProduct(clickedProduct);
    navigate("/editProduct");
  };

  const getProductsAndDatesForCustomer = (id) => {
    const allProdsAndDates = [];
    const purchesedByCustomerId = store.allPurchasesFromDb.filter(
      (singlePurches) => {
        return singlePurches.customerid == id;
      }
    );

    for (const purchase of purchesedByCustomerId) {
      const product = store.allProductsFromDb.find(
        (prod) => prod.id == purchase.productid
      );
      allProdsAndDates.push([product, purchase.date]);
    }

    return allProdsAndDates.map((el, index) => {
      return (
        <li
          style={{ cursor: "pointer" }}
          key={index}
          onClick={(e) => {
            productClickEventHandler(e, el[0]);
          }}
        >{`${el[0]?.name} ${el[1]}`}</li>
      );
    });
  };

  const addProductToCustomer = (e, singleCustomer) => {
    setChosenCustomer(singleCustomer);
  };
  return (
    <div className="customersComp">
      <div className="customersComp-table">
        <table border="1">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {store.allCustomersFromDb.map((singleCustomer, index) => {
              return (
                <tr key={index}>
                  <td>
                    {singleCustomer.firstname}
                    <br />
                    <button
                      className="customersComp-table-btn"
                      onClick={(e) => {
                        addProductToCustomer(e, singleCustomer);
                      }}
                    >
                      Add product
                    </button>
                  </td>
                  <td>
                    <ul>{getProductsAndDatesForCustomer(singleCustomer.id)}</ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="customersComp-purchaseProduct">
        {chosenCustomer && (
          <PurchaseProduct store={store} props={chosenCustomer} />
        )}
      </div>
    </div>
  );
};

export default observer(CustomersComp);

// const getProductsForCustomer = (customer_id) => {
//   // Create array to return
//   const allProductsAndDates = [];

//   // Get all purchases By customer id
//   const purchasesByCustomer = store.purchases.filter(
//     (pur) => pur.customer_id == customer_id
//   );

//   //
//   for (const purchase of purchasesByCustomer) {
//     const product = store.products.find(
//       (prod) => prod.id == purchase.product_id
//     );
//     allProductsAndDates.push([product, purchase.date]);
//   }
//   return allProductsAndDates.map((el, index) => (
//     <li key={index}>{`${el[0].name} ${el[1]}`}</li>
//   ));
// };
