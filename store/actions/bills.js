import Bill from "../../models/bill";

export const ADD_BILL = "ADD_BILL";
export const SET_BILLS = "SET_BILLS";

export const fetchBills = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const respone = await fetch(
        `https://appfasion-default-rtdb.firebaseio.com/bills/${userId}.json`
      );

      if (!respone.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await respone.json();
      const loadedBills = [];
      for (const key in resData) {
        loadedBills.push(
          new Bill(
            key,
            resData[key].productPrice,
            resData[key].productTitle,
            resData[key].quantity,
            resData[key].sum,
            resData[key].realname,
            resData[key].address,
            resData[key].phone,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({ 
          type: SET_BILLS, 
          bills:loadedBills.reverse(),
        //   userProfile: loadedUsers.filter((prod) => prod.ownerId === userId),
     });
    } catch (err) {
      throw err;
    }
  };
};

export const addBill = (ownerid, productPrice, productTitle, quantity, sum, realname, address, phone) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const respone = await fetch(
      `https://appfasion-default-rtdb.firebaseio.com/bills/${ownerid}.json?auth=${token}`,
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
          realname,
          address,
          phone,
          date: date.toISOString(),
        }),
      }
    );

    if (!respone.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await respone.json();

    dispatch({
      type: ADD_BILL,
      billData: {
        id: resData.name,
        productPrice,  
        productTitle,
        quantity,
        sum, 
        realname,
        address,
        phone,
        date: date,
      },
    });
  };
};