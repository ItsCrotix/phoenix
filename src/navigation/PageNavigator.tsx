import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import { Audio } from "expo-av";
import PlayBar from "../components/PlayBar/PlayBar";
import { useAppDispatch } from "../utils/hooks/useAppDispatch";
import {
  selectAlbum,
  selectCurrentTrackIndex,
  selectDuration,
  selectIsPlaying,
  selectPlayList,
  selectTimeElapsed,
  selectTrack,
  setCurrentTrackIndex,
  setDuration,
  setIsPlaying,
  setTimeElapsed,
  setTrack,
  setTrackAlbum,
} from "../utils/redux/reducers/musicReducer";
import { useAppSelector } from "../utils/hooks/useAppSelector";
import TabBar from "../components/TabBar/TabBar";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "@rneui/base";

const PageNavigator = () => {
  const Tab = createBottomTabNavigator();
  const dispatch = useAppDispatch();
  const playing = useAppSelector(selectIsPlaying);
  const currentTrackIndex = useAppSelector(selectCurrentTrackIndex);
  const playlist = useAppSelector(selectPlayList);
  const duration = useAppSelector(selectDuration);
  const timeElapsed = useAppSelector(selectTimeElapsed);
  const isPlaying = useAppSelector(selectIsPlaying);
  const [sound, setSound] = useState();
  const track = useAppSelector(selectTrack);
  const album = useAppSelector(selectAlbum);

  async function playTrack(track) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: playlist[track].url,
    });
    setSound(sound);
    console.log("Playing Sound");
    dispatch(setIsPlaying(true));
    dispatch(setTrackAlbum(album));
    await sound.playAsync();
  }

  const playPause = () => {
    if (playing) {
      sound.pauseAsync();
      dispatch(setIsPlaying(false));
    } else {
      if (currentTrackIndex === undefined) {
        playTrack(0);
        dispatch(setCurrentTrackIndex(0));
        dispatch(setTrack(playlist[0]));
      } else {
        sound.playAsync();
        dispatch(setIsPlaying(true));
      }
    }
  };

  const handlePrevious = () => {
    if (currentTrackIndex > 0) {
      if (duration < 2000) {
        playTrack(currentTrackIndex);
      } else {
        playTrack(currentTrackIndex - 1);
        dispatch(setCurrentTrackIndex(currentTrackIndex - 1));
      }
    } else {
      playTrack(currentTrackIndex);
    }
  };

  const handleNext = () => {
    if (currentTrackIndex < playlist.length - 1) {
      dispatch(setCurrentTrackIndex(currentTrackIndex + 1));
      dispatch(setTrack(playlist[currentTrackIndex]));
    }
  };

  useEffect(() => {
    try {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    console.log("playing track");
    console.log(track);
    if (track) {
      dispatch(setTimeElapsed(0));
      playTrack(currentTrackIndex);
    }
  }, [track]);

  useEffect(() => {
    console.log(track);
  }, [track]);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(({ positionMillis, durationMillis }) => {
        dispatch(setTimeElapsed(positionMillis));
        dispatch(setDuration(durationMillis));
      });
    }
  }, [sound]);

  useEffect(() => {
    if (timeElapsed > 0 && duration > 0) {
      if (duration - timeElapsed < 1000) {
        handleNext();
      }
    }
  }, [timeElapsed]);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#23232C",
            shadowColor: "transparent",
            borderTopColor: "#23232C",
            borderTopWidth: 0,
            padding: 0,
            margin: 0,
          },
          tabBarActiveTintColor: "#FFF",
          tabBarLabelStyle: {
            fontSize: 14,
            color: "#FFF",
          },
          tabBarBackground: () => (
            <LinearGradient
              colors={["#1E1E26", "#23232C"]}
              style={{
                flex: 1,
              }}
            />
          ),
        }}
      >
        <Tab.Screen
          name="Search"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon color={color} name="search" size={24} />
            ),
          }}
        />
      </Tab.Navigator>
      <View
        style={{
          position: "absolute",
          bottom: 75,
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 10,
          backgroundColor: "'rgba(52, 52, 52, 0.0)'",
        }}
      >
        <PlayBar onPressPlay={playPause} />
      </View>
    </View>
  );
};

export default PageNavigator;
