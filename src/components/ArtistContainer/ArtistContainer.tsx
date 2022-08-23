import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "@rneui/base";

const ArtistContainer = ({ navigation }) => {
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
        });
        setArtists(artists);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.artistContainer}>
      <View style={styles.artistContainerHeader}>
        <Text style={styles.subHeader}>Verenigingen</Text>
      </View>
      <View
        style={{
          width: "95%",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {loading
          ? null
          : artists.map((artist, index) => {
              if (index < 8)
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.artistContainerItem}
                    onPress={() =>
                      navigation.navigate("artist", { id: artist.id })
                    }
                  >
                    <View style={{ width: "60%" }}>
                      <Text style={styles.artistName}>{artist.name}</Text>
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
                        source={{ uri: artist.image_small }}
                        style={styles.artistImage}
                      />
                    </View>
                  </TouchableOpacity>
                );
            })}
      </View>
      <View style={{ width: "95%" }}>
        <TouchableOpacity onPress={() => navigation.navigate("artists")}>
          <Text
            style={{
              color: "white",
              textDecorationLine: "underline",
              fontSize: 16,
            }}
          >
            Alle Verenigingen
          </Text>
        </TouchableOpacity>
      </View>
      {Platform.OS === "android" ? <View style={{ height: 55 }} /> : null}
    </View>
  );
};

export default ArtistContainer;

const styles = StyleSheet.create({
  artistContainer: {
    alignItems: "center",
    width: "100%",
    padding: 5,
    marginBottom: 35,
  },
  artistContainerHeader: {
    width: "95%",
    textAlign: "left",
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
