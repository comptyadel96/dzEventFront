import React from "react"
import { StyleSheet, TouchableHighlight, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
export default function AppLogo({
  logo,
  logoColor,
  size = 40,
  backColor = "white",
  onPress,
  style
}) {
  return (
    <TouchableHighlight onPress={onPress} underlayColor='white'>
    <View 
      style={[{
        backgroundColor: backColor,
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",},style]
        
      }>
      <MaterialCommunityIcons
        name={logo}
        color={logoColor}
        style={styles.logo}
        size={size / 2}
        />
    </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({})
