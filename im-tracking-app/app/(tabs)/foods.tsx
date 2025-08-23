import { StyleSheet, FlatList, View, TextInput } from "react-native";
import { useState } from "react";
import { ThemedText } from "@/components/structure/ThemedText";
import { ThemedView } from "@/components/structure/ThemedView";
import { foodItems } from "@/data/foods";

// ...existing code...

export default function TabTwoScreen() {
  const [search, setSearch] = useState("");
  const filteredFoods = foodItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Food Items
      </ThemedText>
      <TextInput
        style={styles.searchInput}
        placeholder="Search foods..."
        value={search}
        onChangeText={setSearch}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
            <ThemedText>{item.brand}</ThemedText>
            <ThemedText>
              Calories: {item.calories} | Protein: {item.protein}g | Sodium:{" "}
              {item.sodium}mg
            </ThemedText>
            <ThemedText>
              Serving: {item.servingSize.value} {item.servingSize.unit}
            </ThemedText>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>No foods found.</ThemedText>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 24,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 32,
    fontSize: 16,
  },
});
