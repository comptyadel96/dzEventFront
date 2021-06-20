import "react-native-gesture-handler"
import React, { useState } from "react"
import AppScreen from "./app/components/AppScreen"
import AppNavigation from "./navigation/AppNavigation"
import CheckInternet from "./app/util/CheckInternet"
import AuthContext from "./app/screens/authentification/AuthContext"
import AppLoading from "expo-app-loading"
import AuthStorage from "./app/screens/authentification/AuthStorage"
import axios from "axios"
import Test from "./Test"


export default function App() {
  const [user, setUser] = useState()
  const [isAppReady, setIsAppReady] = useState(false)

  const storeAuthToken = async () => {
    try {
      const userInfo = await AuthStorage.setUser()
      if (userInfo) setUser(userInfo)

      axios.defaults.headers.common["x-auth-token"] =
        await AuthStorage.getToken()
    } catch (e) {
      console.log(e)
    }
  }
  if (!isAppReady)
    return (
      <AppLoading
        startAsync={storeAuthToken}
        onFinish={() => setIsAppReady(true)}
        onError={console.warn}
      />
    )
  return (
    <AppScreen>
      <AuthContext.Provider value={{ user, setUser }}>
        <CheckInternet />
        <AppNavigation />
      </AuthContext.Provider>
      {/* <Test/> */}
    </AppScreen>
  )
}
