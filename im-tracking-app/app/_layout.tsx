import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Meal } from "@/components/MealManager";

// Helper function to create a date key for storage
function getDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

interface MealsContextType {
  mealsByDate: Record<string, Meal[]>;
  setMealsByDate: React.Dispatch<React.SetStateAction<Record<string, Meal[]>>>;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  handleAddMeal: () => void;
  handleDeleteMeal: (mealId: string) => void;
  handleUpdateMeal: (mealId: string, updatedMeal: Meal) => void;
}

const MealsContext = createContext<MealsContextType | undefined>(undefined);

export function useMeals() {
  const ctx = useContext(MealsContext);
  if (!ctx) throw new Error("useMeals must be used within a MealsProvider");
  return ctx;
}

function MealsProvider({ children }: { children: React.ReactNode }) {
  const [mealsByDate, setMealsByDate] = useState<Record<string, Meal[]>>({});
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  });

  const currentDateKey = getDateKey(currentDate);
  const currentMeals = mealsByDate[currentDateKey] || [];

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

  const value = useMemo(
    () => ({
      mealsByDate,
      setMealsByDate,
      currentDate,
      setCurrentDate,
      handleAddMeal,
      handleDeleteMeal,
      handleUpdateMeal,
    }),
    [
      mealsByDate,
      currentDate,
      handleAddMeal,
      handleDeleteMeal,
      handleUpdateMeal,
    ]
  );

  return (
    <MealsContext.Provider value={value}>{children}</MealsContext.Provider>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <MealsProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </MealsProvider>
  );
}
