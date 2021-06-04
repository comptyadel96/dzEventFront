import React, { useState, useEffect } from "react"
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native"

import AppText from "../../components/AppText"
import { useNavigation } from "@react-navigation/native"
import moment from "moment"
import momentConfig from "../../config-momentJs/MomentJs"
import AppLogo from "../../components/AppLogo"
import AppButton from "../../components/AppButton"
import Colors from "../../assets/Colors"
import BaseUrl from "../../assets/BaseUrl"

export default function StoreDetailScreen({ route }) {
  const abortControll = new AbortController()
  const navigation = useNavigation()
  const { _id, owner } = route.params
  const [article, setArticle] = useState([])
  const [photos, setPhotos] = useState([])

  const fetchArticles = async () => {
    try {
      const articleUrl = await fetch(`${BaseUrl}/dzevents/v1/store/${_id}`, {
        signal: abortControll.signal,
      })
      const result = await articleUrl.json()
      setArticle(result)
      setPhotos(result.photos)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchArticles()
    return () => abortControll.abort()
  }, [photos])

  return (
    <>
      <AppButton
        title="<"
        text={{ fontSize: 35, color: "white", fontWeight: "bold" }}
        style={{ width: 46, height: 40, marginLeft: 8, borderRadius: 10 }}
        onPress={() => navigation.goBack()}
        color={Colors.primary}
      />
      <View style={styles.container}>
        {photos ? (
          <FlatList
            data={photos}
            keyExtractor={(store) => store._id}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("ViewStoreImages", {
                    imgUrl: item.url,
                    img_id: item._id,
                    article_id: _id,
                    owner: owner._id,
                  })
                }}>
                <Image
                  source={{ uri: `${item.url.toString()}` }}
                  style={styles.images}
                />
              </TouchableWithoutFeedback>
            )}
            horizontal={true}
            style={{
              minHeight: 230,
            }}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Image
            source={require("../../assets/storeDefaultImage.jpg")}
            style={styles.defaultImage}
          />
        )}

        <AppText numberOfLines={2} ellipsizeMode="tail" style={styles.titre}>
          {article.article}
        </AppText>

        <ScrollView showsVerticalScrollIndicator={false}>
          {article.description ? (
            <View
              style={{
                paddingHorizontal: 35,
                backgroundColor: Colors.textInput,
                marginBottom: 18,
                marginHorizontal: 20,
                borderRadius: 50,
              }}>
              <AppText style={styles.infos}>Description</AppText>
              <Text style={styles.subInfos}>{article.description}</Text>
            </View>
          ) : (
            <View
              style={{
                paddingHorizontal: 35,
                backgroundColor: Colors.textInput,
                marginBottom: 18,
                marginHorizontal: 20,
                borderRadius: 50,
              }}>
              <AppText style={{ color: "grey", marginVertical: 20 }}>
                Aucune description...
              </AppText>
            </View>
          )}
          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppLogo
                logo="map-marker-radius"
                logoColor={Colors.dark}
                backColor={Colors.textInput}
                size={70}
              />
              <Text style={styles.subInfos}>{article.wilaya}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppLogo
                logo="cash-usd"
                logoColor={Colors.dark}
                backColor={Colors.textInput}
                size={70}
              />
              <Text style={styles.subInfos}>{article.prix}</Text>
              <Text style={styles.da}>da</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppLogo
                logo="timer"
                logoColor={Colors.dark}
                backColor={Colors.textInput}
                size={70}
              />
              <Text
                style={{
                  color: Colors.secondary,
                  fontSize: 17,
                  marginLeft: 8,
                }}>
                {moment(article.createdAt).fromNow()}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              marginVertical: 15,
              marginHorizontal: 10,
              alignSelf: "flex-start",
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}>
              <AppLogo
                logo="face"
                logoColor={Colors.grey}
                size={55}
                backColor={Colors.white}
              />
              <AppText style={{ marginLeft: 5, color: Colors.primary }}>
                {owner.name}
              </AppText>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}>
              <AppLogo
                logo="email-outline"
                logoColor={Colors.grey}
                size={55}
                backColor={Colors.white}
              />
              <AppText style={{ marginLeft: 5, color: Colors.primary }}>
                {owner.email}
              </AppText>
            </View>

            {owner.phoneNumber && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}>
                <AppLogo
                  logo="cellphone-android"
                  logoColor={Colors.grey}
                  size={55}
                  backColor={Colors.white}
                />
                <AppText style={{ marginLeft: 5, color: Colors.primary }}>
                  {owner.phoneNumber}
                </AppText>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  images: {
    width: 200,
    height: 200,
    marginHorizontal: 15,
    marginVertical: 20,
    resizeMode: "contain",
    borderRadius: 25,
  },
  titre: {
    marginVertical: 20,
    fontSize: 23,
    textTransform: "uppercase",
    color: Colors.primary,
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    backgroundColor: Colors.textInput,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  infos: {
    marginVertical: 8,
    fontSize: 20,
    color: Colors.secondary,
  },
  subInfos: {
    color: Colors.secondary,
    fontSize: 19,
    margin: 5,
  },
  defaultImage: {
    width: 340,
    height: 140,
    borderRadius: 70,
  },
  da: {
    color: Colors.dark,
    fontSize: 16,
    fontWeight: "600",
  },
})
