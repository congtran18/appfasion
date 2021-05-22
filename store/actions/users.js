import User from "../../models/user";

export const UPDATE_USER = "UPDATE_USER";
export const ADD_USER = "ADD_USER";
export const SET_USERS = "SET_USERS";

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const respone = await fetch(
        `https://appfasion-default-rtdb.firebaseio.com/users.json`
      );

      if (!respone.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await respone.json();
      const loadedUsers = [];
      for (const key in resData) {
        loadedUsers.push(
          new User(
            key,
            resData[key].ownerId,
            resData[key].realname,
            resData[key].imageUrl,
            resData[key].address,
            resData[key].phone,
          )
        );
      }
      dispatch({ 
          type: SET_USERS, 
          users:loadedUsers,
          userProfile: loadedUsers.filter((prod) => prod.ownerId === userId),
     });
    } catch (err) {
      throw err;
    }
  };
};

export const addUser = (realname, imageUrl, address, phone) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const respone = await fetch(
      `https://appfasion-default-rtdb.firebaseio.com/users.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          realname,
          imageUrl,
          address,
          phone,
          ownerId: userId,
        }),
      }
    );

    if (!respone.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await respone.json();

    dispatch({
      type: ADD_USER,
      userData: {
        id: resData.name,
        realname,
        imageUrl,
        address,
        phone,
        ownerId: userId,
      },
    });
  };
};

export const updateUser = (id, realname, imageUrl, address) => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      const response = await fetch(
        `https://appfasion-default-rtdb.firebaseio.com/users/${userId}/${id}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            realname,
            imageUrl,
            address,
            phone,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
  
      dispatch({
        type: UPDATE_USER,
        pid: id,
        userData: {
            realname,
            imageUrl,
            address,
            phone,
        },
      });
    };
  };
