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

export default function StorePublicationScreen() {
  const navigation = useNavigation()
  moment.locale("Fr")
  const [article, setArticle] = useState([])
  const [article2, setArticle2] = useState([])
  const [page, setPage] = useState(1)
  const [refresh] = useState(false)
  const [searchItem, setSearchItem] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    fetch(`${BaseUrl}/dzevents/v1/store?page=${page}&limit=10`)
      .then((result) => result.json())
      .then((data) => setArticle([...article, ...data]))
  }, [page])

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1)
    setHasSearched(false)
  }

  const handleRefresh = async () => {
    setArticle([])
    const result = await fetch(
      `${BaseUrl}/dzevents/v1/store?page=${page}&limit=10`
    )
    setPage(1)
    const articles = await result.json()
    setArticle(articles)
    setHasSearched(false)
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
        !article.length && <AppText>Aucun article trouver </AppText>
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
          <AppText>
            Aucun article trouver pour "{searchItem}" assurez vous d'avoir écrit
            le nom de l'article correctement et réessayez
          </AppText>
        )
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
