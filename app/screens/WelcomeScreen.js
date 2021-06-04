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
      <AppText style={styles.grandTitre}>MOUNI</AppText>
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
              logoColor={Colors.primary}
              backColor="transparent"
              size={50}
              onPress={() => {
                navigation.navigate("AllEvents")
              }}
            />

            <AppButton
              style={styles.menuItem}
              text={styles.textButton}
              title="Calendrier"
              logo="calendar-text"
              logoColor="black"
              backColor="transparent"
              size={50}
              onPress={() => navigation.navigate("Calendar")}
            />

            <AppButton
              title="Store"
              style={styles.menuItem}
              text={styles.textButton}
              logo="shopping"
              logoColor={Colors.secondary}
              backColor="transparent"
              size={58}
              onPress={() => {
                navigation.navigate("AllArticles")
              }}
            />

            <AppButton
              title="1iére fois"
              style={styles.menuItem}
              text={styles.textButton}
              logoColor={Colors.gold}
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
        <AppText style={{ textAlign: "center",marginTop:15 }}>
          bienvenue sur votre application préférée des évènements . 
          commencer par voir les évènements disponibles ou bien publier le votre .
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
    color: Colors.white,
    fontSize: 22,
    fontWeight: "600",
    alignSelf: "center",
    backgroundColor: Colors.primary,
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
    backgroundColor: "#ECECEC",
    margin: 9,
    padding: 3,
    paddingRight: 0,
    borderRadius: 20,
  },

  textButton: {
    color: "black",
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
