import * as SecureStore from "expo-secure-store"
import jwtDecode from "jwt-decode"
const key = "x-auth-token"

const storeToken = async (authToken) => {
  try {
    const token = await SecureStore.setItemAsync(key, authToken)
    return token
  } catch (e) {
    console.log("erreure lors de l'initialisation du authToken", e)
  }
}

const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(key)
    return token
  } catch (e) {
    console.log("erreure lors de la récupération du authToken", e)
  }
}
const setUser = async () => {
  try {
    const token = await getToken()
    return token ? jwtDecode(token) : null
  } catch (e) {
    console.log(e)
  }
}
const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key)
  } catch (e) {
    console.log("erreure lors de la supression du authToken", e)
  }
}
export default { storeToken, setUser, deleteToken, getToken }
