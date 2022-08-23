import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { FileSystemUploadType, StorageAccessFramework } from "expo-file-system";
import Video from "./components/Video";

export default function App() {
  const [video, setVideo] = useState<string>("");

  const getPermissions = async () => {
    try {
      const library = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!library.granted) {
        Alert.alert("Ups!", "We need permision for this action");
        return;
      }

      searchVideo();
    } catch (err) {}
  };

  const searchVideo = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    if (!res.cancelled) {
      const info = await FileSystem.getInfoAsync(res.uri);
      const uri = res.uri.split(":///").join("//");
      console.log("🚀 ~ file: App.tsx ~ line 31 ~ searchVideo ~ info", info);

      setVideo(uri);
    }
  };

  const handelUploade = async (uri: string) => {
    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      };

      const res = await FileSystem.uploadAsync(
        "https://aa09-190-211-90-90.ngrok.io/uploadVideo",
        uri,
        {
          httpMethod: "POST",
          uploadType: FileSystemUploadType.MULTIPART,
          fieldName: "file",
          headers: headers,
        }
      );

      if (res) {
        return res;
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: App.tsx ~ line 49 ~ handelUploade ~ error",
        error
      );
      Alert.alert("Somthing is wrong");
    }
  };

  return (
    <View style={styles.container}>
      {video && <Video uri={video} />}

      <Pressable
        onPress={() => (!video ? getPermissions() : handelUploade(video))}
        style={[styles.primaryButton, { marginVertical: "3%" }]}
      >
        <Text style={styles.buttonText}>
          {!video ? "Select video" : "Upload video"}
        </Text>
      </Pressable>
      {video && (
        <Pressable onPress={searchVideo} style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Select other video</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "5%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
  },
  primaryButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#00ED64",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  secondaryButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderWidth: 2,
    borderColor: "#00ED64",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
});
