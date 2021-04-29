import React from "react"
import LottieView from "lottie-react-native"
export default function LoadingAnim({ visible = false,source }) {
  if (!visible) return null
  return (
    <LottieView
      loop
      autoPlay
      source={source}
    />
  )
}
