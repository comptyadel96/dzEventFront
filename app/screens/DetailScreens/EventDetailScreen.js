import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, Image, ScrollView } from "react-native"
import AppText from "../../components/AppText"
import moment from "moment"
import momentConfig from "../../config-momentJs/MomentJs"
import Colors from "../../assets/Colors"
import BaseUrl from "../../assets/BaseUrl"

export default function EventDetailScreen({ route, navigation }) {
  const { _id, owner } = route.params

  moment.locale("Fr")

  const [event, setEvent] = useState([])

  const fetchEvent = async () => {
    const result = await fetch(`${BaseUrl}/dzevents/v1/posts/${_id}`)
    const data = await result.json()
    setEvent(data)
  }

  useEffect(() => {
    fetchEvent()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={{ justifyContent: "center" }}>
        {event.image ? (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `${event.image}` }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/event4.jpg")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        )}
        <View style={styles.textContainer}>
          <AppText style={styles.title}>{event.titre}</AppText>
          <AppText style={styles.categorie}>
            Catégorie: <Text style={styles.text}>{event.categorie}</Text>
          </AppText>

          <AppText style={styles.categorie}>
            Wilaya:
            <Text style={styles.text}>{event.region}</Text>
          </AppText>

          <AppText style={styles.categorie}>
            Adresse: <Text style={styles.text}>{event.adresse}</Text>
          </AppText>

          {moment(event.dateDebut).format("D MMM YYYY") !==
          moment(event.dateFin).format("D MMM YYYY") ? (
            <View style={{ flexDirection: "row" }}>
              <AppText style={styles.categorie}>
                Du:
                <Text style={styles.text}>
                  {moment(event.dateDebut).format("D MMM YYYY à H:m")}
                </Text>
              </AppText>

              <AppText style={styles.categorie}>
                Au:
                <Text style={styles.text}>
                  {moment(event.dateFin).format("D MMM YYYY à H:m")}
                </Text>
              </AppText>
            </View>
          ) : (
            <View style={{ flexDirection: "column" }}>
              <AppText style={styles.categorie}>
                Le:
                <Text style={styles.text}>
                  {moment(event.dateDebut).format("D MMM YYYY")}
                </Text>
              </AppText>

              <AppText style={styles.categorie}>
                de:{" "}
                <Text style={styles.text}>
                  {moment(event.dateDebut).format("H:m")}
                </Text>{" "}
                <AppText style={styles.categorie}>
                  à:{" "}
                  <Text style={styles.text}>
                    {moment(event.dateFin).format("H:m ")}{" "}
                  </Text>
                </AppText>
              </AppText>
            </View>
          )}

          {/* <AppText>{event.status} </AppText> */}

          {event.description ? (
            <View style={styles.description}>
              <AppText style={styles.categorie}>
                Description:
                <Text style={styles.text}>{event.description}</Text>
              </AppText>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: Colors.textInput,
                paddingVertical: 10,
                width: "100%",
                alignSelf: "center",
                borderRadius: 80,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <AppText style={styles.text}>
                pas de description pour le moment ....
              </AppText>
            </View>
          )}
        </View>
        <View style={styles.publisher}>
          <AppText style={{ color: Colors.primary }}>Publier par:</AppText>
          {/* <Text style={styles.text}>{owner.name}</Text> */}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: Colors.lightgrey,
  },
  imageContainer: {
    paddingHorizontal: 8,
    width:'100%'
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 2,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    color: Colors.primary,
    fontSize: 27,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 15,
    textAlign: "center",
  },
  description: {
    backgroundColor: Colors.textInput,
    minHeight: 100,
    padding: 10,
  },
  categorie: {
    color: Colors.secondary,
    marginLeft: 5,
    marginBottom: 15,
  },
  publisher: {
    margin: 10,
  },
  text: {
    color: Colors.grey,
    fontSize: 17,
  },
})