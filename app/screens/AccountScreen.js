import React, { useState, useEffect } from "react"
import { StyleSheet, Image, View, TouchableOpacity } from "react-native"
import Colors from "../assets/Colors"
import AppText from "../components/AppText"
import AppButton from "../components/AppButton"
import AppLogo from "../components/AppLogo"
import ProfilPublication from "../components/ProfilPublication"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"

export default function AccountScreen({
  profileImageUri,
  nom,
  email,
  phoneNumber,
}) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Profile</AppText>

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
          <AppText> boullif adel </AppText>
          <AppText style={{ color: "grey", fontSize: 15 }}>
            adoula136@gmail.com
          </AppText>
        </View>
      </View>

      <View style={styles.myPublications}>
        <AppText
          style={{
            color: "grey",
            backgroundColor: "#e6e6e6",
            padding: 12,
            fontWeight: "bold",
          }}>
          <AntDesign name="calendar" size={24} color="grey" /> Mes Publications{" "}
        </AppText>
        <ProfilPublication text="Evènement(s) que j'ai publier " />
        <ProfilPublication text="Article(s) publier sur le store " />
        <ProfilPublication text="Ma premiére fois  " />
      </View>

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
        <ProfilPublication text="Se déconnecter " />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
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
