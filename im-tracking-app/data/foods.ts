export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  sodium: number;
  protein: number;
}

// Sample food items - in a real app, this would come from an API or database
export const foodItems: FoodItem[] = [
  { id: "1", name: "Apple", calories: 95, sodium: 2, protein: 0.5 },
  { id: "2", name: "Banana", calories: 105, sodium: 1, protein: 1.3 },
  { id: "3", name: "Chicken Breast", calories: 165, sodium: 74, protein: 31 },
  { id: "4", name: "Brown Rice", calories: 110, sodium: 5, protein: 2.5 },
  { id: "5", name: "Broccoli", calories: 55, sodium: 33, protein: 3.7 },
  { id: "6", name: "Salmon", calories: 208, sodium: 59, protein: 25 },
  { id: "7", name: "Sweet Potato", calories: 103, sodium: 41, protein: 2 },
  { id: "8", name: "Greek Yogurt", calories: 130, sodium: 36, protein: 23 },
];
