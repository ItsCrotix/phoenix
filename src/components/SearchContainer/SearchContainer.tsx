import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchBarButton from "../Buttons/SearchBarButton";

const SearchContainer = ({ navigation }) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchContainerHeader}>
        <Text style={styles.subHeader}>Zoeken</Text>
      </View>
      <View style={styles.searchContainerBody}>
        <SearchBarButton
          onPress={() => {
            navigation.navigate("SearchModal");
          }}
        />
      </View>
    </View>
  );
};

export default SearchContainer;

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: "center",
    width: "100%",
    height: "15%",
    padding: 5,
  },
  searchContainerHeader: {
    width: "95%",
    textAlign: "left",
    padding: 5,
  },
  searchContainerBody: {
    alignItems: "center",
    padding: 5,
  },
  subHeader: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
