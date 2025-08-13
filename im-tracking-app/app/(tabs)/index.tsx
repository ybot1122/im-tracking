import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/structure/ParallaxScrollView";
import MacrosOverview from "@/components/MacrosOverview";
import DayPicker from "@/components/DayPicker";

export default function HomeScreen() {
  return (
    <ParallaxScrollView>
      <DayPicker />
      <MacrosOverview />
    </ParallaxScrollView>
  );
}
