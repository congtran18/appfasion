import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const Cardlogin = (props) => {
  return (
    <View style={{ ...styles.Cardlogin, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
    Cardlogin: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 15,
    backgroundColor: Colors.login,
    opacity: 0.8,
  },
});

export default Cardlogin;
