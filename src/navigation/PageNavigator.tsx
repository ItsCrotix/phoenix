import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";

import PlayBar from "../components/PlayBar/PlayBar";
import { useAppDispatch } from "../utils/hooks/useAppDispatch";
import {
  selectCurrentTrackIndex,
  selectPlayList,
  setIsPlaying,
  setTrack,
} from "../utils/redux/reducers/musicReducer";
import { useAppSelector } from "../utils/hooks/useAppSelector";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "@rneui/base";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import { useCurrentTrack } from "../utils/hooks/useCurrentTrack";

const PageNavigator = () => {
  const Tab = createBottomTabNavigator();
  const dispatch = useAppDispatch();
  const playlist = useAppSelector(selectPlayList);
  const track = useCurrentTrack();
  const playerState = usePlaybackState();

  const loadNewPlaylist = async (playlist) => {
    const queue = await TrackPlayer.getQueue();
    if (queue.length > 0) {
      await TrackPlayer.removeUpcomingTracks();
      await TrackPlayer.add(playlist);
      await TrackPlayer.skipToNext();
    } else {
      await TrackPlayer.add(playlist);
    }
  };

  const handlePlayPause = async () => {
    const playing = await TrackPlayer.getState();
    if (playing === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  useEffect(() => {
    if (track) {
      dispatch(setTrack(track));
    }
  }, [track]);

  useEffect(() => {
    if (playerState === State.Playing) {
      console.log(playerState);
      dispatch(setIsPlaying(true));
    } else if (playerState === State.Paused) {
      console.log(playerState);
      dispatch(setIsPlaying(false));
    }
  }, [playerState]);

  useEffect(() => {
    loadNewPlaylist(playlist)
      .then(() => {
        TrackPlayer.play();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [playlist]);

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
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon color={color} name="home" size={24} />
            ),
          }}
        />
      </Tab.Navigator>
      <View
        style={{
          position: "absolute",
          bottom: 50,
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 10,
          backgroundColor: "'rgba(52, 52, 52, 0.0)'",
        }}
      >
        <PlayBar onPressPlay={handlePlayPause} />
      </View>
    </View>
  );
};

export default PageNavigator;
