import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import EventDetailScreen from "../app/screens/DetailScreens/EventDetailScreen"
import EventPublicationsScreen from "../app/screens/Mypublication/EventPublicationsScreen"
import WelcomeScreen from "../app/screens/WelcomeScreen"
import FirstTimeDetailScreen from "../app/screens/DetailScreens/FirstTimeDetailScreen"
import FirstTimePublicationsScreen from "../app/screens/Mypublication/FirstTimePublicationsScreen"
import StorePublicationScreen from "../app/screens/Mypublication/StorePublicationScreen"
import StoreDetailScreen from "../app/screens/DetailScreens/StoreDetailScreen"
import ViewStoreImages from "../app/screens/ViewStoreImages"
import AccountScreen from "../app/screens/AccountScreen"
import NavigationTheme from "./NavigationTheme"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Colors from "../app/assets/Colors"
import Publier from "../app/screens/Publier"
import EventForm from "../app/screens/forms/EventForm"
import StoreForm from "../app/screens/forms/StoreForm"
import RegisterForm from "../app/screens/forms/RegisterForm"
import FirstTimeForm from "../app/screens/forms/FirstTimeForm"
import Calendars from "../app/screens/Calendars"
import RegisterOrLogin from "../app/screens/authentification/RegisterOrLogin"
import ClientEventsPubli from "../app/screens/Client/ClientEventsPubli"
import UpdateAccountInfos from "../app/screens/forms/UpdateAccountInfos"
import ClientStorePubli from "../app/screens/Client/ClientStorePubli"
import RegisterCongratuation from "../app/screens/RegisterCongratuation"
import ClientFirstPubli from "../app/screens/Client/ClientFirstPubli"
import PutEvent from "../app/screens/modifyPublications/PutEvent"
import PutStore from "../app/screens/modifyPublications/PutStore"
import PutFirstTime from "../app/screens/modifyPublications/PutFirstTime"

export default function AppNavigation() {
  const { Navigator, Screen } = createStackNavigator()
  const tab = createBottomTabNavigator()
  // tab navigator
  const tabNavigator = () => (
    <tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 15 },
        activeBackgroundColor: Colors.primary,
        activeTintColor: Colors.white,
        inactiveBackgroundColor: Colors.white,
        inactiveTintColor: Colors.primary,
      }}>
      <tab.Screen
        name="Acceuil"
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <tab.Screen
        name="Publier"
        component={Publier}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-plus"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <tab.Screen
        name="Profile"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </tab.Navigator>
  )
  // stack navigator
  return (
    <NavigationContainer theme={NavigationTheme}>
      <Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FF7B6D",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 20,
            textAlign: "left",
          },
        }}>
        <Screen
          name="WelcomeScreen"
          component={tabNavigator}
          options={{ headerShown: false }}
        />
        <Screen
          name="AllEvents"
          component={EventPublicationsScreen}
          options={{ title: "Tous les événements", headerShown: false }}
        />
        <Screen
          name="Calendar"
          component={Calendars}
          options={{ headerShown: false }}
        />
        <Screen
          name="EventDetails"
          component={EventDetailScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name="FirstPublications"
          component={FirstTimePublicationsScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name="FirstDetailsPublications"
          component={FirstTimeDetailScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name="AllArticles"
          component={StorePublicationScreen}
          options={{ title: "Store", headerShown: false }}
        />
        <Screen
          name="DetailsArticles"
          component={StoreDetailScreen}
          options={{ title: "details d'article", headerShown: false }}
        />
        <Screen
          name="ViewStoreImages"
          component={ViewStoreImages}
          options={{ headerShown: false }}
        />
        <Screen
          name="ClientEventsPubli"
          component={ClientEventsPubli}
          options={{ headerShown: false }}
        />
        <Screen
          name="ClientStorePubli"
          component={ClientStorePubli}
          options={{ headerShown: false }}
        />
        <Screen
          name="RegisterCongrat"
          component={RegisterCongratuation}
          options={{ headerShown: false }}
        />
        <Screen
          name="Account"
          component={AccountScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name="Publication"
          component={Publier}
          options={{ headerShown: false }}
        />
        <Screen
          name="ClientFirstPubli"
          component={ClientFirstPubli}
          options={{ headerShown: false }}
        />
        {/* forms */}
        <Screen
          name="RegisterForm"
          component={RegisterForm}
          options={{ headerShown: false }}
        />

        <Screen
          name="StoreForm"
          component={StoreForm}
          options={{ headerShown: false }}
        />
        <Screen
          name="EventForm"
          component={EventForm}
          options={{ headerShown: false }}
        />
        <Screen
          name="FirstTimeForm"
          component={FirstTimeForm}
          options={{ headerShown: false }}
        />
        <Screen
          name="RegisterOrLogin"
          component={RegisterOrLogin}
          options={{ headerShown: false }}
        />
        <Screen
          name="UpdateAccountInfos"
          component={UpdateAccountInfos}
          options={{ headerShown: false }}
        />
        <Screen
          name="PutEvents"
          component={PutEvent}
          options={{ headerShown: false }}
        />
        <Screen
          name="PutStore"
          component={PutStore}
          options={{ headerShown: false }}
        />
        <Screen name="PutFirstTime" 
         component={PutFirstTime}
         options={{ headerShown: false }}
        />
      </Navigator>
    </NavigationContainer>
  )
}
