import React, { useContext } from "react"
import { Image, StyleSheet, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import BaseUrl from "../assets/BaseUrl"
import axios from "axios"
import AuthContext from "./authentification/AuthContext"

export default function ViewEventImage({ route }) {
  const navigation = useNavigation()
  const { user } = useContext(AuthContext)
  const { imgUrl, img_id, article_id, owner } = route.params

  const handleDelete = async (imgUrl, img_id) => {
    try {
      await axios.delete(
        `${BaseUrl}/dzevents/v1/store/storepictures/${article_id}/${img_id}`
      )
      imgUrl = undefined
      img_id = undefined
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      {user && user._id === owner && (
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={34}
          color="white"
          style={styles.delete}
          onPress={() => {
            handleDelete(imgUrl, img_id), navigation.goBack()
          }}
        />
      )}

      <MaterialCommunityIcons
        name="close"
        size={34}
        color="white"
        onPress={() => {
          navigation.goBack()
        }}
        style={styles.close}
      />

      <Image
        resizeMode="contain"
        source={{ uri: `${imgUrl}`.toString() }}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  close: {
    position: "absolute",
    top: 40,
    left: 25,
    zIndex: 1,
  },
  delete: {
    position: "absolute",
    top: 40,
    right: 25,
    zIndex: 1,
  },
  image: { width: "100%", height: "100%" },
})
