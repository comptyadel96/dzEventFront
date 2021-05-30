import React, { useState, useEffect} from "react"
import { FlatList,  StyleSheet,  View } from "react-native"
import axios from "axios"
import BaseUrl from "../../assets/BaseUrl"
import EventCard from "../../components/Cards/EventCard"
import moment from "moment"
import { useNavigation } from "@react-navigation/core"
import AppText from "../../components/AppText"
import Colors from "../../assets/Colors"


export default function ClientEventsPubli() {
  const navigation = useNavigation()
  const [clientEvents, setClientEvents] = useState([])

  const getUserEvents = async () => {
    try {
      const clientEventPublications = await axios.get(
        `${BaseUrl}/dzevents/v1/posts/me/events`
      )
      setClientEvents(clientEventPublications.data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getUserEvents()
  }, [])
  return (
    <View>
      {clientEvents ? (
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
        <AppText style={styles.text}>
          il semble que vous n'avez pas encore publier d'évènements...
        </AppText>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  text: { marginHorizontal: 15, color:Colors.primary},
})
