import React, { useEffect } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useFormikContext } from "formik"
import FormMessageError from "./FormMessageError"

export default function EventImages({ name, isUpdateStore = false }) {
  const { setFieldValue, values, errors, touched, handleSubmit } =
    useFormikContext([])

  const getPermission = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync()
    if (!result.granted) {
      alert(
        "nous avons besoin d'accéder a votre gallerie pour télécharger les images,vous pourriez toujours modifier vos préférences dans les paramétres du téléphone pour autoriser l'application à accéder la gallerie "
      )
    }
  }

  // supprimer l'image
  const handleDeleteImage = (imageUri) => {
    Alert.alert("Supprimer", "étes vous sure de vouloir supprimer l'image ? ", [
      {
        text: "oui",
        onPress: () =>
          setFieldValue(
            name,
            values[name].filter((img) => img !== imageUri)
          ),
      },
      { text: "non" },
    ])
  }

  // pick the image
  const handlePickImage = async () => {
    try {
      const img = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.7,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      })
      if (!img.cancelled) {
        Platform.OS === "android"
          ? setFieldValue(name, [...values[name], img.uri])
          : setFieldValue(name, [
              ...values[name],
              img.uri.replace("file://", ""),
            ])
        // si on est dans le store details et l'utilisateur voudra ajouter une photo pour son article sans avoir à appuyer sur le submit bouton
        isUpdateStore && handleSubmit()
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getPermission()
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {values[name] &&
          values[name].map((imguri) => (
            <TouchableWithoutFeedback
              key={imguri}
              onPress={() => handleDeleteImage(imguri)}>
              <Image source={{ uri: imguri }} style={styles.image} />
            </TouchableWithoutFeedback>
          ))}
        {values[name].length <= 4 && (
          <MaterialCommunityIcons
            name="camera-plus"
            size={110}
            color="black"
            onPress={handlePickImage}
            style={{ marginTop: 10, zIndex: 1, backgroundColor: "transparent" }}
          />
        )}
      </ScrollView>
      <FormMessageError
        errors={errors[name]}
        visible={touched[name]}
        style={{ position: "absolute", top: 0 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 15,
    width: "auto",
    justifyContent: "center",
    paddingVertical: 5,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 10,
    marginLeft: 10,
  },
})
