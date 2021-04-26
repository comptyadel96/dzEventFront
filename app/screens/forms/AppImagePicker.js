import React, { useEffect } from "react"
import { Image, StyleSheet, View } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useFormikContext } from "formik"
import AppLogo from "../../components/AppLogo"
import Colors from "../../assets/Colors"

export default function AppImagePicker({ name }) {
  const { values, setFieldValue } = useFormikContext()

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync()
    if (!granted)
      return alert(
        "vous devez autoriser l'application à accéder votre gallerie pour séléctionner une image "
      )
  }
  const handlePickImage = async () => {
    try {
      const img = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.7,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      })
      if (!img.cancelled) {
        Platform.OS === "android"
          ? setFieldValue(name, img.uri)
          : setFieldValue(name, img.uri.replace("file://", ""))
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    requestPermission()
  }, [])

  return (
    <View>
      {values[name] && (
        <Image source={{ uri: values[name] }} style={styles.image} />
      )}

      {!values[name] && (
        <AppLogo
          logo="camera"
          onPress={handlePickImage}
          size={100}
          backColor={Colors.textInput}
          style={{ alignSelf: "center" }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    borderRadius: 20,
    alignSelf: "center",
  },
})
