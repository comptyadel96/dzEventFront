import React, { useState, useEffect } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import axios from "axios"
import BaseUrl from "../../assets/BaseUrl"
import moment from "moment"
import { useNavigation } from "@react-navigation/core"
import AppText from "../../components/AppText"
import Colors from "../../assets/Colors"
import StoreCard from "../../components/Cards/StoreCard"

export default function ClientStorePubli() {
  const navigation = useNavigation()
  const [clientStore, setClientStore] = useState([])

  const getUserStore = async () => {
    try {
      const clientStorePublications = await axios.get(
        `${BaseUrl}/dzevents/v1/store/me/stores`
      )
      setClientStore(clientStorePublications.data)
      console.log(clientStorePublications.data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getUserStore()
  }, [])
  return (
    <View style={styles.container}>
      {clientStore ? (
        <View style={styles.articleContainer}>
          <FlatList
            data={clientStore}
            keyExtractor={(store) => store._id.toString()}
            
            renderItem={({ item }) => (
              <StoreCard
                article={item.article}
                image={item.photos[0]}
                onPress={() =>
                  navigation.navigate("DetailsArticles", {
                    _id: item._id,
                    owner: item.owner,
                  })
                }
              />
            )}
          />
        </View>
      ) : (
        <AppText style={{ marginHorizontal: 15 }}>
          vous n'avez pas encore publier d'article(s) sur le store
        </AppText>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  articleContainer: {
    width: "100%",
    borderWidth: 1,
   
  },
})
