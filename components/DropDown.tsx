import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ChevronDown } from "lucide-react-native";
import { SPRING_CONFIG } from "@/constants";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function DropDown() {
  const collapsed = useSharedValue<boolean>(false);

  return (
    <View>
      <Header collapsed={collapsed} />
    </View>
  );
}

const Header = ({ collapsed }: { collapsed: SharedValue<boolean> }) => {
  const barColor = useThemeColor({}, "barColor");
  const text = useThemeColor({}, "text");

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(collapsed.value ? 90 : 102, SPRING_CONFIG),
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(
            collapsed.value ? "-90deg" : "0deg",
            SPRING_CONFIG
          ),
        },
      ],
    };
  });

  const expandAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(collapsed.value ? 0 : 1, SPRING_CONFIG),
    };
  });

  const collapseAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(collapsed.value ? 1 : 0, SPRING_CONFIG),
    };
  });

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ThemedText type="title">Transactions</ThemedText>
      <AnimatedPressable
        style={[
          {
            backgroundColor: barColor + "90",
          },
          styles.button,
          buttonAnimatedStyle,
        ]}
        onPress={() => (collapsed.value = !collapsed.value)}
      >
        <Animated.View
          style={[{ alignSelf: "flex-end", marginTop: 1 }, iconAnimatedStyle]}
        >
          <ChevronDown color={text} strokeWidth={1.8} size={20} />
        </Animated.View>
        <Animated.View style={[styles.textContainer, expandAnimatedStyle]}>
          <ThemedText style={styles.text}>Collapse</ThemedText>
        </Animated.View>
        <Animated.View style={[styles.textContainer, collapseAnimatedStyle]}>
          <ThemedText style={styles.text}>Expand</ThemedText>
        </Animated.View>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#80808090",
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    paddingHorizontal: 5,
  },

  textContainer: {
    position: "absolute",
    left: 12,
  },
  text: {
    fontSize: 14,
  },
});
