import { StyleSheet } from "react-native";
import { useState, useCallback, useMemo } from "react";
import ParallaxScrollView from "@/components/structure/ParallaxScrollView";
import MacrosOverview from "@/components/MacrosOverview";
import DayPicker from "@/components/DayPicker";
import MealManager, { Meal } from "@/components/MealManager";

// Helper function to create a date key for storage
function getDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function HomeScreen() {
  const [mealsByDate, setMealsByDate] = useState<Record<string, Meal[]>>({});
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  });

  const currentDateKey = getDateKey(currentDate);
  const currentMeals = mealsByDate[currentDateKey] || [];

  // Calculate macros from current day's food items
  const dailyMacros = useMemo(() => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalSodium = 0;

    currentMeals.forEach((meal) => {
      meal.foods.forEach((food) => {
        const servings = food.servings || 1;
        totalCalories += food.calories * servings;
        totalProtein += food.protein * servings;
        totalSodium += food.sodium * servings;
      });
    });

    return {
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein * 10) / 10, // Round to 1 decimal place
      sodium: Math.round(totalSodium),
    };
  }, [currentMeals]);

  const handleDateChange = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);

  const handleAddMeal = useCallback(() => {
    const newMeal: Meal = {
      id: Date.now().toString(),
      name: `Meal ${currentMeals.length + 1}`,
      foods: [],
    };

    setMealsByDate((prev) => ({
      ...prev,
      [currentDateKey]: [...currentMeals, newMeal],
    }));
  }, [currentMeals, currentDateKey]);

  const handleDeleteMeal = useCallback(
    (mealId: string) => {
      setMealsByDate((prev) => {
        const updatedMeals =
          prev[currentDateKey]?.filter((meal) => meal.id !== mealId) || [];

        // Renumber the remaining meals
        const renumberedMeals = updatedMeals.map((meal, index) => ({
          ...meal,
          name: `Meal ${index + 1}`,
        }));

        return {
          ...prev,
          [currentDateKey]: renumberedMeals,
        };
      });
    },
    [currentDateKey]
  );

  const handleUpdateMeal = useCallback(
    (mealId: string, updatedMeal: Meal) => {
      setMealsByDate((prev) => {
        const currentMeals = prev[currentDateKey] || [];
        const updatedMeals = currentMeals.map((meal) =>
          meal.id === mealId ? updatedMeal : meal
        );

        return {
          ...prev,
          [currentDateKey]: updatedMeals,
        };
      });
    },
    [currentDateKey]
  );

  return (
    <ParallaxScrollView>
      <DayPicker onDateChange={handleDateChange} />
      <MacrosOverview
        calories={dailyMacros.calories}
        protein={dailyMacros.protein}
        sodium={dailyMacros.sodium}
      />
      <MealManager
        meals={currentMeals}
        onAddMeal={handleAddMeal}
        onDeleteMeal={handleDeleteMeal}
        onUpdateMeal={handleUpdateMeal}
      />
    </ParallaxScrollView>
  );
}
