import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"

// creer ou enregistrer notre data dans le local-storage
const store = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    }
    await AsyncStorage.setItem(key, JSON.stringify(item))
    console.log("item saved in the cache")
  } catch (e) {
    console.log(e)
  }
}
// verifier si la data ne dépasse pas les 5 minutes lors de son enregistrement dans le  "local-Storage"
const isItemExpired = (item) => {
  const currentTime = moment(Date.now())
  const storedItemTime = moment(item.timestamp)
  return currentTime.diff(storedItemTime, "minutes") > 5
}

// lire la data enregistré dans le local-storage
const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    const item = JSON.parse(value)
    if (!value){
      console.log('no item found');
       return null
    }

    if (isItemExpired(item)) {
      await AsyncStorage.removeItem(key)
      console.log("item has expired")
      return null
    }
    return item.value
  } catch (e) {
    console.log(e)
  }
}
export default {
  store,
  getItem,
}
