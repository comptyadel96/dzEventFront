import React from "react"
import { StyleSheet, View, Image, TouchableHighlight } from "react-native"
import AppText from "./AppText"
import Swipeable from "react-native-gesture-handler/Swipeable"


export default function MessageComponent({
  nom,
  message,
  image,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor='#F9F7F4' onPress={onPress}>
        <View style={styles.container}>
          <Image source={image} style={styles.image} />
          <View style={styles.textContainer}>
            <AppText style={styles.nom}>{nom} </AppText>
            <AppText style={styles.message}>{message}</AppText>
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems:'center',
    marginVertical: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  textContainer: {
    marginLeft: 15,
    width: 180,
  },
  nom: {
    color: "black",
    fontWeight: "bold",
  },
  message: {
    color: "grey",
    minWidth: "100%",
  },
})
