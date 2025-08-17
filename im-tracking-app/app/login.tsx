import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/structure/ThemedText";
import { ThemedView } from "@/components/structure/ThemedView";
import { Link, Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    setIsAuthenticated(true);
    router.replace("/");
  };

  return (
    <>
      <Stack.Screen options={{ title: "Login" }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Login
        </ThemedText>
        <ThemedText style={styles.subtitle}>(UI only placeholder)</ThemedText>
        <ThemedText
          type="link"
          style={styles.loginButton}
          onPress={handleLogin}
        >
          Login
        </ThemedText>
        <Link href="/launch" style={styles.backButton}>
          <ThemedText type="link">Back</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
  },
  backButton: {
    marginTop: 16,
  },
  loginButton: {
    marginBottom: 16,
  },
});
