import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="rfid-scan" options={{ headerShown: false }} />
      <Stack.Screen name="otp-verification" options={{ headerShown: false }} />
      <Stack.Screen name="owner-dashboard" options={{ headerShown: false }} />
      <Stack.Screen
        name="inventory-overview"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="add-inventory" options={{ headerShown: false }} />
      <Stack.Screen name="generate-report" options={{ headerShown: false }} />
      <Stack.Screen name="expire-report" options={{ headerShown: false }} />
      <Stack.Screen name="product-report" options={{ headerShown: false }} />
      <Stack.Screen
        name="report-print-success"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
