import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as usersActions from "../../store/actions/users";
import Colors from "../../constants/Colors";
import Input from "../../components/UI/Input";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditUserScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prodId = props.navigation.getParam("userID");
  const editedUser = useSelector((state) =>
    state.users.availableUsers.find((prod) => prod.id === prodId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      realname: editedUser ? editedUser.realname : "",
      imageUrl: editedUser ? editedUser.imageUrl : "",
      address: editedUser ? editedUser.address : "",
      phone: editedUser ? editedUser.phone : "",
    },
    inputValidities: {
      realname: editedUser ? true : false,
      imageUrl: editedUser ? true : false,
      address: editedUser ? true : false,
      phone: editedUser ? true : false,
    },
    formIsValid: editedUser ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error[{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    /* if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", {
        text: "Okay",
      });
      return;
    } */
    setError(null);
    setIsLoading(true);
    try {
      if (editedUser) {
        await dispatch(
            usersActions.updateUser(
            prodId,
            formState.inputValues.realname,
            formState.inputValues.imageUrl,
            formState.inputValues.address,
            formState.inputValues.phone,
          )
        );
      } else {
        await dispatch(
            usersActions.addUser(
            formState.inputValues.realname,
            formState.inputValues.imageUrl,
            formState.inputValues.address,
            formState.inputValues.phone,
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="realname"
            label="realname"
            errorText="Please enter a valid realname!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedUser ? editedUser.realname : ""}
            initiallyValid={!!editedUser}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedUser ? editedUser.imageUrl : ""}
            initiallyValid={!!editedUser}
            required
          />
          <Input
            id="address"
            label="address"
            errorText="Please enter a valid address!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedUser ? editedUser.address : ""}
            initiallyValid={!!editedUser}
            required
          />
          <Input
            id="phone"
            label="phone"
            errorText="Please enter a valid phone!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedUser ? editedUser.phone : ""}
            initiallyValid={!!editedUser}
            required
          />
          {/* <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
          <Input
            id="type"
            label="Type"
            errorText="Please enter a valid type!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.type : ""}
            initiallyValid={!!editedProduct}
            required
          /> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditUserScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("userID")
      ? "Edit User"
      : "Add User",
    headerRight: () => (
      <TouchableOpacity onPress={submitFn}>
        <Text style={styles.displayText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
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

export default EditUserScreen;
