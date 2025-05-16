import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DropDown from "@/components/DropDown";

export default function Index() {
  const barColor = useThemeColor({}, "barColor");
  const { top, bottom } = useSafeAreaInsets();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: top + 16,
          paddingBottom: bottom + 16,
          paddingHorizontal: 16,
          gap: 16,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 400,
            backgroundColor: barColor,
            borderRadius: 12,
          }}
        />
        <DropDown />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
