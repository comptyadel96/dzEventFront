import React from "react"
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native"
import AppText from "../AppText"
import Colors from "../../assets/Colors"

export default function EventCard({
  titre,
  categorie,
  imageUri,
  region,
  dateDebut,
  dateFin,
  onPress,
  createdAt,
}) {
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <View style={{ backgroundColor: "transparent", borderRadius: 10 }}>
            <Image
              source={{ uri: `${imageUri}` }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.textContainer}>
            <AppText
              style={styles.title}
              numberOfLines={2}
              ellipsizeMode="tail">
              {titre}
            </AppText>

            <AppText style={styles.categorie}>
              Catégorie: <Text style={styles.text}>{categorie}</Text>
            </AppText>

            <AppText style={styles.categorie}>
              Wilaya: <Text style={styles.text}>{region}</Text>
            </AppText>

            {dateDebut !== dateFin ? (
              <View style={{ flexDirection: "row" }}>
                <AppText style={styles.categorie}>
                  Du: <Text style={styles.text}>{dateDebut}</Text>
                </AppText>

                <AppText style={styles.categorie}>
                  Au: <Text style={styles.text}>{dateFin}</Text>
                </AppText>
              </View>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <AppText style={styles.categorie}>
                  Le: <Text style={styles.text}>{dateDebut}</Text>
                </AppText>
              </View>
            )}

            <AppText style={{ fontSize: 14, color: "grey" }}>
              {createdAt}{" "}
            </AppText>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.white,
    // borderWidth:1
  },
  image: {
    width: "100%",
    height: 160,
    margin: "auto",
    backgroundColor: Colors.lightgrey,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: "hidden",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 3,
    backgroundColor: Colors.textInput,
    borderRadius: 10,
  },
  title: {
    color: "#C24C5D",
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    fontSize: 25,
    textTransform: "capitalize",
    marginBottom: 5,
  },
  categorie: {
    color: Colors.secondary,
    fontWeight: "bold",
    marginRight: 5,
  },
  text: {
    color: Colors.grey,
    fontWeight: "300",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 17,
  },
  infoButton: {
    width: 70,
    height: 25,
    marginTop: 0,
  },
})
