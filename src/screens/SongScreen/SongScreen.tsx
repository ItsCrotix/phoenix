import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon, Image } from "@rneui/base";
import { useCurrentTrack } from "../../utils/hooks/useCurrentTrack";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { selectTrack } from "../../utils/redux/reducers/musicReducer";
import Scrubber from "react-native-scrubber";

import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const SongScreen = () => {
  const track = useAppSelector(selectTrack);
  const playerState = usePlaybackState();
  const { position, buffered, duration } = useProgress();
  const [loading, isLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#f44336");
  const navigation = useNavigation();
  useEffect(() => {
    selectRandomColor();
    isLoading(false);
  }, []);

  const handlePlayPause = async () => {
    const playing = await TrackPlayer.getState();
    if (playing === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

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

  if (loading) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[backgroundColor, "#1E1E26"]}
        start={[0, 0]}
        end={[0.0, 0.7]}
        style={{ flex: 1 }}
      >
        <View
          style={{
            position: "relative",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 10,
              left: 10,
            }}
          >
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Icon name="expand-more" color={"#fff"} size={36} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Image
              source={{ uri: track.artwork }}
              style={{ width: 300, height: 300, borderRadius: 10 }}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: `white`,
                  fontWeight: "bold",
                  fontSize: 28,
                  textAlign: "center",
                }}
              >
                {track.title}
              </Text>
              <Text style={{ color: `white`, fontWeight: "600", fontSize: 18 }}>
                {track.artist}
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  width: "80%",
                  marginTop: 20,
                }}
              >
                <Scrubber
                  totalDuration={duration}
                  bufferedValue={buffered}
                  value={position}
                  onSlidingComplete={(value) => TrackPlayer.seekTo(value)}
                  trackColor="#804a8d"
                  scrubbedColor="#ffffff"
                  bufferedTrackColor="#804a8d"
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 100,
            }}
          >
            <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
              <Icon name="skip-previous" size={60} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePlayPause()}>
              {playerState !== State.Playing ? (
                <Icon name="play-circle-filled" size={75} color="white" />
              ) : (
                <Icon name="pause-circle-filled" size={75} color="white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                TrackPlayer.getQueue().then((queue) => {
                  if (queue.length > 0) {
                    TrackPlayer.skipToNext();
                  } else {
                    TrackPlayer.skip(0);
                  }
                })
              }
            >
              <Icon name="skip-next" size={60} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SongScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23232C",
  },
});
