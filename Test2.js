import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"



export default function Test2() {
  const [events,setEvents]=useState([])

  const fetchEvent = async () => {
    try {
      const result = await fetch(
        `http://192.168.1.38:3900/dzevents/v1/posts`
      )
      const event = await result.json()
      setEvents(event)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchEvent()
  }, [])
// const eventsCalendar=events.map(events=>(
//   {start:events.dateDebut,
//   end:events.dateFin,
//   title:events.titre
//   }
// ))
// console.log(eventsCalendar);

  return (
    <View>
     
    </View>
  )
}

const styles = StyleSheet.create({})
