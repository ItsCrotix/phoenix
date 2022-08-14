import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon, Image } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";

const NewReleasesScreen = ({ navigation }) => {
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://radiophoenix.nu/secure/channel/popular-albums", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        const albums = response.channel.content.data;

        albums.forEach((album) => {
          const image: string = album.image;
          if (!image.startsWith("https://radiophoenix.nu/")) {
            album.image = "https://radiophoenix.nu/" + album.image;
          }
          setNewReleases(albums);
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.artistContainer} edges={["top"]}>
      <View style={styles.artistContainerHeader}>
        <Icon
          name={"arrow-back"}
          color={"white"}
          style={{ marginRight: 5 }}
          onPress={() => {
            navigation.pop();
          }}
        />
        <Text style={styles.subHeader}>New Releases</Text>
      </View>
      {loading ? null : (
        <FlatList
          style={styles.artistContainerBody}
          data={newReleases}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginVertical: 5,
          }}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.artistContainerItem}
              onPress={() => navigation.navigate("album", { id: item.id })}
            >
              <View style={{ width: "60%" }}>
                <Text style={styles.artistName}>{item.name}</Text>
              </View>
              <View
                style={{
                  width: "40%",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  // backgroundColor: "red",
                  paddingBottom: 10,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.artistImage}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={{ width: "100%", minHeight: 80, maxHeight: 80 }} />
    </SafeAreaView>
  );
};

export default NewReleasesScreen;

const styles = StyleSheet.create({
  artistContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1E1E26",
    paddingHorizontal: 5,
  },
  artistContainerHeader: {
    width: "95%",
    textAlign: "left",
    flexDirection: "row",
    padding: 5,
  },
  artistContainerBody: {
    width: "95%",
  },
  subHeader: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  artistContainerItem: {
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: "49%",
    height: 120,
    backgroundColor: "#23232C",
    borderRadius: 10,
  },
  artistImage: {
    width: 75,
    height: 75,
  },
  artistName: {
    width: "100%",
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
