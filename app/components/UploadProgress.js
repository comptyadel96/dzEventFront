import React from "react"
import { Modal, StyleSheet, Text, View } from "react-native"
import * as Progress from "react-native-progress"
import Colors from "../assets/Colors"


export default function UploadProgress({
  progress = 0,
  visible = false,
  color = Colors.secondary,
}) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Text style={styles.status}>Publication en cours ...</Text>
        <Progress.Bar
          progress={progress}
          width={200}
          height={30}
          borderRadius={50}
          color={color}
        />
        <Text> {Math.round(progress * 100)}% </Text>
        <Text style={{ color: "grey", margin: 15,fontSize:17 }}>
          Vous serez rediriger vers la page de publication automatiquement une
          fois que votre publication sera compléter 😄 
        </Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  status: {
    color: Colors.primary,
    fontSize:19
  },
})
