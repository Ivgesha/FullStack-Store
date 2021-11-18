import { makeObservable, observable, action, computed } from "mobx";
class ShopStore {
  totalAmountOfPurchases = 0;

  allProducts = [];
  // prodcutsList = ["PC", "Mouse", "keyboard", "Table", "Chair", "Screen"];
  prodcutsList = ["Chair", "PC", "Mouse", "Fan", "Keyboad", "Screen", "Table"];
  addProductToCustomerStyle = "addProductToCustomer-invisible";
  selectedProduct = null;
  selectedCustomer = null;
  addBtnCustomerId = null;
  addBtnProductId = null;
  addedProduct = false;
  constructor() {
    makeObservable(this, {
      totalAmountOfPurchases: observable,
      setTotalAmountOfPurchases: action,
      getTotalAmountOfPurchases: computed,
      loadTotalAmountOfPurchases: computed,

      allProducts: observable,
      setAllProducts: action,
      getAllProducts: computed,

      prodcutsList: observable,
      getProdcutsList: computed,

      addProductToCustomerStyle: observable,
      setAddProductToCustomerStyle: action,
      getAddProductToCustomerStyle: computed,

      selectedProduct: observable,
      setSelectedProduct: action,
      getSelectedProduct: computed,

      selectedCustomer: observable,
      setSelectedCustomer: action,
      getSelectedCustomer: computed,

      addBtnCustomerId: observable,
      setAddBtnCustomerId: action,
      getAddBtnCustomerId: computed,

      addBtnProductId: observable,
      setAddBtnProductId: action,
      getAddBtnProductId: computed,

      addedProduct: observable,
      setAddedProduct: action,
      getAddedProduct: computed,
    });
  }

  setTotalAmountOfPurchases(amount) {
    this.totalAmountOfPurchases = amount;
  }
  get getTotalAmountOfPurchases() {
    return this.totalAmountOfPurchases;
  }

  get loadTotalAmountOfPurchases() {}
  setAllProducts(allProducts) {
    console.log(allProducts);
    this.allProducts = allProducts;
  }
  get getAllProducts() {
    return this.allProducts;
  }

  get getProdcutsList() {
    return this.prodcutsList;
  }

  setAddProductToCustomerStyle(style) {
    this.addProductToCustomerStyle = style;
  }

  get getAddProductToCustomerStyle() {
    return this.addProductToCustomerStyle;
  }

  setSelectedProduct(selectedProd) {
    this.selectedProduct = selectedProd;
  }
  get getSelectedProduct() {
    return this.selectedProduct;
  }

  setSelectedCustomer(selectedCustomer) {
    this.selectedCustomer = selectedCustomer;
  }

  get getSelectedCustomer() {
    return this.selectedCustomer;
  }

  setAddBtnCustomerId(customerId) {
    this.addBtnCustomerId = customerId;
  }
  get getAddBtnCustomerId() {
    return this.addBtnCustomerId;
  }

  setAddBtnProductId(productId) {
    this.addBtnProductId = productId;
  }
  get getAddBtnProductId() {
    return this.addBtnProductId;
  }

  setAddedProduct(bool) {
    this.addedProduct = bool;
  }
  get getAddedProduct() {
    return this.addedProduct;
  }
}

export default ShopStore;
