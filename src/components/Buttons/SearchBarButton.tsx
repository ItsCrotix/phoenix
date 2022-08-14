import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import { TouchableHighlight } from "react-native";

const SearchBarButton = ({ onPress }) => {
  return (
    <TouchableHighlight onPress={() => onPress()}>
      <View style={styles.container}>
        <Icon name="search" style={styles.icon} size={32} />
        <Text style={styles.input}>Artiesten, Albums en meer...</Text>
      </View>
    </TouchableHighlight>
  );
};

export default SearchBarButton;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    flexDirection: "row",
    padding: 5,
    height: 40,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  input: {
    padding: 5,
    width: "90%",
    fontSize: 18,
  },
  icon: {
    color: "#000000",
  },
});
