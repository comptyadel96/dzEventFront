import React, { useState, useEffect } from "react"
import { FlatList, TouchableHighlight, View, StyleSheet } from "react-native"
import moment from "moment"
import { useNavigation } from "@react-navigation/native"
import EventCard from "../../components/Cards/EventCard"
import momentConfig from "../../config-momentJs/MomentJs" //on l'importe ici pour la configuration de la langue francaise
import AppPicker from "../../components/AppPicker"
import Categorie from "../../components/Categorie"
import AppText from "../../components/AppText"
import AppTextInput from "../../components/AppTextInput"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Colors from "../../assets/Colors"
import BaseUrl from "../../assets/BaseUrl"
import LoadingAnim from "../../components/LoadingAnim"

export default function EventPublicationsScreen({ show = true }) {
  const navigation = useNavigation()
  moment.locale("Fr")
  const [events, setEvent] = useState([])
  const [events2, setEvent2] = useState([])
  const [page, setPage] = useState(1)
  const [refresh] = useState(false)
  const [item, setItem] = useState("")
  const [searchEvent, setSearchEvent] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  // fonction pour fetcher la data depuis le back-end (remplacer 192.168.1.38 par votre adresse IP) nb:localhost ne marchera pas
  const fetchEvent = async () => {
    try {
      setLoading(true)
      const result = await fetch(
        `${BaseUrl}/dzevents/v1/posts?page=${page}&limit=5&categorie=${item}`
      )
      const event = await result.json()
      setEvent([...events, ...event])
      setLoading(false)
      setHasSearched(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchEvent()
  }, [page, item])

  const fetchMore = async () => {
    setPage((prevPage) => prevPage + 1)
  }
  const handleRefresh = async () => {
    setEvent([])
    setSearchEvent("")
    setHasSearched(false)
    const result = await fetch(
      `${BaseUrl}/dzevents/v1/posts?page=${page}&limit=5&categorie=${item}`
    )
    setPage(1)
    const event = await result.json()
    setEvent(event)
  }
  const handleResearch = async () => {
    if (searchEvent.length > 0) {
      setEvent2([])
      setHasSearched(true)
    } else {
      setHasSearched(false)
      setItem("")
    }
    const result = await fetch(
      `${BaseUrl}/dzevents/v1/posts?searchEvent=${searchEvent}`
    )
    const event = await result.json()
    setEvent2(event)
  }
  // enlever les filtres
  const clearFilter = async () => {
    setEvent([])
    setEvent2([])
    setItem("")
    setSearchEvent("")
    setHasSearched(false)
    try {
      const result = await fetch(
        `${BaseUrl}/dzevents/v1/posts?page=${page}&limit=5&categorie=${item}`
      )
      setPage(1)
      const event = await result.json()
      setEvent(event)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {show && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
          }}>
          <AppText style={styles.title}>Evènements</AppText>
          <AppTextInput
            icon="calendar-search"
            placeholder="Rechercher un évènement..."
            style={{ width: "70%" }}
            onChangeText={(text) => {
              text.trim()
              setSearchEvent(text)
              setHasSearched(false)
            }}
            onSubmitEditing={handleResearch}
          />
        </View>
      )}
      {show && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 12,
          }}>
          <AppPicker
            icon="apps"
            placeholder="Toutes les Catégories"
            categorie={Categorie}
            selectedItem={item}
            onSelectItem={(item) => setItem(item)}
            otherFunction={handleRefresh}
          />
          {hasSearched ||
            (item !== "" && (
              <TouchableHighlight onPress={clearFilter} underlayColor="white">
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}>
                  <MaterialCommunityIcons
                    name="calendar-remove"
                    size={38}
                    color={Colors.primary}
                  />
                  <AppText style={{ fontSize: 14, color: Colors.grey }}>
                    Enlever le filtre
                  </AppText>
                </View>
              </TouchableHighlight>
            ))}
        </View>
      )}

      <LoadingAnim
        visible={loading}
        source={require("../../assets/animations/calendar.json")}
      />

      {events.length && !hasSearched && !searchEvent ? (
        <FlatList
          style={{ zIndex: 1 }}
          data={events}
          keyExtractor={(event) => event._id.toString()}
          renderItem={({ item }) => (
            <EventCard
              titre={item.titre}
              categorie={item.categorie}
              region={item.region}
              imageUri={item.image}
              dateDebut={moment(item.dateDebut).format("D/MMM/YYYY")}
              dateFin={moment(item.dateFin).format("D/MMM/YYYY")}
              // status={item.status}
              createdAt={moment(item.createdAt).fromNow()}
              onPress={() => {
                navigation.navigate("EventDetails", {
                  _id: item._id,
                  owner: item.owner,
                })
              }}
            />
          )}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.5}
          refreshing={refresh}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        events.length == 0 &&
        !hasSearched &&
        searchEvent == "" &&
        item.length > 0 && (
          <AppText style={{ marginLeft: 20, color: Colors.grey }}>
            Aucun évènement disponible dans cette catégorie pour le moment...
          </AppText>
        )
      )}

      {searchEvent.length > 0 && hasSearched && events2.length > 0 ? (
        <FlatList
          data={events2}
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
      ) : (
        searchEvent.length > 0 &&
        hasSearched &&
        events2.length == 0 && (
          <AppText>Aucun évènement trouver pour " {searchEvent} "</AppText>
        )
      )}
    </>
  )
}
const styles = StyleSheet.create({
  title: { color: Colors.primary, fontWeight: "bold", fontSize: 28 },
})
