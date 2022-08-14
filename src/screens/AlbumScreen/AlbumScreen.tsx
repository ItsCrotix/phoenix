import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Image } from "@rneui/base";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import {
  selectAlbum,
  selectPlayList,
  setAlbum,
  setCurrentTrackIndex,
  setIsPlaying,
  setPlayList,
  setTrack,
} from "../../utils/redux/reducers/musicReducer";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import AlbumLoading from "../../components/AlbumLoading/AlbumLoading";

const AlbumScreen = ({ route }) => {
  const albumId = route.params.id;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const playlist = useAppSelector(selectPlayList);
  const album = useAppSelector(selectAlbum);

  useEffect(() => {
    fetch(
      "https://radiophoenix.nu/secure/albums/" +
        albumId +
        "?defaultRelations=true",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        const tracks = response.album.tracks;
        const album = { ...response.album };
        const image = album.image;

        tracks.forEach((track) => {
          if (!track.url.startsWith("https://radiophoenix.nu/")) {
            track.url = "https://radiophoenix.nu/" + track.url;
          }
        });

        if (!image.startsWith("https://radiophoenix.nu/")) {
          album.image = "https://radiophoenix.nu/" + image;
        }
        dispatch(setPlayList(tracks));
        dispatch(setAlbum(album));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSongPress = (track) => {
    const selectedSong = playlist.findIndex((item) => item.url === track.url);
    dispatch(setTrack(playlist[selectedSong]));
    dispatch(setCurrentTrackIndex(selectedSong));
  };

  if (!loading) {
    return (
      <SafeAreaView style={styles.albumContainer}>
        <ScrollView style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <Image
              source={{ uri: album.image }}
              style={{ width: 250, height: 250, borderRadius: 10 }}
            />
          </View>
          <View
            style={{ width: "100%", paddingHorizontal: 10, paddingBottom: 20 }}
          >
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
              {album.name}
            </Text>
            <Text style={{ color: "white", fontSize: 16 }}>
              {album.artists[0].name}
            </Text>
          </View>
          {loading
            ? null
            : album.tracks.map((track) => {
                return (
                  <TouchableOpacity
                    key={track.id}
                    onPress={() => {
                      handleSongPress(track);
                    }}
                    style={{
                      width: "100%",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        alignItems: "flex-start",
                        marginVertical: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        {track.name}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 14,
                        }}
                      >
                        {track.artists.length > 0
                          ? track.artists[0].name
                          : "Various Artists"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          <View style={{ width: "100%", minHeight: 50, maxHeight: 50 }} />
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return <AlbumLoading />;
  }
};

export default AlbumScreen;

const styles = StyleSheet.create({
  albumContainer: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    width: "100%",
    height: "35%",
    padding: 5,
    backgroundColor: "#1E1E26",
  },
});
