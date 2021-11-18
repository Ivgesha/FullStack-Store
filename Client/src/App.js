import "./App.css";
import HomeComp from "./components/HomeComp.js";
import ProductsComp from "./components/ProductsComp.js";
import CustomersComp from "./components/CustomersComp.js";
import PurchasesComp from "./components/PurchasesComp.js";
import EditProductComp from "./components/EditProductComp.js";
import EditCustomer from "./components/EditCustomer.js";
import ShopStore from "./store/ShopStore.js";
import { Routes, Route } from "react-router-dom";
import MenuBar from "./components/MenuBar";

import MyStore from "./mystore/MyStore.js";
function App() {
  const myStore = new MyStore();
  return (
    <div className="App">
      <MenuBar />
      <Routes>
        <Route path="/" element={<HomeComp store={myStore} />} />
        <Route path="/products" element={<ProductsComp store={myStore} />} />
        <Route path="/customers" element={<CustomersComp store={myStore} />} />
        <Route path="/purchases" element={<PurchasesComp store={myStore} />} />
        <Route
          path="/editProduct"
          element={<EditProductComp store={myStore} />}
        />
        <Route path="editCustomer" element={<EditCustomer store={myStore} />} />
      </Routes>
    </div>
  );
}

export default App;
