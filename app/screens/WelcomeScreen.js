import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import AppButton from "../components/AppButton"
import Colors from "../assets/Colors"
import AppScreen from "../components/AppScreen"
import AppText from "../components/AppText"
import EventPublicationsScreen from "./Mypublication/EventPublicationsScreen"
import LoadingAnim from "../components/LoadingAnim"

export default function WelcomeScreen({ navigation }) {
  return (
    <AppScreen style={{ backgroundColor: "#F6F8F9", flex: 1 }}>
      <AppText style={styles.grandTitre}>MOUNI 🇩🇿 </AppText>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ maxHeight: 50, margin: 15, marginLeft: 0, marginBottom: 5 }}>
          <View style={styles.menuContainer}>
            <AppButton
              style={styles.menuItem}
              title="Evénements"
              text={styles.textButton}
              logo="airballoon"
              logoColor={Colors.white}
              backColor="transparent"
              color={Colors.primary}
              size={50}
              onPress={() => {
                navigation.navigate("AllEvents")
              }}
            />
            <AppButton
              title="Store"
              style={styles.menuItem}
              text={styles.textButton}
              logo="shopping"
              logoColor={Colors.white}
              backColor="transparent"
              color={Colors.secondary}
              size={58}
              onPress={() => {
                navigation.navigate("AllArticles")
              }}
            />
            <AppButton
              style={styles.menuItem}
              text={styles.textButton}
              title="Calendrier"
              logo="calendar-text"
              logoColor="white"
              color="#444444"
              backColor="transparent"
              size={50}
              onPress={() => navigation.navigate("Calendar")}
            />

            <AppButton
              title="first-time"
              style={styles.menuItem}
              text={styles.textButton}
              logoColor={Colors.white}
              color={Colors.gold}
              backColor="transparent"
              logo="numeric-1-box"
              size={50}
              onPress={() => {
                navigation.navigate("FirstPublications")
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.animationContainer}>
          <LoadingAnim
            source={require("../assets/animations/welcomeAnim.json")}
            visible
          />
        </View>
        <AppText
          style={{ textAlign: "center", marginTop: 15, color: "#3b1c1c" }}>
          bienvenue sur votre application préférée d'évènements . commencer par
          voir les évènements disponibles ou bien publier le votre .
        </AppText>
      </View>
    </AppScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  grandTitre: {
    position: "absolute",
    color: Colors.primary,
    fontSize: 27,
    fontWeight: "bold",
    alignSelf: "center",
    padding: 5,
    borderRadius: 10,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  menuItem: {
    flexDirection: "row",
    height: 40,
    width: 130,
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "#ECECEC",
    margin: 9,
    padding: 3,
    paddingRight: 0,
    borderRadius: 20,
  },

  textButton: {
    color: "white",
    fontSize: 13,
    flex: 1,
  },
  events: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0,
    width: "100%",
  },
  animationContainer: {
    height: 400,
    width: 400,
  },
})
