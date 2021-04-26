import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import AppLogo from "./AppLogo"

export default function AppButton({
  title,
  title2,
  onPress,
  color = "tomato",
  style,
  logo,
  size,
  logoColor,
  backColor,
  text,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, style]}
      onPress={onPress}>
      {logo && (
        <AppLogo
          logo={logo}
          size={size}
          logoColor={logoColor}
          backColor={backColor}
          style={{ alignSelf: "flex-start" }}
        />
      )}
      <Text style={[styles.text, text]}>{title || title2}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: "tomato",
    borderRadius: 25,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginVertical: 12,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
})
