
import React, { useEffect, useState , useCallback} from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";

import UserItem from "../../components/shop/UserItem";
import * as usersActions from "../../store/actions/users";

const UserProfileScreen = (props) => {
  // const userId = getState().auth.userId;
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const userProfile = useSelector((state) => state.users.profileUsers);
  const dispatch = useDispatch();

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
      loadedUsers
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadedUsers]);

  useEffect(() => {
    setIsLoading(true);
    loadedUsers().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadedUsers]);

//   const selectItemHandler = (id, title) => {
//     props.navigation.navigate("ProductDetail", {
//       productId: id,
//       productTitle: title,
//     });
//   };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occuerd!</Text>
        <Button
          title="Try again"
          onPress={loadedUsers}
          color={Colors.primary}
        />
      </View>
    );
  }
  const editUserHandler = (id) => {
    props.navigation.navigate("editUser", { userID: id });
  };   
  const editUserHandler2 = () => {
    props.navigation.navigate("editUser");
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
//   const deleteHandler = (id) => {
//     Alert.alert("Are you sure?", "Do you really want to delete this item?", [
//       {
//         text: "No",
//         style: "default",
//       },
//       {
//         text: "Yes",
//         style: "destructive",
//         onPress: () => {
//           dispatch(productActions.deleteProduct(id));
//         },
//       },
//     ]);
//   };


    // if (userProfile.length === 0) {
    //     navData.navigation.navigate("EditProduct");
    //   }
    if (!isRefreshing && !isLoading && userProfile.length === 0) {
        editUserHandler2();
    }

  return (
    <FlatList
    onRefresh={loadedUsers}
    refreshing={isRefreshing}
      data={userProfile}
    //   refreshing={isRefreshing}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <UserItem
          image={itemData.item.imageUrl}
          realname={itemData.item.realname}
          address={itemData.item.address}
          phone={itemData.item.phone}
          onSelect={() => {
            editUserHandler(itemData.item.id);
          }}
        >
          {/* <Button  style={{width:170,backgroundColor:'#99004d',marginTop:100,}}
            color={Colors.primary}
            title="Edit"
            onPress={() => {
                editUserHandler(itemData.item.id);
            }}
          /> */}
        </UserItem>
      )}
    />
  );


};

UserProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Profile",
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      >
        <Text style={styles.displayText}>Menu</Text>
      </TouchableOpacity>
    ),
    // headerRight: () => (
    //   <TouchableOpacity
    //     onPress={() => {
    //       navData.navigation.navigate("editUser");
    //     }}
    //   >
    //     <Text style={styles.displayText}>Add</Text>
    //   </TouchableOpacity>
    // ),
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

export default UserProfileScreen;
