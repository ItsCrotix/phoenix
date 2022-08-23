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

const ArtistsScreen = ({ navigation }) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://radiophoenix.nu/secure/channel/genre?filter=radio%20phoenix",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        const artists = response.channel.content.data;

        artists.forEach((artist) => {
          const image_uri: string = artist.image_small;
          if (!image_uri.startsWith("https://radiophoenix.nu/")) {
            artist.image_small =
              "https://radiophoenix.nu/" + artist.image_small;
          }
          setArtists(artists);
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
        <Text style={styles.subHeader}>Verenigingen</Text>
      </View>
      {loading ? null : (
        <FlatList
          style={styles.artistContainerBody}
          data={artists}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginVertical: 5,
          }}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={styles.artistContainerItem}
              onPress={() => navigation.navigate("artist", { id: item.id })}
            >
              <View style={{ width: "60%" }}>
                <Text style={styles.artistName}>{item.name}</Text>
              </View>
              <View
                style={{
                  width: "40%",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingBottom: 10,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={{ uri: item.image_small }}
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

export default ArtistsScreen;

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
