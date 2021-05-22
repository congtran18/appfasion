import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  View,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { CATEGORIES } from '../../data/dummy-data';
import ProductItem from "../../components/shop/ProductItem";
import * as productsActions from "../../store/actions/products";
import Colors from "../../constants/Colors";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
/* import HeaderButton from "../../components/UI/HeaderButton"; */

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const categoryType = props.navigation.getParam("categoryType");
  const products = useSelector((state) => state.products.availableProducts).filter(function(item){
    return item.type == categoryType;
 }).map(function({id, ownerId, title, imageUrl, description, price, type}){
     return {id, ownerId, title, imageUrl, description, price, type};
 });
 const WIDTH = Dimensions.get('window').width;
//   data = data.filter(function(item){
//     return item.state == 'New York';
//  }).map(function({id, name, city}){
//      return {id, name, city};
//  });
  //const products = useSelector((state) =>state.products.availableProducts);
  // const dispatch = useDispatch();

  // const loadProducts = useCallback(async () => {
  //   setError(null);
  //   setIsRefreshing(true);
  //   try {
  //     await dispatch(productsActions.fetchProducts(2));
  //   } catch (err) {
  //     setError("TEST" + err.message);
  //   }
  //   setIsRefreshing(false);
  // }, [dispatch, setIsLoading, setError]);

  // useEffect(() => {
  //   const willFocusSub = props.navigation.addListener(
  //     "willFocus",
  //     loadProducts
  //   );
  //   return () => {
  //     willFocusSub.remove();
  //   };
  // }, [loadProducts]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   loadProducts().then(() => {
  //     setIsLoading(false);
  //   });
  // }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  // if (error) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text>An error occuerd!</Text>
  //       <Button
  //         title="Try again"
  //         onPress={loadProducts}
  //         color={Colors.primary}
  //       />
  //     </View>
  //   );
  // }

  // if (isLoading) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" color={Colors.primary} />
  //     </View>
  //   );
  // }

  if (products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList 
    numColumns={2}
    //  contentContainerStyle={{alignSelf: 'flex-start'}}
    //   numColumns={2}
    // showsVerticalScrollIndicator={true}
    // showsHorizontalScrollIndicator={false}
      // onRefresh={loadProducts}
      // refreshing={isRefreshing}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
           <View style={styles.actions}>
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          </View>
          {/* <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          /> */}
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",

  };
};

const styles = StyleSheet.create({
  actions: {
    marginVertical: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  displayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Platform.OS === "android" ? "white" : Colors.primary,
    paddingHorizontal: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductsOverviewScreen;
