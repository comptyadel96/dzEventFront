import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import AppLogo from "./AppLogo"
import AppText from "./AppText"

export default function CategorieItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AppLogo
        logo={item.logo}
        backColor={item.backColor}
        size={80}
        logoColor='white'
        onPress={onPress}
      />
      <AppText style={styles.text}>{item.label}</AppText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "33%",
    alignItems: "center",
    flex: 1,
    // backgroundColor:'beige'
  },
  text: {
    paddingHorizontal: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "gray",
  },
})
