import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchContainer from "../../components/SearchContainer/SearchContainer";
import ArtistContainer from "../../components/ArtistContainer/ArtistContainer";
import NewReleasesContainer from "../../components/NewReleasesContainer/NewReleasesContainer";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <SearchContainer navigation={navigation} /> */}
      <ScrollView style={{ flex: 1 }}>
        <ArtistContainer navigation={navigation} />
        <NewReleasesContainer navigation={navigation} />
        <View style={{ width: "100%", paddingBottom: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E26",
  },
});
