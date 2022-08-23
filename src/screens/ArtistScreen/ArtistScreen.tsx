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

const ArtistScreen = ({ route }) => {
  const artistId = route.params.id;
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState();
  const [backgroundColor, setBackgroundColor] = useState("#1E1E26");
  const [albums, setAlbums] = useState();
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const parseTrackData = (album, track) => {
    return {
      url: track.url,
      title: track.name,
      artist:
        track.artists.length > 0 ? track.artists[0].name : "Various Artists",
      artwork: album.image,
      duration: track.duration,
    } as track;
  };

  const replaceUrl = (url: string) => {
    if (!url.startsWith("https://radiophoenix.nu/")) {
      return "https://radiophoenix.nu/" + url;
    } else {
      return url;
    }
  };

  const handleSongPress = async (album, track) => {
    const playlist: track[] = [];
    const index = album.tracks.findIndex((t) => t.name === track.name);

    album.tracks.forEach((t, i) => {
      if (i >= index) {
        const trackObj = { ...t };
        trackObj.url = replaceUrl(t.url);
        playlist.push(parseTrackData(album, trackObj));
      }
    });

    album.tracks.forEach((t, i) => {
      if (i < index) {
        const trackObj = { ...t };
        if (!t.url.startsWith("https://radiophoenix.nu/")) {
          trackObj.url = replaceUrl(t.url);
        }
        playlist.push(parseTrackData(album, trackObj));
      }
    });
    dispatch(setAlbum(album));
    dispatch(setPlayList(playlist));
  };

  const handleOtherSongsPress = async (track) => {
    const playlist: track[] = [];
    const index = artist.top_tracks.findIndex((t) => t.name === track.name);

    artist.top_tracks.forEach((t, i) => {
      if (i >= index) {
        const trackObj = { ...t };
        trackObj.url = replaceUrl(t.url);
        artist.image = artist.image_small;
        console.log(trackObj);
        playlist.push(parseTrackData(artist, trackObj));
      }
    });

    artist.top_tracks.forEach((t, i) => {
      if (i < index) {
        const trackObj = { ...t };
        if (!t.url.startsWith("https://radiophoenix.nu/")) {
          trackObj.url = replaceUrl(t.url);
        }
        trackObj.image = artist.image;
        playlist.push(parseTrackData(artist, trackObj));
      }
    });

    dispatch(setAlbum(artist));
    dispatch(setPlayList(playlist));
  };

  useEffect(() => {
    fetch(
      "https://radiophoenix.nu/secure/artists/" +
        artistId +
        "?defaultRelations=true",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        const albums = [...response.albums.data];
        const artist = { ...response.artist };

        if (!artist.image_small.startsWith("https://radiophoenix.nu/")) {
          artist.image_small = "https://radiophoenix.nu/" + artist.image_small;
        }
        setArtist(artist);

        albums.map((album) => {
          if (!album.image.startsWith("https://radiophoenix.nu/")) {
            album.image = "https://radiophoenix.nu/" + album.image;
          }
          album.tracks.map((track, i) => {
            const trackObj = { ...track };
            if (!trackObj.url.startsWith("https://radiophoenix.nu/")) {
              trackObj.url = "https://radiophoenix.nu/" + trackObj.url;
            }
            album.tracks[i] = trackObj;
          });
        });

        setAlbums(albums);
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
          start={[0, 0.4]}
          end={[0.0, 0.5]}
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
            }}
          >
            <LinearGradient
              colors={[backgroundColor, "#1E1E26"]}
              start={[0, 0]}
              end={[0.0, 1]}
              style={{ flex: 1, width: "100%" }}
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
                  source={{ uri: artist.image_small }}
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
                  width: "100%",
                  backgroundColor: "#1E1E26",
                }}
              >
                <View style={{ paddingHorizontal: 5, paddingBottom: 10 }}>
                  <Text
                    style={{ fontSize: 36, fontWeight: "bold", color: "white" }}
                  >
                    {artist.name}
                  </Text>
                  {loading
                    ? null
                    : albums.map((album) => {
                        return (
                          <View key={album.id}>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                width: "100%",
                                flex: 1,
                                paddingVertical: 10,
                              }}
                            >
                              <Image
                                source={{ uri: album.image }}
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 10,
                                }}
                              />
                              <Text
                                style={{
                                  fontSize: 24,
                                  fontWeight: "bold",
                                  color: "white",
                                  paddingLeft: 15,
                                }}
                              >
                                {album.name}
                              </Text>
                            </View>

                            {album.tracks.map((track) => (
                              <TouchableOpacity
                                style={{
                                  width: "100%",
                                  marginVertical: 5,
                                  paddingHorizontal: 5,
                                }}
                                key={track.id}
                                onPress={() => handleSongPress(album, track)}
                              >
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: "white",
                                    fontWeight: "500",
                                  }}
                                >
                                  {track.name}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: "white",
                                    fontWeight: "500",
                                  }}
                                >
                                  {track.artists.length > 0
                                    ? track.artists[0].name
                                    : "Various Artists"}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        );
                      })}
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        flex: 1,
                        paddingVertical: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: "bold",
                          color: "white",
                          paddingLeft: 5,
                        }}
                      >
                        Alle Tracks
                      </Text>
                    </View>

                    {artist.top_tracks.map((track) => (
                      <TouchableOpacity
                        style={{
                          width: "100%",
                          marginVertical: 5,
                          paddingHorizontal: 5,
                        }}
                        onPress={() => handleOtherSongsPress(track)}
                        key={track.id}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: "white",
                            fontWeight: "500",
                          }}
                        >
                          {track.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: "white",
                            fontWeight: "500",
                          }}
                        >
                          {track.artists.length > 0
                            ? track.artists[0].name
                            : "Various Artists"}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </>
                </View>
              </View>
            </View>

            <View style={{ width: "100%", minHeight: 50, maxHeight: 50 }} />
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  } else {
    return <AlbumLoading />;
  }
};

export default ArtistScreen;

const styles = StyleSheet.create({
  albumContainer: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "35%",
  },
});
