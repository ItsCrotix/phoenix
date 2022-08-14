import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "@rneui/base";

const NewReleasesContainer = ({ navigation }) => {
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
    <View style={styles.artistContainer}>
      <View style={styles.artistContainerHeader}>
        <Text style={styles.subHeader}>New Releases</Text>
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
          : newReleases.map((album, index) => {
              if (index < 4)
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.artistContainerItem}
                    onPress={() =>
                      navigation.navigate("album", { id: album.id })
                    }
                  >
                    <View style={{ width: "60%" }}>
                      <Text style={styles.artistName}>{album.name}</Text>
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
                        source={{ uri: album.image }}
                        style={styles.artistImage}
                      />
                    </View>
                  </TouchableOpacity>
                );
            })}
      </View>
      <View style={{ width: "95%" }}>
        <TouchableOpacity onPress={() => navigation.navigate("newReleases")}>
          <Text style={{ color: "white", textDecorationLine: "underline" }}>
            Alle New Releases
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewReleasesContainer;

const styles = StyleSheet.create({
  artistContainer: {
    alignItems: "center",
    width: "100%",
    height: "35%",
    padding: 5,
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
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
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
