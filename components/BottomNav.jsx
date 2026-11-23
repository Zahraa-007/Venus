import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../theme";

const items = [
  {
    name: "Opportunities",
    label: "الفرص",
    icon: "lightbulb-outline",
  },
  {
    name: "Activities",
    label: "النشاطات",
    icon: "clipboard-list-outline",
  },
  {
    name: "Home",
    label: "الرئيسية",
    icon: "home-variant",
  },
  {
    name: "Saved",
    label: "المحفوظات",
    icon: "bookmark-outline",
  },
  {
    name: "Profile",
    label: "حسابي",
    icon: "account-outline",
  },
];

const BottomNav = ({ active = "Home", onNavigate }) => {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = active === item.name;

        return (
          <TouchableOpacity
            key={item.name}
            style={styles.navItem}
            onPress={() => onNavigate?.(item.name)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={25}
              color={isActive ? theme.colors.secondary : "#FFFFFF"}
            />

            <Text
              style={[styles.label, isActive && styles.activeLabel]}
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 75,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 5,
    paddingTop: 7,
    paddingBottom: 5,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    minWidth: 0,
  },

  label: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "500",
  },

  activeLabel: {
    color: theme.colors.secondary,
    fontWeight: "bold",
  },
});

export default BottomNav;
