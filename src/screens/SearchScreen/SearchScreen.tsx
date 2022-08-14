import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";

const SearchScreen = ({ navigation }) => {
  const searchInput = useRef();

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  return (
    <SafeAreaView style={styles.saContainer} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchContainerBar}>
            <Icon name="search" style={styles.icon} size={24} color={"white"} />
            <TextInput
              ref={searchInput}
              style={styles.textInput}
              placeholder={"Zoeken"}
              selectionColor={"white"}
              placeholderTextColor={"white"}
            />
          </View>
          <View style={styles.backContainer}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Text style={{ color: "white" }}>annuleren</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  saContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1E1E26",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#23232C",
  },
  searchContainer: {
    width: "100%",
    height: 40,
    backgroundColor: "#1E1E26",
    alignItems: "center",
    flexDirection: "row",
  },
  searchContainerBar: {
    margin: 10,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
    height: "80%",
    borderRadius: 5,
    backgroundColor: "#23232C",
  },
  icon: {
    color: "#FFFFFF",
  },
  textInput: {
    padding: 5,
    color: "white",
    width: "90%",
    fontSize: 16,
  },
  backContainer: {
    width: "25%",
  },
});
