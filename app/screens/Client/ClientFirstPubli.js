import axios from "axios"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import BaseUrl from "../../assets/BaseUrl"
import Colors from "../../assets/Colors"
import AppText from "../../components/AppText"
import FirstTimeCard from "../../components/Cards/FirstTimeCard"

export default function ClientFirstPubli({ navigation }) {
  const [firstTime, setFirstTime] = useState()

  const getUserFirst = async () => {
    try {
      const first = await axios.get(
        `${BaseUrl}/dzevents/v1/firsttime/me/firstevent`
      )
      setFirstTime(first.data)
      console.log(first.data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getUserFirst()
  }, [])
  return (
    <View style={styles.container}>
      <AppText style={styles.titre}> Ma premiére fois </AppText>
      {firstTime && (
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
              photo:firstTime.photo
            })
          }}
        />
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
    marginBottom:15
  },
})
