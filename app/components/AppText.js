import React from "react"
import { Text, StyleSheet, Platform } from "react-native"

export default function AppText({ children,style,...otherProps }) {
  return <Text style={[styles.text,style]} {...otherProps} >{children}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontSize:18
  },
})
