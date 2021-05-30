import React, { useState, useEffect, useContext } from "react"
import { StyleSheet, Text, View, Image, ScrollView } from "react-native"
import AppScreen from "../../components/AppScreen"
import AppText from "../../components/AppText"
import moment from "moment"
import momentConfig from "../../config-momentJs/MomentJs"
import BaseUrl from "../../assets/BaseUrl"
import Colors from "../../assets/Colors"
import AuthContext from "../authentification/AuthContext"
import AppButton from "../../components/AppButton"

export default function FirstTimeDetailScreen({ route }) {
  const authContext = useContext(AuthContext)
  const { _id, owner, photo } = route.params
  const [firstTime, setFirstTime] = useState([])
  const fetchFirstTimes = async () => {
    try {
      const result = await fetch(`${BaseUrl}/dzevents/v1/firsttime/${_id}`)
      const first = await result.json()
      setFirstTime(first)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchFirstTimes()
    // console.log(authContext.user)
  }, [])

  return (
    <AppScreen style={styles.container}>
      {photo ? (
        <Image source={{ uri: `${firstTime.photo}` }} style={styles.photo} />
      ) : (
        <Image
          source={require("../../assets/firstDefaultImage.png")}
          style={styles.photo}
        />
      )}
      <AppText style={styles.titre} numberOfLines={2} ellipsizeMode="tail">
        {firstTime.titre}
      </AppText>
      <ScrollView>
        <View style={styles.textContainer}>
          {firstTime.description && (
            <>
              <AppText style={styles.text}>Description</AppText>
              <Text style={styles.subText}>{firstTime.description}</Text>
            </>
          )}
          <AppText style={styles.text}>
            wilaya <Text style={styles.subText}>{firstTime.wilaya}</Text>
          </AppText>
          <AppText style={styles.text}>
            Adresse <Text style={styles.subText}>{firstTime.adresse}</Text>
          </AppText>
          <AppText style={styles.text}>
            Par <Text style={styles.subText}>{owner.name}</Text>
          </AppText>

          <AppText style={styles.text}>
            Tél <Text style={styles.subText}>{owner.phoneNumber}</Text>
          </AppText>
          <AppText style={styles.subText}>
            il ya {moment(firstTime.createdAt).fromNow(true)}
          </AppText>
        </View>
        {authContext.user && authContext.user._id === owner._id && (
          <AppButton
            title="Modifier la publication"
            style={styles.modifyButton}
            color={Colors.gold}
          />
        )}
      </ScrollView>
    </AppScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  photo: {
    width: "100%",
    height: 370,
    marginBottom: 15,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 15,
  },
  titre: {
    fontSize: 30,
    color: Colors.gold,
    alignSelf: "center",
  },
  text: {
    fontWeight: "600",
    color: "coral",
    fontSize: 20,
  },
  subText: {
    color: "grey",
    fontSize: 18,
  },
  modifyButton: {
    height: 40,
    width: 200,
    alignSelf: "center",
  },
})
