import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const respone = await fetch(
        `https://appfasion-default-rtdb.firebaseio.com/orders/${userId}.json`
      );

      if (!respone.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await respone.json();
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].productPrice,
            resData[key].productTitle,
            resData[key].quantity,
            resData[key].sum,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders.reverse() });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (productPrice, productTitle,quantity,sum) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const respone = await fetch(
      `https://appfasion-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productPrice,
          productTitle,
          quantity,
          sum,
          date: date.toISOString(),
        }),
      }
    );

    if (!respone.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await respone.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        productPrice: productPrice,
        productTitle: productTitle,
        quantity: quantity,
        sum: sum,
        date: date,
      },
    });
  };
};
