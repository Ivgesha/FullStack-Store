import { makeObservable, observable, action, computed } from "mobx";
import axios from "axios";
const serverUrl = "http://localhost:8081";

class MyStore {
  totalPurchases = 0;
  allProductsFromDb = [];
  allPurchasesFromDb = [];
  allCustomersFromDb = [];

  selectedCustomerName = [];
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
      totalPurchases: observable,
      loadTotalPurchases: action,

      allProductsFromDb: observable,
      loadAllProductsFromDb: action,

      allPurchasesFromDb: observable,
      loadAllPurchasesFromDb: action,

      allCustomersFromDb: observable,
      loadAllCustomersFromDb: action,

      selectedCustomerName: observable,
      setSelectedCustomerName: action,

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

  // new approach
  async loadTotalPurchases() {
    const amount = await axios.get(`${serverUrl}/purchases/countAllPurchases`);
    this.totalPurchases = +amount.data[0].count;
  }
  // new approach
  async loadAllProductsFromDb() {
    const allProducts = await axios.get(`${serverUrl}/products`);
    this.allProductsFromDb = allProducts.data;
  }

  // new approach
  async loadAllPurchasesFromDb() {
    const allPurchases = await axios.get(`${serverUrl}/purchases`);
    allPurchases.data = allPurchases.data.map((pur) => {
      pur.date = pur.date.slice(0, 10);
      return pur;
    });
    this.allPurchasesFromDb = allPurchases.data;
  }

  // new approach
  async loadAllCustomersFromDb() {
    const allCustomers = await axios.get(`${serverUrl}/customers`);
    this.allCustomersFromDb = allCustomers.data;
  }

  // new approach
  setSelectedCustomerName(str) {
    this.selectedCustomerName = str;
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
export default MyStore;
