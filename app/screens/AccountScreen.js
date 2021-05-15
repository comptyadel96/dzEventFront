import React, { useState, useEffect, useContext } from "react"
import { StyleSheet, Image, View, TouchableOpacity } from "react-native"
import Colors from "../assets/Colors"
import AppText from "../components/AppText"
import AppButton from "../components/AppButton"
import ProfilPublication from "../components/ProfilPublication"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import AuthContext from "./authentification/AuthContext"
import RegisterOrLogin from "./authentification/RegisterOrLogin"

export default function AccountScreen({ profileImageUri, navigation }) {
  const { user, setUser } = useContext(AuthContext)
  return (
    <View style={styles.container}>
      {user && <AppText style={styles.title}>Profile</AppText>}
      {user && (
        <View style={styles.profilInfos}>
          {profileImageUri ? (
            <Image source={profileImageUri} style={styles.image} />
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <MaterialCommunityIcons
                name="camera-plus"
                size={34}
                color="black"
              />
              <AppButton
                title="ajouter une photo"
                style={styles.ajoutPhoto}
                text={{ fontSize: 14, color: "black" }}
              />
            </View>
          )}
          <View style={styles.nameEmail}>
            <AppText> {user.name} </AppText>
            <AppText style={{ color: "grey", fontSize: 15 }}>
              {user.email}
            </AppText>
          </View>
        </View>
      )}

      {user && (
        <View style={styles.myPublications}>
          <AppText
            style={{
              color: "grey",
              backgroundColor: "#e6e6e6",
              padding: 12,
              fontWeight: "bold",
            }}>
            <AntDesign name="calendar" size={24} color="grey" /> Mes
            Publications{" "}
          </AppText>
          <ProfilPublication
            text="Evènement(s) que j'ai publier "
            onPress={() => navigation.navigate("ClientEventsPubli")}
          />
          <ProfilPublication text="Article(s) publier sur le store " />
          <ProfilPublication text="Ma premiére fois  " />
        </View>
      )}

      {user && (
        <View style={styles.myPublications}>
          <AppText
            style={{
              color: "grey",
              backgroundColor: "#e6e6e6",
              padding: 12,
              fontWeight: "bold",
            }}>
            <Ionicons name="options" size={24} color="grey" /> Plus d'options{" "}
          </AppText>
          {profileImageUri && (
            <ProfilPublication text="Modifier la photo de profil" />
          )}
          <ProfilPublication text="Modifier vos informations personnelle " />
          <ProfilPublication
            text="Se déconnecter "
            onPress={() => setUser(undefined)}
          />
        </View>
      )}
      {!user && <RegisterOrLogin />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    alignSelf: "center",
    fontSize: 25,
    color: Colors.primary,
  },
  profilInfos: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  nameEmail: {
    display: "flex",
    marginLeft: 10,
  },
  myPublications: {
    marginTop: 50,
  },
  buttons: {
    borderRadius: 4,
    width: "60%",
    height: 35,
    backgroundColor: "transparent",
  },
  ajoutPhoto: {
    width: "auto",
    height: 20,
    backgroundColor: "lightgrey",
  },
})
