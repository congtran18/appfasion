import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import BillItem from "../../components/shop/BillItem";
import * as billsActions from "../../store/actions/bills";

const BillsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const bills = useSelector((state) => state.bills.bills);
  const dispatch = useDispatch();

  const loadBills = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(billsActions.fetchBills());
    } catch (err) {
      setError("TEST" + err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadBills
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadBills]);

  useEffect(() => {
    setIsLoading(true);
    loadBills().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadBills]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   dispatch(billsActions.fetchBills()).then(() => {
  //     setIsLoading(false);
  //   });
  // }, [dispatch]);
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occuerd!</Text>
        <Button
          title="Try again"
          onPress={loadBills}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && bills.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No bills found, maybe start creating some?</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadBills}
      refreshing={isRefreshing}
      data={bills}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <BillItem
          sum={itemData.item.sum}
          date={itemData.item.readableDate}
          productTitle={itemData.item.productTitle}
          quantity={itemData.item.quantity}
          realname={itemData.item.realname}
          address={itemData.item.address}
          phone={itemData.item.phone}
        />
      )}
    />
  );
};

BillsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Bill",
    headerLeft: () => (
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
  };
};

const styles = StyleSheet.create({
  displayText: {
    fontSize: 18,
    fontWeight: "bold",
    //color: Platform.OS === "android" ? "white" : Colors.primary,
    paddingHorizontal: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BillsScreen;
