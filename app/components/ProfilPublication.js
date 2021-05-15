import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import AppText from "./AppText"
import { AntDesign } from "@expo/vector-icons"

export default function ProfilPublication({
  text,
  onPress,
  icon = "right",
  textStyle,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AppText style={[styles.text, textStyle]}>{text}</AppText>
      <AntDesign
        name={icon}
        size={24}
        color="grey"
        style={{ marginLeft: "auto" }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 15,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    paddingBottom: 5,
  },
  text: {
    color: "grey",
  },
})
