export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  category: string;
}

// Sample food items - in a real app, this would come from an API or database
export const foodItems: FoodItem[] = [
  { id: "1", name: "Apple", calories: 95, category: "Fruits" },
  { id: "2", name: "Banana", calories: 105, category: "Fruits" },
  { id: "3", name: "Chicken Breast", calories: 165, category: "Protein" },
  { id: "4", name: "Brown Rice", calories: 110, category: "Grains" },
  { id: "5", name: "Broccoli", calories: 55, category: "Vegetables" },
  { id: "6", name: "Salmon", calories: 208, category: "Protein" },
  { id: "7", name: "Sweet Potato", calories: 103, category: "Vegetables" },
  { id: "8", name: "Greek Yogurt", calories: 130, category: "Dairy" },
];
