import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

const CategoryGridTile = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableOpacity style={styles.gridItem} onPress={props.onSelect}>
      {/* <View
        style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
        <Text style={styles.title} numberOfLines={2}>
          {props.title}
        </Text>
      </View> */}
      
      <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />

        </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  gridItem: {
    width: "50%",
    height: 300,
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',
    elevation: 5,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    padding: 2,
  },
    image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right',
    resizeMode: "contain",
  },
});

export default CategoryGridTile;
