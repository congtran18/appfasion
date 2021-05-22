import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  Alert,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ToastAndroid,
  AlertIOS,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import * as ordersActions from "../../store/actions/orders";
import * as billActions from "../../store/actions/bills";
import * as usersActions from "../../store/actions/users";

const ProductDetailScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  const userProfile = useSelector((state) => state.users.profileUsers.find((prod) => prod.id !== null));
  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(selectedProduct.price, selectedProduct.title, count, parseFloat(selectedProduct.price).toFixed(2)*count));
    //await dispatch(billActions.addBill(selectedProduct.ownerId,selectedProduct.price, selectedProduct.title, count, parseFloat(selectedProduct.price).toFixed(2)*count, userProfile.realname, userProfile.address, userProfile.phone));
    setIsLoading(false);
  };
  const sendBillHandler = async () => {
    setIsLoading(true);
    await dispatch(billActions.addBill(selectedProduct.ownerId,selectedProduct.price, selectedProduct.title, count, parseFloat(selectedProduct.price).toFixed(2)*count, userProfile.realname, userProfile.address, userProfile.phone));
    setIsLoading(false);
  };
  // if (userProfile.length === 0) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text>No products found. Maybe start adding some!</Text>
  //     </View>
  //   );
  // }
  // useEffect(() => {
  //   document.title = `You clicked ${count} times`;
  // });
  const increase = () => {
    setCount(count => count + 1);
  };

  const decrease = () => {
    setCount(count => count - 1);
  };

  const notifyMessage = () =>{
    if (Platform.OS === 'android') {
      ToastAndroid.show("dat hang thanh cong", ToastAndroid.SHORT)
    } else {
      AlertIOS.alert("dat hang thanh cong");
    }
  }

  return (
    
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Buy product"
          onPress={() => {
            Alert.alert("Are you sure?", "Do you really want to Order this product? all is " + parseFloat(selectedProduct.price).toFixed(2)*count, [
              {
                text: "No",
                style: "default",
              },
              {
                text: "Yes",
                style: "destructive",
                onPress: () => {
                  // dispatch(cartActions.addToCart(selectedProduct));
                  sendBillHandler();
                  sendOrderHandler();
                  notifyMessage();
                },
              },
            ]);
          }}
        />
      </View>
      <View style={styles.actions}>
              <TouchableOpacity
                style={styles.btn}
                disabled={count <= 1}
                onPress={decrease}>
                <Text style={styles.btnTxt}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counter}>{count}</Text>
              <TouchableOpacity style={styles.btn} onPress={increase}>
                <Text style={styles.btnTxt}>+</Text>
              </TouchableOpacity>
            </View>
      <Text style={styles.price}>${parseFloat(selectedProduct.price).toFixed(2)*count}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

const styles = StyleSheet.create({
  displayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Platform.OS === "android" ? "white" : Colors.primary,
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    marginHorizontal: 20,
  },
  type: {
    fontSize: 15,
    textAlign: "center",
    marginHorizontal: 20,
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  btn: {
    width: 36,
    height: 36,
    borderRadius: 36,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  btnTxt: {
    fontSize: 16,
    color: '#5A6868',
  },
  counter: {
    marginHorizontal: 10,
  },
});

export default ProductDetailScreen;
