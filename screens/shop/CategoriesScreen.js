import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList,TouchableOpacity, Text } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as productsActions from "../../store/actions/products";
import * as usersActions from "../../store/actions/users";
import CategoryGridTile from '../../components/shop/CategoryGridTile';
import { CATEGORIES } from '../../data/dummy-data';


const CategoriesScreen = (props) => {
  //load product
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts(2));
    } catch (err) {
      setError("TEST" + err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  const loadedUsers = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(usersActions.fetchUsers());
    } catch (err) {
      setError("TEST" + err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts,
      loadedUsers
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts,loadedUsers]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
    loadedUsers().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts,loadedUsers]);
  const renderGridItem = itemData => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        onSelect={() => {
          // props.navigation.navigate({
          //   routeName: 'ProductsOverview',
          //   params: { categoryId: itemData.item.id },
          //   //categoryId: itemData.item.id,
            
          // });
          props.navigation.navigate("ProductsOverview", {
            categoryType: itemData.item.title,
            //productTitle: title,
          });
        }}
      />
      
    );
  };

  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
};

CategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'FASHION',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    // headerRight: () => ( 
    //   <TouchableOpacity
    //     onPress={() => {
    //       navData.navigation.navigate("Cart");
    //     }}
    //   >
    //     <Text style={styles.displayText}>Cart</Text>
    //   </TouchableOpacity>
    // ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoriesScreen;
