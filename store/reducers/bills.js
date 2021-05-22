import Bill from "../../models/bill";
import { ADD_BILL, SET_BILLS } from "../actions/bills";

const initialState = {
  bills: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BILLS:
      return {
        bills: action.bills,
      };
    case ADD_BILL:
      const newBill = new Bill(
        action.billData.id,
        action.billData.productPrice,
        action.billData.productTitle,
        action.billData.quantity,
        action.billData.sum,
        action.billData.realname,
        action.billData.address,
        action.billData.phone,
        action.billData.date,
      );
      return {
        ...state,
        bills: state.bills.concat(newBill),
      };
  }
  return state;
};
