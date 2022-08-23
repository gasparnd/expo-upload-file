import React, { useRef } from "react";
import { View } from "react-native";
import { Video as VideoPlayer } from "expo-av";

const Video = ({ uri }: { uri: string }) => {
  const videoRef = useRef(null);
  return (
    <View>
      <VideoPlayer
        resizeMode="contain"
        style={{ width: 300, height: 400 }}
        ref={videoRef}
        source={{ uri: uri }}
        useNativeControls
      />
    </View>
  );
};

export default Video;
