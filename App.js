import "react-native-gesture-handler"
import React, { useState } from "react"
import AppScreen from "./app/components/AppScreen"
import AppNavigation from "./navigation/AppNavigation"
import CheckInternet from "./app/util/CheckInternet"
import AuthContext from "./app/screens/authentification/AuthContext"
import UpdateAccountInfos from "./app/screens/forms/UpdateAccountInfos"

export default function App() {
  const [user, setUser] = useState()
  return (
    <AppScreen>
      <AuthContext.Provider value={{ user, setUser }}>
        <CheckInternet />
        <AppNavigation />
        {/* <UpdateAccountInfos/> */}
      </AuthContext.Provider>
    </AppScreen>
  )
}
