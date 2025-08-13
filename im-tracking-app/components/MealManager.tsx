import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./structure/ThemedView";
import { ThemedText } from "./structure/ThemedText";
import Meal from "./Meal";
import FoodSelectionModal from "./FoodSelectionModal";
import { FoodItem } from "@/data/foods";

export interface Meal {
  id: string;
  name: string;
  foods: FoodItem[];
}

interface MealManagerProps {
  meals: Meal[];
  onAddMeal: () => void;
  onDeleteMeal: (mealId: string) => void;
  onUpdateMeal: (mealId: string, updatedMeal: Meal) => void;
}

export function MealManager({
  meals,
  onAddMeal,
  onDeleteMeal,
  onUpdateMeal,
}: MealManagerProps) {
  const [isFoodModalVisible, setIsFoodModalVisible] = useState(false);
  const [currentMealId, setCurrentMealId] = useState<string | null>(null);

  const handleLogFood = (mealId: string) => {
    setCurrentMealId(mealId);
    setIsFoodModalVisible(true);
  };

  const handleFoodSelect = (food: FoodItem) => {
    if (currentMealId) {
      const currentMeal = meals.find((meal) => meal.id === currentMealId);
      if (currentMeal) {
        const updatedMeal = {
          ...currentMeal,
          foods: [...currentMeal.foods, food],
        };
        onUpdateMeal(currentMealId, updatedMeal);
      }
    }
    setIsFoodModalVisible(false);
    setCurrentMealId(null);
  };

  const handleCloseModal = () => {
    setIsFoodModalVisible(false);
    setCurrentMealId(null);
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
            <Meal key={meal.id} mealName={meal.name} foods={meal.foods}>
              <TouchableOpacity
                onPress={() => onDeleteMeal(meal.id)}
                style={styles.deleteButton}
                accessibilityLabel={`Delete ${meal.name}`}
              >
                <ThemedText style={styles.deleteButtonText}>×</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleLogFood(meal.id)}
                style={styles.logFoodButton}
                accessibilityLabel={`Log food for ${meal.name}`}
              >
                <ThemedText style={styles.logFoodButtonText}>
                  Log Food
                </ThemedText>
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
      <FoodSelectionModal
        isVisible={isFoodModalVisible}
        onRequestClose={handleCloseModal}
        onFoodSelect={handleFoodSelect}
      />
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
  logFoodButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  logFoodButtonText: {
    fontSize: 14,
    fontWeight: "600",
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
});

export default MealManager;
