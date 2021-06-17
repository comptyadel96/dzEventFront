import React, { useState, useEffect } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import moment from "moment"
import momentConfig from "../../config-momentJs/MomentJs" //on l'importe ici pour la configuration de la langue francaise
import FirstTimeCard from "../../components/Cards/FirstTimeCard"
import BaseUrl from "../../assets/BaseUrl"
import axios from "axios"
import AppText from "../../components/AppText"
import Colors from "../../assets/Colors"
import LoadingAnim from "../../components/LoadingAnim"

export default function FirstTimePublicationsScreen({ navigation }) {
  const [firstTimes, setFirstTimes] = useState([])
  const [page, setPage] = useState(1)
  const [refresh] = useState(false)
  const [showLoadingAnim, setShowLoadingAnim] = useState(false)
  const fetchFirstTime = async () => {
    try {
      setShowLoadingAnim(true)
      const first = await axios(
        `${BaseUrl}/dzevents/v1/firsttime?page=${page}&limit=10`
      )
      setFirstTimes([...firstTimes, ...first.data])
      setShowLoadingAnim(false)
      console.log(page)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchFirstTime()
  }, [page])

  const fetchMoreData = () => {
    if (firstTimes.length > 3) setPage((prevPage) => prevPage + 1)
  }
  const handleRefresh = async () => {
    setFirstTimes([])
    try {
      const first = await axios.get(
        `${BaseUrl}/dzevents/v1/firsttime?page=${page}&limit=10`
      )
      setPage(1)
      setFirstTimes(first.data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.titre}>First Time</AppText>
      {!showLoadingAnim && (
        <FlatList
          data={firstTimes}
          keyExtractor={(first) => first._id.toString()}
          renderItem={({ item }) => (
            <FirstTimeCard
              titre={item.titre}
              owner={item.owner}
              imageUri={item.photo}
              wilaya={item.wilaya}
              createdAt={moment(item.createdAt).fromNow()}
              onPress={() => {
                navigation.navigate("FirstDetailsPublications", {
                  _id: item._id,
                  owner: item.owner,
                  photo: item.photo,
                })
              }}
            />
          )}
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.5}
          refreshing={refresh}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
        />
      )}
      {/* // animation du chargement des firstTimes */}
      {showLoadingAnim && (
        <View style={styles.animation}>
          <LoadingAnim
            visible={true}
            source={require("../../assets/animations/firstTime.json")}
          />
        </View>
      )}
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
  animation: {
    height: "100%",
    width: "100%",
  },
})
