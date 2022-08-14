import React from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import HomeNavigator from "./navigation/HomeNavigator";
import PageNavigator from "./navigation/PageNavigator";

const Main = () => {
  return <PageNavigator />;
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23232C",
    alignItems: "center",
    justifyContent: "center",
  },
});
