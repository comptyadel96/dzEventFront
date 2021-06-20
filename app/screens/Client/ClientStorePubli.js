import React, { useState, useEffect } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import axios from "axios"
import BaseUrl from "../../assets/BaseUrl"
import moment from "moment"
import { useNavigation } from "@react-navigation/core"
import AppText from "../../components/AppText"
import Colors from "../../assets/Colors"
import StoreCard from "../../components/Cards/StoreCard"
import AppButton from "../../components/AppButton"

export default function ClientStorePubli() {
  const navigation = useNavigation()
  const [clientStore, setClientStore] = useState([])

  const getUserStore = async () => {
    try {
      const clientStorePublications = await axios.get(
        `${BaseUrl}/dzevents/v1/store/me/stores`
      )
      setClientStore(clientStorePublications.data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getUserStore()
  }, [])
  return (
    <View style={styles.container}>
      <AppText style={styles.titre}>Mes articles sur le store </AppText>
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
                style={{ alignSelf: "center" }}
              />
            )}
          />
        </View>
      ) : (
        <>
          <AppText style={{ marginHorizontal: 15, marginTop: 10 }}>
            Vous n'avez pas encore publier d'article(s) sur le store
          </AppText>
          <AppButton
            title="Publier"
            onPress={() => navigation.navigate("Publication")}
            style={{ width: 150, height: 37, alignSelf: "center" }}
            color={Colors.secondary}
          />
        </>
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
    color: Colors.primary,
    fontSize: 20,
  },
  articleContainer: {
    flex: 1,
    width: "100%",
    marginVertical: 5,
  },
})
