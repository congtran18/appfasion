import { ADD_ORDER, SET_ORDERS } from "../actions/orders";
import Order from "../../models/order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.productPrice,
        action.orderData.productTitle,
        action.orderData.quantity,
        action.orderData.sum,
        action.orderData.date,
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }
  return state;
};
