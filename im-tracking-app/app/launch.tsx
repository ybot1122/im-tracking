import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { ThemedText } from "@/components/structure/ThemedText";
import { ThemedView } from "@/components/structure/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import Spinner from "@/components/ui/Spinner";

export default function LaunchScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  const handleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setIsAuthenticated("authed");
      setLoading(false);
      router.replace("/");
    }, 1000);
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("../assets/images/splash-icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <ThemedText type="title" style={styles.title}>
        I'm Tracking
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Please login or create an account to continue.
      </ThemedText>
      <View style={styles.buttonContainer}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <ThemedText type="link" style={styles.button} onPress={handleAuth}>
              Login
            </ThemedText>
            <ThemedText type="link" style={styles.button} onPress={handleAuth}>
              Create Account
            </ThemedText>
          </>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
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
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
  },
  button: {
    backgroundColor: "#0a7ea4",
    color: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
  },
});
