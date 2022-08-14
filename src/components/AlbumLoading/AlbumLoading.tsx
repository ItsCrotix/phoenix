import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Image, Skeleton } from "@rneui/base";
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

const AlbumLoading = () => {
  const placeholder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
          <Skeleton width={250} height={250} style={{ borderRadius: 10 }} />
        </View>
        <View
          style={{ width: "100%", paddingHorizontal: 10, paddingBottom: 20 }}
        >
          <Skeleton width={100} height={20} />
          <Skeleton width={100} height={15} />
        </View>

        {placeholder.map((item) => {
          return (
            <View
              key={item}
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
                <Skeleton width={100} height={20} />
                <Skeleton width={100} height={15} />
              </View>
            </View>
          );
        })}
        <View style={{ width: "100%", minHeight: 50, maxHeight: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlbumLoading;

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
