import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Card from "../UI/Card";

const UserItem = (props) => {
    let TouchableCmp = TouchableOpacity;
  
    if (Platform.OS === "android" && Platform.Version >= 21) {
      TouchableCmp = TouchableNativeFeedback;
    }

return (
    <Card style={styles.user}>
        <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
            <View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
                <Text style={styles.realname}>name:{props.realname}</Text>
                <Text style={styles.address}>address:{props.address}</Text>
                <Text style={styles.phone}>phone:{props.phone}</Text>
            </View>
            <View style={styles.actions}>{props.children}</View>
            </View>
        </TouchableCmp>
        </View>
    </Card>
    );
};

const styles = StyleSheet.create({
    user: {
        height: 500,
        margin: 20,
    },
    touchable: {
        borderRadius: 15,
        overflow: "hidden",
    },
    imageContainer: {
        width: "100%",
        height: "70%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    details: {
        alignItems: "center",
        height: "15%",
        padding: 5,
    },
    realname: {
        fontWeight: "bold",
        fontSize: 18,
        marginVertical: 1,
        textAlign: "center",
    },
    address: {
        fontWeight: "bold",
        fontSize: 18,
        marginVertical: 1,
        textAlign: "center",
    },
    phone: {
        fontWeight: "bold",
        fontSize: 18,
        marginVertical: 1,
        textAlign: "center",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "20%",
        paddingHorizontal: 18,
    },
    });
    
    export default UserItem;