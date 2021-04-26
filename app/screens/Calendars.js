import React, { useState, useEffect } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import Colors from "../assets/Colors"
import AppButton from "../components/AppButton"
import { Calendar } from "react-native-big-calendar"
import BaseUrl from "../assets/BaseUrl"
import "./locale"
import moment from "moment"
import momentConfig from "../config-momentJs/MomentJs"
import EventCard from "../components/Cards/EventCard"
import { useNavigation } from "@react-navigation/core"
import AppText from "../components/AppText"
import { FontAwesome } from "@expo/vector-icons"

export default function Calendars() {
  const navigation = useNavigation()
  const [event, setEvent] = useState([])
  const [oneEvent, setOneEvent] = useState([])
  const [showEvent, setShowEvent] = useState(false)
  const [calendarMode, setCalendarMode] = useState("week")

  // fetch the event and display them in big-calendar
  const fetchEvents = async () => {
    const events = await fetch(`${BaseUrl}/dzevents/v1/posts`)
    const data = await events.json()
    setEvent(data)
  }
  // fetch a single event (the one chosen by the user)
  const fetchOneEvent = async (_id) => {
    setShowEvent(true)
    const result = await fetch(`${BaseUrl}/dzevents/v1/posts/${_id}`)
    const event = await result.json()
    setOneEvent(event)
  }

  useEffect(() => {
    fetchEvents()
  }, [])
  const myEvents = event.map((event) => ({
    _id: event._id,
    title: event.titre,
    start: event.dateDebut,
    end: event.dateFin,
  }))

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <AppText style={styles.infos}>
          <FontAwesome name="info-circle" size={15} color={Colors.primary} />{" "}
          Changer la vue du calendrier en appuyant sur l'un des boutons
          ci-dessous :
        </AppText>
        <View style={styles.buttonContainer}>
          <AppButton
            style={styles.button}
            title="semaine  >"
            onPress={() => setCalendarMode("week")}
          />
          <AppButton
            style={styles.button}
            title="3 jours  >"
            onPress={() => setCalendarMode("3days")}
          />

          <AppButton
            style={styles.button}
            title="1 jour  >"
            onPress={() => setCalendarMode("day")}
          />
        </View>
        <AppText style={styles.infos}>
          Appuyez sur un évènement dans le calendrier pour avoir plus de details
        </AppText>
        <Calendar
          events={myEvents}
          height={600}
          locale="fr"
          hideNowIndicator
          onPressEvent={(e) => fetchOneEvent(e._id)}
          mode={calendarMode}
        />

        {showEvent && (
          <View style={styles.event}>
            <EventCard
              titre={oneEvent.titre}
              categorie={oneEvent.categorie}
              imageUri={oneEvent.image}
              region={oneEvent.region}
              dateDebut={moment(oneEvent.dateDebut).format( "DD MMM YYYY")}
              dateFin={moment(oneEvent.dateFin).format("DD MMM YYYY")}
              key={oneEvent._id}
              onPress={() => {
                navigation.navigate("EventDetails", {
                  _id: oneEvent._id,
                })
              }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { display: "flex" },
  infos: {
    textAlign: "center",
    fontSize: 14,
    color: "grey",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    width: "auto",
    height: 23,
    backgroundColor: Colors.primary,
  },
})
