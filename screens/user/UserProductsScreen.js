import React from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet,
  Platform,
  Alert,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";

import ProductItem from "../../components/shop/ProductItem";
import * as productActions from "../../store/actions/products";

const UserProductScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      {
        text: "No",
        style: "default",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        },
      },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No products found, maybe start creating some?</Text>
      </View>
    );
  }

  return (
    <FlatList
    numColumns={2}
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Product",
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      >
        <Text style={styles.displayText}>Menu</Text>
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.navigate("EditProduct");
        }}
      >
        <Text style={styles.displayText}>Add</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  displayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Platform.OS === "android" ? "white" : Colors.primary,
    paddingHorizontal: 20,
  },
});

export default UserProductScreen;
