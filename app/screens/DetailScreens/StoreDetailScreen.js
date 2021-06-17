import React, { useState, useEffect, useContext } from "react"
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
import AuthContext from "../authentification/AuthContext"
import AppForm from "../forms/AppForm"
import EventImages from "../forms/EventImages"
import axios from "axios"
import LoadingAnim from "../../components/LoadingAnim"

export default function StoreDetailScreen({ route }) {
  const abortControll = new AbortController()
  const navigation = useNavigation()
  const { user } = useContext(AuthContext)
  const { _id, owner, profilePicture } = route.params
  const [article, setArticle] = useState([])
  const [photos, setPhotos] = useState([])
  const [showLoadingAnim, setShowLoadingAnim] = useState(false)

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
  }, [photos, photos.length])

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
        <View style={styles.imagesContainer}>
          {!showLoadingAnim && (
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
            />
          )}
          {/* si la publication appartient a celui qui la publier alors on lui affiche l'icone pour rajouter d'autres photos  */}
          {user && user._id === owner._id && photos.length <= 4 && (
            <View style={styles.updatePhotosContainer}>
              <AppForm
                initialValues={{ storePics: [] }}
                onSubmit={async (value) => {
                  const formdata = new FormData()
                  value.storePics.map((photo) =>
                    formdata.append("storePics", {
                      uri: photo,
                      type: "image/jpg",
                      name: photo,
                    })
                  )
                  try {
                    setShowLoadingAnim(true)
                    await axios.patch(
                      `${BaseUrl}/dzevents/v1/store/${_id}/pictures`,
                      formdata
                    )
                    setShowLoadingAnim(false)
                  } catch (e) {
                    console.log(e)
                    alert(
                      "ooppss on ne peut pas mettre à jour cet photo... veuillez réessayer ulterierement 😓 "
                    )
                  }
                }}>
                {/* anim pour le changement de la photo pour le store */}
                {showLoadingAnim && (
                  <View style={styles.animLoading}>
                    <LoadingAnim
                      visible={showLoadingAnim}
                      source={require("../../assets/animations/loading-store.json")}
                    />
                  </View>
                )}

                {!showLoadingAnim && (
                  <EventImages name="storePics" isUpdateStore={true} />
                )}
              </AppForm>
            </View>
          )}
        </View>

        <AppText numberOfLines={2} ellipsizeMode="tail" style={styles.titre}>
          {article.article}
        </AppText>

        <ScrollView showsVerticalScrollIndicator={false}>
          {article.description ? (
            <View
              style={{
                paddingHorizontal: 35,
                paddingVertical: 7,
                backgroundColor: Colors.textInput,
                marginBottom: 18,
                marginHorizontal: 20,
                borderRadius: 50,
              }}>
              <AppText style={styles.infos}>Description</AppText>
              <Text style={styles.description}>{article.description}</Text>
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
              <Text style={styles.subInfos}>
                {article.prix}
                {""} da
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppLogo
                logo="timer"
                logoColor={Colors.dark}
                backColor={Colors.textInput}
                size={70}
              />
              <Text style={styles.subInfos}>
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
              {profilePicture && (
                <Image
                  source={{ uri: profilePicture }}
                  style={styles.profilPicImg}
                />
              )}

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
          {user && user._id === owner._id && (
            <AppButton
              title="modifier la publication"
              style={{ height: 37, width: 200, alignSelf: "center" }}
              color={Colors.purple}
              onPress={() => {
                navigation.navigate("PutStore", {
                  _id,
                  owner,
                  article,
                })
                console.log(article)
              }}
            />
          )}
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
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
    color: Colors.primary,
    fontSize: 16,
    margin: 5,
  },
  description: {
    color: Colors.grey,
    fontSize: 16,
  },
  defaultImage: {
    width: 340,
    height: 140,
    borderRadius: 70,
  },

  profilPicImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  animLoading: {
    height: 200,
    width: "100%",
  },
  updatePhotosContainer: {
    width: 153,
    height: 122,
    alignSelf: "center",
  },
})
