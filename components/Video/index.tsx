import React, { useRef, FC } from "react";
import { View } from "react-native";
import { Video as VideoPlayer } from "expo-av";

const Video: FC<{ uri: string }> = ({ uri }) => {
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
