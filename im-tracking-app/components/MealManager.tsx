import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import { ThemedView } from "./structure/ThemedView";
import { ThemedText } from "./structure/ThemedText";
import Meal from "./Meal";

export interface Meal {
  id: string;
  name: string;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  category: string;
}

interface MealManagerProps {
  meals: Meal[];
  onAddMeal: () => void;
  onDeleteMeal: (mealId: string) => void;
  onLogFood?: (foodItem: FoodItem) => void;
}

export function MealManager({
  meals,
  onAddMeal,
  onDeleteMeal,
  onLogFood,
}: MealManagerProps) {
  const [isFoodModalVisible, setIsFoodModalVisible] = useState(false);

  // Sample food items - in a real app, this would come from an API or database
  const foodItems: FoodItem[] = [
    { id: "1", name: "Apple", calories: 95, category: "Fruits" },
    { id: "2", name: "Banana", calories: 105, category: "Fruits" },
    { id: "3", name: "Chicken Breast", calories: 165, category: "Protein" },
    { id: "4", name: "Brown Rice", calories: 110, category: "Grains" },
    { id: "5", name: "Broccoli", calories: 55, category: "Vegetables" },
    { id: "6", name: "Salmon", calories: 208, category: "Protein" },
    { id: "7", name: "Sweet Potato", calories: 103, category: "Vegetables" },
    { id: "8", name: "Greek Yogurt", calories: 130, category: "Dairy" },
  ];

  const handleLogFood = (foodItem: FoodItem) => {
    if (onLogFood) {
      onLogFood(foodItem);
    }
    setIsFoodModalVisible(false);
  };

  return (
    <ThemedView style={styles.container}>
      {meals.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <ThemedText style={styles.emptyStateText}>
            No meals added yet
          </ThemedText>
        </ThemedView>
      ) : (
        <ThemedView style={styles.mealsList}>
          {meals.map((meal) => (
            <Meal mealName={meal.name}>
              {" "}
              <TouchableOpacity
                onPress={() => onDeleteMeal(meal.id)}
                style={styles.deleteButton}
                accessibilityLabel={`Delete ${meal.name}`}
              >
                <ThemedText style={styles.deleteButtonText}>×</ThemedText>
              </TouchableOpacity>
            </Meal>
          ))}
        </ThemedView>
      )}

      {/* Log Food Button at the bottom */}
      <TouchableOpacity
        onPress={onAddMeal}
        accessibilityLabel="Add new meal"
        style={styles.addMealButton}
      >
        <ThemedText style={styles.addMealButtonText}>Add Meal</ThemedText>
      </TouchableOpacity>

      {/* Food Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFoodModalVisible}
        onRequestClose={() => setIsFoodModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsFoodModalVisible(false)}
        >
          <ThemedView style={styles.modalContent}>
            <ThemedView style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>
                Choose Food Item
              </ThemedText>
              <TouchableOpacity
                onPress={() => setIsFoodModalVisible(false)}
                style={styles.closeButton}
              >
                <ThemedText style={styles.closeButtonText}>×</ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <ScrollView
              style={styles.foodList}
              showsVerticalScrollIndicator={false}
            >
              {foodItems.map((foodItem) => (
                <TouchableOpacity
                  key={foodItem.id}
                  style={styles.foodItem}
                  onPress={() => handleLogFood(foodItem)}
                >
                  <ThemedView style={styles.foodItemInfo}>
                    <ThemedText style={styles.foodItemName}>
                      {foodItem.name}
                    </ThemedText>
                    <ThemedText style={styles.foodItemCategory}>
                      {foodItem.category}
                    </ThemedText>
                  </ThemedView>
                  <ThemedText style={styles.foodItemCalories}>
                    {foodItem.calories} cal
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </ThemedView>
        </Pressable>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "transparent",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
  mealsList: {
    gap: 12,
    flex: 1,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#dc3545",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  addMealButton: {
    backgroundColor: "#28a745",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addMealButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 0,
    width: "90%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
  },
  foodList: {
    padding: 20,
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  foodItemInfo: {
    flex: 1,
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  foodItemCategory: {
    fontSize: 14,
    color: "#666",
  },
  foodItemCalories: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
});

export default MealManager;
