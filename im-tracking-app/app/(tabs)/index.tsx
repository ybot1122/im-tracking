import { StyleSheet } from "react-native";
import { useMemo } from "react";
import ParallaxScrollView from "@/components/structure/ParallaxScrollView";
import MacrosOverview from "@/components/MacrosOverview";
import DayPicker from "@/components/DayPicker";
import MealManager from "@/components/MealManager";
import { useMeals } from "../_layout";

// Helper function to create a date key for storage
function getDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function HomeScreen() {
  const {
    mealsByDate,
    currentDate,
    setCurrentDate,
    handleAddMeal,
    handleDeleteMeal,
    handleUpdateMeal,
  } = useMeals();

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

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

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
