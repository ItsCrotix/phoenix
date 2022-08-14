import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Homescreen/HomeScreen";
import { color, Text } from "@rneui/base";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import AlbumScreen from "../screens/AlbumScreen/AlbumScreen";
import { View } from "react-native";
import PlayBar from "../components/PlayBar/PlayBar";
import NewReleasesScreen from "../screens/NewReleasesScreen/NewReleasesScreen";
import ArtistsScreen from "../screens/ArtistsScreen/ArtistsScreen";

const HomeNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitle: () => <Text style={{ display: "none" }}>test</Text>,
          headerStyle: {
            backgroundColor: "#1E1E26",
          },
        }}
      >
        <Stack.Screen name="overview" component={HomeScreen} />
        <Stack.Screen
          name="SearchModal"
          component={SearchScreen}
          options={{ animation: "fade", animationDuration: 100 }}
        />
        <Stack.Screen name="album" component={AlbumScreen} />
        <Stack.Screen name="newReleases" component={NewReleasesScreen} />
        <Stack.Screen name="artists" component={ArtistsScreen} />
      </Stack.Navigator>
    </>
  );
};

export default HomeNavigator;
