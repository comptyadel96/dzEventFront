import React, { useState, useEffect } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import axios from "axios"
import BaseUrl from "../../assets/BaseUrl"
import EventCard from "../../components/Cards/EventCard"
import moment from "moment"
import { useNavigation } from "@react-navigation/core"
import AppText from "../../components/AppText"
import Colors from "../../assets/Colors"
import LoadingAnim from "../../components/LoadingAnim"
import AppButton from "../../components/AppButton"

export default function ClientEventsPubli() {
  const navigation = useNavigation()
  const [clientEvents, setClientEvents] = useState([])
  const [showAnim, setShowAnim] = useState(false)
  const getUserEvents = async () => {
    setShowAnim(true)
    try {
      const clientEventPublications = await axios.get(
        `${BaseUrl}/dzevents/v1/posts/me/events`
      )
      setClientEvents(clientEventPublications.data)
      setShowAnim(false)
    } catch (e) {
      console.log(e)
      setShowAnim(false)
    }
  }
  useEffect(() => {
    getUserEvents()
  }, [])
  return (
    <View>
      <AppText
        style={{ fontSize: 20, color: Colors.primary, textAlign: "center",marginBottom:10 }}>
        Mes évènements
      </AppText>
      {showAnim && (
        <View style={{ height: "100%", width: "100%" }}>
          <LoadingAnim
            visible={showAnim}
            source={require("../../assets/animations/loading-event.json")}
          />
        </View>
      )}

      {clientEvents.length !== 0 && clientEvents ? (
        <FlatList
          data={clientEvents}
          keyExtractor={(event) => event._id.toString()}
          renderItem={({ item }) => (
            <EventCard
              titre={item.titre}
              categorie={item.categorie}
              region={item.region}
              imageUri={item.image}
              dateDebut={moment(item.dateDebut).format("D/MMM/YYYY")}
              dateFin={moment(item.dateFin).format("D/MMM/YYYY")}
              createdAt={moment(item.createdAt).fromNow()}
              onPress={() => {
                navigation.navigate("EventDetails", {
                  _id: item._id,
                  owner: item.owner,
                })
              }}
            />
          )}
        />
      ) : (
        <>
          <AppText style={styles.text}>
            il semble que vous n'avez pas encore publier d'évènements...
          </AppText>
          <AppButton
            title="Publier"
            onPress={() => navigation.navigate("Publication")}
            style={{ width: 150, height: 37, alignSelf: "center" }}
            color={Colors.primary}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  text: { marginHorizontal: 15, color: "black" },
})
