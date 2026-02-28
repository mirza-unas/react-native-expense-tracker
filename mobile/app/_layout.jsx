import { Slot } from "expo-router";
import { tokenCache } from '@clerk/clerk-expo/token-cache'

import React from "react";
import SafeScreen from '@/components/SafeScreen'
import { ClerkProvider } from '@clerk/clerk-expo'

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
  <SafeScreen >
    <Slot screenOptions={{headerShown: false}} />
  </SafeScreen>
  </ClerkProvider>
)
}
