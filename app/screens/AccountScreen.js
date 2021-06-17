import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native"
import Colors from "../assets/Colors"
import AppText from "../components/AppText"
import ProfilPublication from "../components/ProfilPublication"
import { Ionicons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import RegisterOrLogin from "./authentification/RegisterOrLogin"
import axios from "axios"
import BaseUrl from "../assets/BaseUrl"
import { useContext } from "react"
import AuthContext from "./authentification/AuthContext"
import AppForm from "./forms/AppForm"
import AppImagePicker from "./forms/AppImagePicker"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import ButtonSubmit from "./forms/ButtonSubmit"
import LoadingAnim from "../components/LoadingAnim"
import AuthStorage from "./authentification/AuthStorage"

export default function AccountScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)
  const [profilPic, setProfilPic] = useState()
  const [changeCount, setCountChange] = useState(0)
  const [showpicAnimation, setShowPicAnimation] = useState(false)

  // le hook useEffect et la fonction fetchProfilPicture prendra effet seulment et si seulment on s'est connecté à notre compte
  {
    if (user) {
      const fetchProfilPicture = async () => {
        try {
          const userPic = await axios.get(`${BaseUrl}/dzevents/v1/users/me`)
          setProfilPic(userPic.data.profilePicture)
        } catch (e) {
          console.log(e)
        }
      }

      useEffect(() => {
        fetchProfilPicture()
        console.log(user)
      }, [changeCount])
    }
  }
  const handleLogout = () => {
    setUser(undefined)
    AuthStorage.deleteToken()
  }
  return (
    <View style={styles.container}>
      {user && <AppText style={styles.title}>Profile</AppText>}
      {user && (
        <View style={styles.profilInfos}>
          {user && user.profilePicture ? (
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Modal visible={showModal} style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="close"
                  size={27}
                  color={Colors.grey}
                  onPress={() => setShowModal(false)}
                />
                {/* animation quand l'utilisateur change sa photo de profile */}
                <LoadingAnim
                  source={require("../assets/animations/profilPicDone.json")}
                  visible={showpicAnimation}
                />
                <AppForm
                  initialValues={{
                    profilePic: null,
                  }}
                  onSubmit={async (value) => {
                    const formData = new FormData()
                    formData.append("profilePic", {
                      uri: value.profilePic,
                      type: "img/jpg",
                      name: value.profilePic,
                    })
                    try {
                      setShowPicAnimation(true)
                      await axios.put(
                        `${BaseUrl}/dzevents/v1/users/me/profilpicture`,
                        formData
                      )
                      setCountChange((prevCount) => prevCount + 1)
                      setShowPicAnimation(false)
                      Alert.alert("bravo", "photo mis à jour avec succées")
                      setShowModal(false)
                    } catch (error) {
                      console.log(error)
                    }
                  }}>
                  <AppImagePicker
                    name="profilePic"
                    imgStyle={styles.newProfilPic}
                  />
                  <ButtonSubmit
                    title="confirmer la photo"
                    style={{ width: 200, alignSelf: "center", height: 40 }}
                  />
                </AppForm>
              </Modal>

              <Image source={{ uri: profilPic }} style={styles.image} />
            </TouchableOpacity>
          ) : (
            <AppForm
              initialValues={{ profilePic: null }}
              onSubmit={async (value) => {
                const formData = new FormData()
                formData.append("profilePic", {
                  uri: value.profilePic,
                  type: "img/jpg",
                  name: value.profilePic,
                })
                try {
                  await axios.put(
                    `${BaseUrl}/dzevents/v1/users/me/profilpicture`,
                    formData
                  )
                } catch (error) {
                  console.log(error)
                }
              }}>
              <View style={{ flexDirection: "column" }}>
                <AppImagePicker
                  isProfilPicture={true}
                  name="profilePic"
                  imgStyle={styles.image}
                />
              </View>
            </AppForm>
          )}

          {user && (
            <View style={styles.nameEmail}>
              <AppText> {user.name} </AppText>
              <AppText style={{ color: "grey", fontSize: 15 }}>
                {user.email}
              </AppText>
            </View>
          )}
        </View>
      )}

      {user && (
        <View style={styles.myPublications}>
          <AppText
            style={{
              color: "grey",
              backgroundColor: "#e6e6e6",
              padding: 12,
              fontWeight: "bold",
            }}>
            <AntDesign name="calendar" size={24} color="grey" /> Mes
            Publications{" "}
          </AppText>
          <ProfilPublication
            text="Evènement(s) que j'ai publier "
            onPress={() => navigation.navigate("ClientEventsPubli")}
          />
          <ProfilPublication
            text="Article(s) publier sur le store "
            onPress={() => navigation.navigate("ClientStorePubli")}
          />
          <ProfilPublication
            text="Ma premiére fois  "
            onPress={() => navigation.navigate("ClientFirstPubli")}
          />
        </View>
      )}

      {user && (
        <View style={styles.myPublications}>
          <AppText
            style={{
              color: "grey",
              backgroundColor: "#e6e6e6",
              padding: 12,
              fontWeight: "bold",
            }}>
            <Ionicons name="options" size={24} color="grey" /> Plus d'options{" "}
          </AppText>

          <ProfilPublication
            text="Modifier vos informations personnelle "
            onPress={() => navigation.navigate("UpdateAccountInfos")}
          />
          <ProfilPublication text="Se déconnecter " onPress={handleLogout} />
        </View>
      )}
      {!user && <RegisterOrLogin />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    alignSelf: "center",
    fontSize: 25,
    color: Colors.primary,
  },
  profilInfos: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  nameEmail: {
    display: "flex",
    marginLeft: 10,
  },
  myPublications: {
    marginTop: 50,
  },
  buttons: {
    borderRadius: 4,
    width: "60%",
    height: 35,
    backgroundColor: "transparent",
  },
  ajoutPhoto: {
    width: "auto",
    height: 20,
    backgroundColor: "lightgrey",
  },
  submitImg: {
    width: 98,
    height: 25,
  },
  newProfilPic: {
    width: 200,
    height: 200,
  },
})
