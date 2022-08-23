import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, StyleSheet, Platform } from "react-native";
import TrackPlayer, { Capability, State } from "react-native-track-player";
import HomeNavigator from "./navigation/HomeNavigator";
import PageNavigator from "./navigation/PageNavigator";
import { SetupService } from "./utils/trackplayer/setupSevice";

const Main = () => {
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    async function run() {
      const isSetup = await SetupService();
      setIsPlayerReady(isSetup);
    }
    run();
  }, []);

  if (!isPlayerReady) {
    return <View style={styles.container} />;
  }

  return <PageNavigator />;
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23232C",
    alignItems: "center",
    justifyContent: "center",
  },
});
