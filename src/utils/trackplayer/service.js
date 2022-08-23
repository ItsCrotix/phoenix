import TrackPlayer from "react-native-track-player";

module.exports = async function () {
  TrackPlayer.addEventListener("remote-play", () => TrackPlayer.play());

  TrackPlayer.addEventListener("remote-pause", () => TrackPlayer.pause());

  TrackPlayer.addEventListener("remote-next", () =>
    TrackPlayer.getQueue().then((queue) => {
      if (queue.length > 0) {
        TrackPlayer.skipToNext();
      } else {
        TrackPlayer.skip(0);
      }
    })
  );

  TrackPlayer.addEventListener("remote-previous", () =>
    TrackPlayer.skipToPrevious()
  );

  TrackPlayer.addEventListener("remote-stop", () => TrackPlayer.stop());
};
