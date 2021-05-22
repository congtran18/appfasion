class Order {
  constructor(id, productPrice, productTitle, quantity, sum, date) {
    this.id = id;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.quantity = quantity;
    this.sum = sum;
    this.date = date;
  }

  get readableDate() {
    return this.date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

export default Order;
