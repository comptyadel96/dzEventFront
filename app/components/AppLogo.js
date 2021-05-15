import React from "react"
import { TouchableHighlight, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
export default function AppLogo({
  logo,
  logoColor,
  size = 40,
  backColor = "white",
  onPress,
  style,
  showBackground = true,
}) {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="white">
      {showBackground ? (
        <View
          style={[
            {
              backgroundColor: backColor,
              width: size,
              height: size,
              borderRadius: size / 2,
              justifyContent: "center",
              alignItems: "center",
            },
            style,
          ]}>
          <MaterialCommunityIcons
            name={logo}
            color={logoColor}
            size={size / 2}
          />
        </View>
      ) : (
        <MaterialCommunityIcons name={logo} color={logoColor} size={size / 2} />
      )}
    </TouchableHighlight>
  )
}
