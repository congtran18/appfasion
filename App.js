import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
/* import AppLoading from "expo-app-loading"; */
/* import * as Font from "expo-font"; */
/* import { Ionicons } from "@expo/vector-icons"; */

import productsReducer from "./store/reducers/products";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";
import billsReducer from "./store/reducers/bills";
import usersReducer from "./store/reducers/users";
import NavigationContainer from "./navigation/NavigationContainer";

const rootReducer = combineReducers({
  products: productsReducer,
  orders: ordersReducer,
  bills: billsReducer,
  auth: authReducer,
  users: usersReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

/* const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
}; */

export default function App() {
  /*   const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  } */

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
