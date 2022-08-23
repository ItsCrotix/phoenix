import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Icon, Image } from "@rneui/base";
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
import { LinearGradient } from "expo-linear-gradient";
import TrackPlayer from "react-native-track-player";
import { useNavigation } from "@react-navigation/native";

type track = {
  url: string;
  title: string;
  artist: string;
  artwork: string;
  duration: number;
};

const AlbumScreen = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const album = useAppSelector(selectAlbum);
  const albumId = route.params.id;
  const dispatch = useAppDispatch();
  const [backgroundColor, setBackgroundColor] = useState("#1E1E26");
  const navigation = useNavigation();

  const parseTrackData = (album, track) => {
    return {
      url: track.url,
      title: track.name,
      artist:
        track.artists.length > 0 ? track.artists[0].name : "Various Artists",
      album: album.name,
      artwork: album.image,
      duration: track.duration,
    } as track;
  };

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
        const album = { ...response.album };
        if (!response.album.image.startsWith("https://radiophoenix.nu/")) {
          album.image = "https://radiophoenix.nu/" + album.image;
        }

        response.album = album;
        dispatch(setAlbum(album));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        selectRandomColor();
        setLoading(false);
      });
  }, []);

  const selectRandomColor = () => {
    const colors = [
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4caf50",
      "#8bc34a",
    ];
    setBackgroundColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  const handleSongPress = async (track) => {
    const playlist: track[] = [];
    const index = album.tracks.findIndex((t) => t.name === track.name);

    album.tracks.forEach((t, i) => {
      if (i >= index) {
        const trackObj = { ...t };
        if (!t.url.startsWith("https://radiophoenix.nu/")) {
          trackObj.url = "https://radiophoenix.nu/" + t.url;
        }
        playlist.push(parseTrackData(album, trackObj));
      }
    });

    album.tracks.forEach((t, i) => {
      if (i < index) {
        const trackObj = { ...t };
        if (!t.url.startsWith("https://radiophoenix.nu/")) {
          trackObj.url = "https://radiophoenix.nu/" + t.url;
        }
        playlist.push(parseTrackData(album, trackObj));
      }
    });

    dispatch(setPlayList(playlist));
  };

  if (!loading) {
    return (
      <SafeAreaView
        style={{
          ...styles.albumContainer,
          backgroundColor: backgroundColor,
        }}
        edges={["top"]}
      >
        <LinearGradient
          colors={[backgroundColor, "#1E1E26"]}
          start={[0, 0.6]}
          end={[0.0, 0.8]}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{
              position: "relative",
              width: "100%",
              backgroundColor: "transparent",
            }}
            contentContainerStyle={{
              backgroundColor: "#1E1E26",
              paddingBottom: 50,
            }}
          >
            <LinearGradient
              colors={[backgroundColor, "#1E1E26"]}
              start={[0, 0]}
              end={[0.0, 1]}
              style={{ flex: 1 }}
            >
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 50,
                  paddingTop: 30,
                }}
              >
                <View style={{ position: "absolute", top: 10, left: 20 }}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name={"arrow-back"} color={"white"} />
                  </TouchableOpacity>
                </View>
                <Image
                  source={{ uri: album.image }}
                  style={{ width: 250, height: 250, borderRadius: 10 }}
                />
              </View>
            </LinearGradient>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 15,
                paddingBottom: 20,
                backgroundColor: "#1E1E26",
              }}
            >
              <View
                style={{
                  width: "80%",
                  backgroundColor: "#1E1E26",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
                >
                  {album.name}
                </Text>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {album.artists.length > 0
                    ? album.artists[0].name
                    : "Various Artists"}
                </Text>
              </View>
              <View style={{ width: "20%" }}>
                <TouchableOpacity
                  onPress={() => handleSongPress(album.tracks[0])}
                >
                  <Icon name="play-circle-filled" size={48} color="white" />
                </TouchableOpacity>
              </View>
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
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        backgroundColor: "#1E1E26",
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
        </LinearGradient>
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
    width: "100%",
    height: "35%",
  },
});
