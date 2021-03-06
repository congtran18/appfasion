import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = (type2) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const respone = await fetch(
        "https://appfasion-default-rtdb.firebaseio.com/products.json"
      );

      if (!respone.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await respone.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
            resData[key].type,
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
        productsType: loadedProducts.filter((prod) => prod.type === type2),
      });
    } catch (err) {
      // send to custom analytics server or handle error somehow.
      throw err;
    }
  };
};

// export const fetchProductstype = (type2) => {
//   return async (dispatch, getState) => {
//     const userId = getState().auth.userId;
//     try {
//       const respone = await fetch(
//         "https://appfasion-default-rtdb.firebaseio.com/products.json"
//       );

//       if (!respone.ok) {
//         throw new Error("Something went wrong!");
//       }

//       const resData = await respone.json();
//       const loadedProducts = [];
//       for (const key in resData) {
//         loadedProducts.push(
//           new Product(
//             key,
//             resData[key].ownerId,
//             resData[key].title,
//             resData[key].imageUrl,
//             resData[key].description,
//             resData[key].price,
//             resData[key].type,
//           )
//         );
//       }

//       dispatch({
//         type: SET_PRODUCTS,
//         products: loadedProducts,
//         Productstype: loadedProducts.filter((prod) => prod.type === type2),
//       });
//     } catch (err) {
//       // send to custom analytics server or handle error somehow.
//       throw err;
//     }
//   };
// };

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://appfasion-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    return { type: DELETE_PRODUCT, pid: productId };
  };
};

export const createProduct = (title, description, imageUrl, price, type) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const respone = await fetch(
      `https://appfasion-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          type,
          ownerId: userId,
        }),
      }
    );

    const resData = await respone.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        type,
        ownerId: userId,
      },
    });
  };
};

export const updateProduct = (title, description, imageUrl, price, type) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://appfasion-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          type,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
        price,
        type,
      },
    });
  };
};
