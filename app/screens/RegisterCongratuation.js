import AppLoading from "expo-app-loading"
import React from "react"
import { StyleSheet, View } from "react-native"
import Colors from "../assets/Colors"
import AppButton from "../components/AppButton"
import AppText from "../components/AppText"
import LoadingAnim from "../components/LoadingAnim"

export default function RegisterCongratuation({ navigation }) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Merci à vous 💝 </AppText>
      {/* ANIMATION */}
      <View style={{ height: 400, width: 400 }}>
        <LoadingAnim
          visible={true}
          source={require("../assets/animations/congrat.json")}
        />
      </View>
      <AppText style={styles.text}>
        Nous sommes heureux de vous compter parmis nous 😃 vous pouvez à
        présent:{" "}
      </AppText>
      <AppButton
        title="Modifer votre profile"
        onPress={() => navigation.replace("Account")}
        style={styles.buttons}
        color="dodgerblue"
      />
      <AppButton
        title="premiére publication"
        onPress={() => navigation.replace("Publier")}
        style={styles.buttons}
        color={Colors.pink}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 38,
    color: Colors.pink,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    marginHorizontal: 10,
    lineHeight: 30,
    fontWeight: "bold",
    fontSize: 20,
    color: "grey",
  },
  buttons: {
    width: 200,
    height: 37,
    marginTop: 20,
  },
})
