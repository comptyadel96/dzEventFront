import React, { useState, useEffect } from "react"
import { StyleSheet, FlatList, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import StoreCard from "../../components/Cards/StoreCard"
import moment from "moment"
import momentConfig from "../../config-momentJs/MomentJs" //on l'importe ici pour la configuration de la langue francaise
import AppTextInput from "../../components/AppTextInput"
import AppText from "../../components/AppText"
import { Fontisto } from "@expo/vector-icons"
import BaseUrl from "../../assets/BaseUrl"
import LoadingAnim from "../../components/LoadingAnim"
import axios from "axios"

export default function StorePublicationScreen() {
  const navigation = useNavigation()
  moment.locale("Fr")
  const [article, setArticle] = useState([])
  const [article2, setArticle2] = useState([])
  const [page, setPage] = useState(1)
  const [refresh] = useState(false)
  const [searchItem, setSearchItem] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchStoreItems = async () => {
    try {
      setLoading(true)
      const storeArticles = await axios.get(
        `${BaseUrl}/dzevents/v1/store?page=${page}&limit=10`
      )

      setArticle([...article, ...storeArticles.data])
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchStoreItems()
  }, [])

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1)
    setHasSearched(false)
  }

  const handleRefresh = async () => {
    try {
      setArticle([])
      setLoading(true)
      const result = await axios.get(
        `${BaseUrl}/dzevents/v1/store?page=${page}&limit=10`
      )

      setArticle([...article, ...result.data])
      setLoading(false)
      setHasSearched(false)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const handleResearch = async () => {
    setArticle2([])
    const result = await fetch(
      `${BaseUrl}/dzevents/v1/store?searchItem=${searchItem}`
    )

    const articles = await result.json()

    setArticle2(articles)
    setHasSearched(true)
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#F6F8F9",
      }}>
      <AppText style={styles.titre}>
        <Fontisto name="shopify" size={34} color="black" />
        tore
      </AppText>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AppTextInput
          icon="shopping-search"
          placeholder="Rechercher un article..."
          style={{ width: "70%" }}
          onChangeText={(text) => {
            setSearchItem(text)
            setHasSearched(false)
          }}
          onSubmitEditing={handleResearch}
        />
      </View>

      {/* LOADING ANIMATION FOR THE SHOP */}
      <LoadingAnim
        visible={loading}
        source={require("../../assets/animations/shop.json")}
      />

      {article.length && !searchItem ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <FlatList
            data={article}
            keyExtractor={(article) => article._id.toString()}
            renderItem={({ item }) => (
              <StoreCard
                article={item.article}
                wilaya={item.wilaya}
                prix={item.prix}
                image={item.photos[0]}
                createdAt={moment(item.createdAt).fromNow()}
                owner={item.owner}
                onPress={() =>
                  navigation.navigate("DetailsArticles", {
                    _id: item._id,
                    owner: item.owner,
                  })
                }
              />
            )}
            onEndReached={fetchMoreData}
            onEndReachedThreshold={0.5}
            onRefresh={handleRefresh}
            refreshing={refresh}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          />
        </View>
      ) : (
        !searchItem &&
        article.length > 0 && <AppText>Aucun article trouver </AppText>
      )}

      {/* si on fait une recherche dans le store ... */}
      {searchItem.length > 0 && hasSearched && article2.length > 0 ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <FlatList
            data={article2}
            keyExtractor={(article) => article._id.toString()}
            renderItem={({ item }) => (
              <StoreCard
                article={item.article}
                wilaya={item.wilaya}
                prix={item.prix}
                image={item.photos[0]}
                createdAt={moment(item.createdAt).fromNow()}
                owner={item.owner}
                onPress={() =>
                  navigation.navigate("DetailsArticles", {
                    _id: item._id,
                    owner: item.owner,
                  })
                }
              />
            )}
            numColumns={2}
          />
        </View>
      ) : (
        hasSearched &&
        searchItem.length > 0 &&
        article2.length == 0 && (
          <AppText style={{ marginHorizontal: 10 }}>
            Aucun article trouver pour "{searchItem}" assurez vous d'avoir écrit
            le nom de l'article correctement et réessayez
          </AppText>
        )
      )}
      {article.length == 0 && (
        <AppText style={{ textAlign: "center" }}>
          aucun article n'est disponible pour le moment
        </AppText>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  titre: {
    alignSelf: "center",
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 28,
    color: "crimson",
    marginTop: 10,
  },
})
