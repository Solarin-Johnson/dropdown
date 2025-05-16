import { Pressable, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { ThemedText } from "./ThemedText";
import {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ChevronDown } from "lucide-react-native";
import { SPRING_CONFIG, SPRING_CONFIG_BOUNCE } from "@/constants";
import { Transaction, TRANSACTIONS } from "@/constants/data";

const HEIGHT = 84;
const CARD_GAP = 6;
const CARD_HEIGHT = HEIGHT - CARD_GAP * 2;
const STACK_OFFSET = CARD_GAP * 1.5;
const STOP_INDEX = 2;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const createOnLayout =
  (
    ref: ReturnType<typeof useAnimatedRef<View>>,
    layoutValue: SharedValue<any | null>
  ) =>
  () => {
    "worklet";
    runOnUI(() => {
      const layout = measure(ref);
      if (layout) layoutValue.value = layout;
    })();
  };

export default function DropDown() {
  const collapsed = useSharedValue<boolean>(false);

  return (
    <View>
      <Header collapsed={collapsed} />
      <View>
        {TRANSACTIONS.map((tx, i) => (
          <StackCard key={tx.id} collapsed={collapsed} tx={tx} index={i} />
        ))}
      </View>
    </View>
  );
}

const Header = ({ collapsed }: { collapsed: SharedValue<boolean> }) => {
  const barColor = useThemeColor({}, "barColor");
  const text = useThemeColor({}, "text");
  const btn1Ref = useAnimatedRef<View>();
  const btn2Ref = useAnimatedRef<View>();
  const btn1Layout = useSharedValue({ width: 0 });
  const btn2Layout = useSharedValue({ width: 0 });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const targetLayout = collapsed.value ? btn2Layout.value : btn1Layout.value;
    return {
      width: withSpring((targetLayout?.width ?? 0) + 42, SPRING_CONFIG),
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
        height: 54,
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
        <Animated.View
          style={[styles.textContainer, expandAnimatedStyle]}
          ref={btn1Ref}
          onLayout={createOnLayout(btn1Ref, btn1Layout)}
        >
          <ThemedText style={styles.text}>Fold Up</ThemedText>
        </Animated.View>
        <Animated.View
          style={[styles.textContainer, collapseAnimatedStyle]}
          ref={btn2Ref}
          onLayout={createOnLayout(btn2Ref, btn2Layout)}
        >
          <ThemedText style={styles.text}>Spread Out</ThemedText>
        </Animated.View>
      </AnimatedPressable>
    </View>
  );
};

const StackCard = ({
  collapsed,
  tx,
  index,
}: {
  collapsed: SharedValue<boolean>;
  index: number;
  tx: Transaction;
}) => {
  const { id, icon, color, title, category, type, amount, date } = tx;

  const textColor = useThemeColor({}, "text");
  const barColor = useThemeColor({}, "barColor");
  const fadedTextColor = useMemo(() => textColor + "80", [textColor]);

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);

  const offset = useDerivedValue(() => Math.min(index, STOP_INDEX));

  const animatedStyle = useAnimatedStyle(() => {
    const factor = collapsed.value ? offset.value : 0;

    return {
      transform: [
        {
          translateY: withSpring(
            collapsed.value ? -HEIGHT * index + factor * STACK_OFFSET : 0,
            SPRING_CONFIG_BOUNCE
          ),
        },
        {
          scale: withSpring(
            collapsed.value ? 1 - factor * 0.05 : 1,
            SPRING_CONFIG_BOUNCE
          ),
        },
      ],
      opacity: withSpring(
        collapsed.value && index > STOP_INDEX ? 0 : 1,
        SPRING_CONFIG_BOUNCE
      ),
    };
  });

  const innerAnimatedStyle = useAnimatedStyle(() => {
    const factor = collapsed.value ? offset.value : 0;

    return {
      opacity: withSpring(
        collapsed.value ? 1 - factor * 0.5 : 1,
        SPRING_CONFIG_BOUNCE
      ),
    };
  });

  return (
    <Animated.View
      key={id}
      style={[
        styles.cardContainer,
        { backgroundColor: barColor, zIndex: -index },
        animatedStyle,
      ]}
    >
      <Animated.View style={[styles.innerContainer, innerAnimatedStyle]}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          {/* <ThemedText>{icon}</ThemedText> */}
        </View>
        <View style={styles.cardContent}>
          <ThemedText style={{ color: textColor }} type="defaultSemiBold">
            {title}
          </ThemedText>
          <ThemedText style={[styles.cardCategory, { color: fadedTextColor }]}>
            {category}
          </ThemedText>
        </View>
        <View style={styles.amountContainer}>
          <ThemedText
            style={[
              styles.cardAmount,
              { color: type === "credit" ? "#2ecc71" : "#e74c3c" },
            ]}
            type="defaultSemiBold"
          >
            {formattedAmount}
          </ThemedText>
          <ThemedText style={[styles.cardDate, { color: fadedTextColor }]}>
            {date}
          </ThemedText>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#80808060",
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
  cardContainer: {
    borderRadius: 16,
    marginVertical: CARD_GAP,
    height: CARD_HEIGHT,
    boxShadow: "0 10px 12px -10px #00000010",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  iconContainer: {
    width: CARD_HEIGHT - 24,
    aspectRatio: 1,
    borderRadius: HEIGHT / 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardCategory: {
    fontSize: 13,
    marginTop: 2,
  },
  amountContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: 70,
  },
  cardAmount: {
    fontSize: 15,
  },
  cardDate: {
    fontSize: 12,
    marginTop: 2,
  },
});
