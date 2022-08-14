import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Icon name="search" style={styles.icon} size={32} />
      <TextInput style={styles.input} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flexDirection: "row",
    padding: 10,
    height: 50,
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
