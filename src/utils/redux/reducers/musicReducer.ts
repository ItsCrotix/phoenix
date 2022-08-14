import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const MusicSlice = createSlice({
  name: "music",
  initialState: {
    album: {},
    trackAlbum: {},
    isPlaying: false,
    currentTrack: {},
    currentTrackIndex: 0,
    track: undefined,
    duration: 0,
    timeElapsed: 0,
    playList: [],
  },
  reducers: {
    setAlbum: (state, action) => {
      state.album = action.payload;
    },
    setTrackAlbum: (state, action) => {
      state.trackAlbum = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setCurrentTrackIndex: (state, action) => {
      state.currentTrackIndex = action.payload;
    },
    setTrack: (state, action) => {
      state.track = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setTimeElapsed: (state, action) => {
      state.timeElapsed = action.payload;
    },
    setPlayList: (state, action) => {
      state.playList = action.payload;
    },
    addToPlayList: (state, action) => {
      state.playList.push(action.payload);
    },
    removeFromPlayList: (state, action) => {
      state.playList.splice(action.payload, 1);
    },
  },
});

export const {
  setAlbum,
  setTrackAlbum,
  setIsPlaying,
  setCurrentTrack,
  setCurrentTrackIndex,
  setTrack,
  setDuration,
  setTimeElapsed,
  setPlayList,
  addToPlayList,
  removeFromPlayList,
} = MusicSlice.actions;

export const selectAlbum = (state: RootState) => state.music.album;
export const selectTrackAlbum = (state: RootState) => state.music.trackAlbum;
export const selectIsPlaying = (state: RootState) => state.music.isPlaying;
export const selectCurrentTrack = (state: RootState) =>
  state.music.currentTrack;
export const selectCurrentTrackIndex = (state: RootState) =>
  state.music.currentTrackIndex;
export const selectTrack = (state: RootState) => state.music.track;
export const selectDuration = (state: RootState) => state.music.duration;
export const selectTimeElapsed = (state: RootState) => state.music.timeElapsed;
export const selectPlayList = (state: RootState) => state.music.playList;

export default MusicSlice.reducer;
