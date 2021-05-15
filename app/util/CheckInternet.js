import  { useNetInfo } from "@react-native-community/netinfo"
import React from "react"
import Constants from "expo-constants"
import { StyleSheet, Text, View } from "react-native"

export default function CheckInternet() {
  const networkInfos = useNetInfo()

  return (
    <>
      {networkInfos.isInternetReachable === false &&
        networkInfos.type !== "unknown" && (
          <View style={styles.container}>
            <Text style={styles.text}> Pas de connexion internet </Text>
          </View>
        )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    position: "absolute",
    top: Constants.statusBarHeight,
    backgroundColor: "crimson",
    zIndex: 1,
  },
  text: {
    color: "white",
  },
})
