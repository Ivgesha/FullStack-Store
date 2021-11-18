import { useNavigate } from "react-router";

const MenuBar = () => {
  const navigate = useNavigate();

  const movePage = (e, name) => {
    // set in the store the clicked menu.
    navigate(`/${name}`);
  };

  return (
    <div className="menuBar">
      <div
        className="menuBar-div"
        onClick={(e) => {
          movePage(e, "products");
        }}
      >
        <label className="menuBar-div-label">Proucts</label>
      </div>
      <div
        className="menuBar-div"
        onClick={(e) => {
          movePage(e, "customers");
        }}
      >
        <label className="menuBar-div-label">Customers</label>
      </div>
      <div
        className="menuBar-div"
        onClick={(e) => {
          movePage(e, "purchases");
        }}
      >
        <label className="menuBar-div-label">Purchases</label>
      </div>
    </div>
  );
};

export default MenuBar;
