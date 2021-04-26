import React from "react"
import { StyleSheet, TextInput, View } from "react-native"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { SimpleLineIcons } from "@expo/vector-icons"
import Colors from '../assets/Colors'
export default function AppTextInput({ icon, icon2,style,iconColor=Colors.grey,  ...otherProps}) {
  return (
    <View style={[styles.container,style]}>
      {(icon && (
        <MaterialCommunityIcons
          name={icon}
          size={37}
          style={{ marginRight: 10 }}
          color={iconColor}
        />
      )) || <SimpleLineIcons name={icon2} size={27} color={iconColor} />}
    
        <TextInput style={{flex:1}}{...otherProps} />
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "70%",
    height: 45,
    backgroundColor: Colors.textInput,
    margin: 13,
    padding: 10,
    borderRadius: 20,
  },

})
