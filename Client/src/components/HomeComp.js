import { observer } from "mobx-react-lite";
import { useEffect } from "react";
const Home = ({ store }) => {
  useEffect(() => {
    store.loadTotalPurchases();
  }, []);
  return (
    <div className="homePage">
      <h1>Welcome to Lusha's</h1>
      <h1>STORE</h1>
      <img
        className="lushaImg"
        src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_d3b7d43a188c2a51eb955fa74c7ecd2f/lusha.png"
      />
    </div>
  );
};

export default observer(Home);
