import React, { useState, useEffect } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

import AppButton from "../components/AppButton"
import Colors from "../assets/Colors"
import AppScreen from "../components/AppScreen"
import AppText from "../components/AppText"
import EventPublicationsScreen from "./Mypublication/EventPublicationsScreen"

export default function WelcomeScreen({ navigation }) {
  return (
    <AppScreen style={{ backgroundColor: "#F6F8F9", flex: 1 }}>
      <AppText style={styles.grandTitre}>DZ EVENTS</AppText>
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

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            margin: 15,
            
          }}>
          <View style={styles.pubs}>
            <AppText style={{ fontSize: 50, marginHorizontal: 10 }}>
              Publicité ici ....
            </AppText>
          </View>

          <AppText
            style={{
              color: Colors.grey,
              fontSize: 18,
              marginHorizontal: 5,
            }}>
            Evènements réçamment publié ....
          </AppText>
        </View>

        <View style={styles.events}>
          <EventPublicationsScreen show={false} />
        </View>
      </View>
    </AppScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
  pubs: {
    height: 200,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
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
    maxHeight: 350,
    // backgroundColor: "black",
  },
})
