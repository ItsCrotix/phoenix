import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";

const SearchScreen = ({ navigation }) => {
  const searchInput = useRef();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(true);
  const [timeSpan, setTimeSpan] = useState(0);

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  const search = () => {
    setLoading(true);
    console.log("searching for " + searchText);
    fetch(
      "https://radiophoenix.nu/secure/search?limit=3&types=artist,album,track,user,playlist&query=" +
        searchText,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setSearchResults(response.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
              value={searchText}
              returnKeyType="search"
              onSubmitEditing={search}
              onChangeText={(text) => {
                setSearchText(text);
              }}
            />
          </View>
          <View style={styles.backContainer}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Text style={{ color: "white" }}>annuleren</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 5, flex: 1, width: "100%" }}>
          <Text style={{ color: "white", fontSize: 18 }}>Artists</Text>
          <ScrollView>
            {searchResults && searchResults.artists
              ? searchResults.artists.map((artist) => {
                  return <Text style={{ color: "white" }}>{artist.name}</Text>;
                })
              : null}
          </ScrollView>
        </View>
        <View style={{ padding: 5, flex: 1, width: "100%" }}>
          <Text style={{ color: "white", fontSize: 18 }}>Songs</Text>
          <ScrollView>
            {searchResults && searchResults.tracks
              ? searchResults.tracks.map((track) => {
                  return <Text style={{ color: "white" }}>{track.name}</Text>;
                })
              : null}
          </ScrollView>
        </View>
        <View style={{ padding: 5, flex: 1, width: "100%" }}>
          <Text style={{ color: "white", fontSize: 18 }}>Albums</Text>
          <ScrollView>
            {searchResults && searchResults.albums
              ? searchResults.albums.map((album) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("album", { id: album.id })
                      }
                    >
                      <Text style={{ color: "white" }}>{album.name}</Text>
                    </TouchableOpacity>
                  );
                })
              : null}
          </ScrollView>
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
