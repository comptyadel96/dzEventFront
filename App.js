import "react-native-gesture-handler"
import React, { useState, useContext } from "react"
import AppScreen from "./app/components/AppScreen"
import AppNavigation from "./navigation/AppNavigation"
import RegisterForm from "./app/screens/forms/RegisterForm"
import Test from "./Test"
import CheckInternet from "./app/util/CheckInternet"
import AuthContext from "./app/screens/authentification/AuthContext"

export default function App() {
  const [user, setUser] = useState()
  return (
    <AppScreen>
      <AuthContext.Provider value={{user,setUser}}>
        <CheckInternet />
        {/* <RegisterForm /> */}
        <AppNavigation/>
      </AuthContext.Provider>
    </AppScreen>
  )
}
