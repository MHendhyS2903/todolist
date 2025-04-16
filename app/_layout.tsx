import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./src/store/index";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "white" },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="task" />
        </Stack>
      </Provider>
    </SafeAreaProvider>
  );
}
