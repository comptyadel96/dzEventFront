import React, { useState, useEffect } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import FirstTimeCard from "./app/components/Cards/FirstTimeCard"
import CacheLayer from "./app/util/CacheLayer"
import moment from "moment"
import axios from "axios"
import { useNetInfo } from "@react-native-community/netinfo"

export default function Test() {
  const networkInfos = useNetInfo()
  const [firstTimes, setFirstTimes] = useState([])
  const [page] = useState(1)

  const fetchFirstTime = async () => {
    try {
      const first = await axios(
        `${BaseUrl}/dzevents/v1/firsttime?page=${page}&limit=10`
      )
      // si l'appel à notre backend ne contient aucune erreure alors on store la data dans le cache de l'appareil
      if (first.status == 200) {
        await CacheLayer.store("FirstTimeData", first.data)
        setFirstTimes([...firstTimes, ...first.data])
      }
    } catch (e) {
      console.log(e)
    }
  }

  const displayCachedData = async () => {
    try {
      if (
        networkInfos.isInternetReachable === false &&
        networkInfos.type !== "unknown"
      ) {
        alert('pas de connexion')
        const cachedData = await CacheLayer.getItem("FirstTimeData")
        setFirstTimes([...cachedData])
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchFirstTime()
    displayCachedData()
    console.log(networkInfos.isConnected);
  }, [])

  return (
    <View>
      <FlatList
        data={firstTimes}
        keyExtractor={(first) => first._id.toString()}
        renderItem={({ item }) => (
          <FirstTimeCard
            titre={item.titre}
            imageUri={item.photo}
            wilaya={item.wilaya}
            createdAt={moment(item.createdAt).fromNow()}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
