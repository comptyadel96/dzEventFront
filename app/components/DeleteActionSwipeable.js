import React from "react"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Feather } from "@expo/vector-icons"
import AppText from "./AppText"


export default function DeleteActionSwipeable({onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.swipeable}>
        <AppText style={{color:'white'}}>Supprimer</AppText>
        <Feather name='trash' size={34} color='white' />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  swipeable: {
    backgroundColor: "crimson",
    borderTopLeftRadius:50,
    borderBottomLeftRadius:50,
    width: "55%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical:8
  },
})
