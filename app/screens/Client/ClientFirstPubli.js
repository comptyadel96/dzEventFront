import axios from "axios"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import BaseUrl from "../../assets/BaseUrl"
import Colors from "../../assets/Colors"
import AppButton from "../../components/AppButton"
import AppText from "../../components/AppText"
import FirstTimeCard from "../../components/Cards/FirstTimeCard"
import LoadingAnim from "../../components/LoadingAnim"

export default function ClientFirstPubli({ navigation }) {
  const [firstTime, setFirstTime] = useState()
  const [showAnim, setShowAnim] = useState(false)
  const getUserFirst = async () => {
    setShowAnim(true)
    try {
      const first = await axios.get(
        `${BaseUrl}/dzevents/v1/firsttime/me/firstevent`
      )
      setShowAnim(false)
      setFirstTime(first.data)
    } catch (e) {
      console.log(e)
      setShowAnim(false)
    }
  }
  useEffect(() => {
    getUserFirst()
  }, [])
  return (
    <View style={styles.container}>
      <AppText style={styles.titre}> Ma premiére fois </AppText>
      {showAnim && (
        <View style={styles.animation}>
          <LoadingAnim
            visible={showAnim}
            source={require("../../assets/animations/loading-first.json")}
          />
        </View>
      )}
      {firstTime ? (
        <FirstTimeCard
          adresse={firstTime.adresse}
          createdAt={moment(firstTime.createdAt).fromNow()}
          imageUri={firstTime.photo}
          titre={firstTime.titre}
          wilaya={firstTime.wilaya}
          onPress={() => {
            navigation.navigate("FirstDetailsPublications", {
              _id: firstTime._id,
              owner: firstTime.owner,
              photo: firstTime.photo,
            })
          }}
        />
      ) : (
        <>
        <AppText style={{ marginHorizontal: 15 }}>
          Vous n'avez pas encore publier votre firstTime event .
        </AppText>
        <AppButton
            title="Publier"
            onPress={() => navigation.navigate("Publication")}
            style={{ width: 150, height: 37, alignSelf: "center" }}
            color={Colors.gold}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  titre: {
    fontSize: 20,
    color: Colors.gold,
    marginBottom: 15,
  },
  animation: {
    height: "100%",
    width: "100%",
  },
})
