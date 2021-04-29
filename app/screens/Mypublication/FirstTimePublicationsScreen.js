import React, { useState, useEffect } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import moment from "moment"
import momentConfig from "../../config-momentJs/MomentJs" //on l'importe ici pour la configuration de la langue francaise

import AppScreen from "../../components/AppScreen"
import FirstTimeCard from "../../components/Cards/FirstTimeCard"
import BaseUrl from "../../assets/BaseUrl"
import { ScrollView } from "react-native-gesture-handler"
import AppText from "../../components/AppText"
import Colors from "../../assets/Colors"

export default function FirstTimePublicationsScreen({ navigation }) {
  const [firstTimes, setFirstTimes] = useState([])
  const [page, setPage] = useState(1)
  const [refresh] = useState(false)

  const fetchFirstTime = async () => {
    try {
      const result = await fetch(
        `${BaseUrl}/dzevents/v1/firsttime?page=${page}&limit=5`
      )
      const first = await result.json()
      setFirstTimes([...firstTimes, ...first])
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchFirstTime()
  }, [page])

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1)
  }
  const handleRefresh = async () => {
    setFirstTimes([])
    try {
      const result = await fetch(
        `${BaseUrl}/dzevents/v1/firsttime?page=${page}&limit=5`
      )
      setPage(1)
      const first = await result.json()
      setFirstTimes(first)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.titre}>First Time</AppText>
      <FlatList
        data={firstTimes}
        keyExtractor={(first) => first._id.toString()}
        renderItem={({ item }) => (
          <FirstTimeCard
            titre={item.titre}
            imageUri={item.photo}
            wilaya={item.wilaya}
            createdAt={moment(item.createdAt).fromNow()}
            // owner={item.owner.name}
            onPress={() =>
              navigation.navigate("FirstDetailsPublications", {
                _id: item._id,
                // owner: item.owner,
                photo: item.photo,
              })
            }
          />
        )}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5}
        refreshing={refresh}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titre: {
    fontSize: 22,
    color: Colors.gold,
    fontWeight: "bold",
    marginBottom: 20,
  },
})
