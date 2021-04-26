import React from "react"
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import Colors from "../../assets/Colors"
import AppText from "../AppText"
import { MaterialCommunityIcons } from "@expo/vector-icons"
export default function FirstTimeCard({
  titre,
  imageUri,
  wilaya,
  adresse,
  createdAt,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Image
          source={require("../../assets/firstDefaultImage.png")}
          style={styles.image}
        />
      )}
      <View style={styles.infosContainer}>
        <AppText style={styles.titre}> {titre} </AppText>
        <AppText style={styles.infos}>
          <MaterialCommunityIcons name="map-marker" size={24} color="grey" />{" "}
          {wilaya}{" "}
        </AppText>
        {adresse && <AppText style={styles.infos}> {adresse} </AppText>}

        <AppText style={{ fontSize: 15, color: "black" }}>
          <MaterialCommunityIcons
            name="clock-time-eight"
            size={24}
            color="grey"
          />{" "}
          {createdAt}{" "}
        </AppText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    alignItems: "center",
    width: 350,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 260,
  },
  infosContainer: {
    padding: 10,
    marginTop: 8,
    backgroundColor: "#eeeeed",
    width: "100%",
  },
  titre: {
    color: Colors.grey,
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  infos: {
    color: Colors.grey,
  },
})
