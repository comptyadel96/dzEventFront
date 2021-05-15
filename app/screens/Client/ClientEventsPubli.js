import React, { useState, useEffect, useContext } from "react"
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native"
import AuthContext from "../authentification/AuthContext"
import axios from "axios"
import BaseUrl from "../../assets/BaseUrl"
import EventCard from "../../components/Cards/EventCard"
import momment from "moment"
export default function ClientEventsPubli({ navigation }) {
  // const {user,_id}=useContext(AuthContext)
  const [clientEvents, setClientEvents] = useState([])

  const getUserEvents = async () => {
    try {
      const clientEventPublications = await axios.get(
        `${BaseUrl}/dzevents/v1/me/events`
      )
      setClientEvents(clientEventPublications)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getUserEvents()
  }, [])
  return (
    <View>
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
            onPress={() =>
              navigation.navigate("EventDetails", {
                _id: item._id,
                owner: item.owner,
              })
            }
          />
        )}
      />
    </View>
    
  )
}

const styles = StyleSheet.create({})
