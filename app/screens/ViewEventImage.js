import React, { useContext } from "react"
import { Image, StyleSheet, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import BaseUrl from "../assets/BaseUrl"
import axios from "axios"
import AuthContext from "./authentification/AuthContext"

export default function ViewEventImage({ route }) {
  const navigation = useNavigation()

  const { eventImage } = route.params

  return (
    <View style={styles.container}>
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
        source={{ uri: `${eventImage}`.toString() }}
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
  image: { width: "100%", height: "100%" },
})
