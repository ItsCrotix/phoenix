import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";

const TabBar = ({ props }) => {
  return (
    <LinearGradient colors={["#f5f5f5", "#DBDBDB"]} start={[1, 0]} end={[0, 0]}>
      <BottomTabBar {...props} style={{ backgroundColor: "transparent" }} />
    </LinearGradient>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
