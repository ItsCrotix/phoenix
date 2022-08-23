import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon, LinearProgress, Image } from "@rneui/base";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import {
  selectIsPlaying,
  selectTrack,
} from "../../utils/redux/reducers/musicReducer";
import { useProgress } from "react-native-track-player";
import { useNavigation } from "@react-navigation/native";

const PlayBar = ({ onPressPlay }) => {
  const track = useAppSelector(selectTrack);
  const playing = useAppSelector(selectIsPlaying);
  const progress = useProgress();
  const navigation = useNavigation();
  if (!track) {
    return null;
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate("song")}>
      <View style={styles.container}>
        <View style={styles.buttonView}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{ height: 40, width: 40, borderRadius: 10 }}
              source={{ uri: track.artwork }}
            />
            <View
              style={{
                flexDirection: "column",
                marginLeft: 10,
                width: "80%",
                overflow: "hidden",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
                numberOfLines={1}
              >
                {track.title}
              </Text>
              <Text
                style={{ color: "white", fontSize: 12 }}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {track.artist}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={onPressPlay}>
            <Icon
              name={playing ? "pause" : "play-arrow"}
              size={32}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LinearProgress
            style={{ width: "95%" }}
            value={progress.position / progress.duration}
            variant="determinate"
            animation={false}
            color="#804a8d"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlayBar;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 60,
    backgroundColor: "#23232C",
    borderRadius: 10,
    paddingTop: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
});
