import React from "react"
import { Image, StyleSheet, View, TouchableWithoutFeedback } from "react-native"
import AppScreen from "../AppScreen"
import AppText from "../AppText"

export default function StoreCard({ image, article, onPress, style }) {
  return (
    <AppScreen>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.container, style]}>
          {image ? (
            <Image
              source={{ uri: `${image.url}`.toString() }}
              style={styles.image}
            />
          ) : (
            <Image
              source={require("../../assets/storeDefaultImage.jpg")}
              style={styles.image}
            />
          )}

          <AppText style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {article}
          </AppText>
        </View>
      </TouchableWithoutFeedback>
    </AppScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    width: "80%",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 20,
    backgroundColor: "black",
  },

  title: {
    color: "#C24C5D",
    fontSize: 15,
    textTransform: "capitalize",
    textAlign: "center",
  },
})
