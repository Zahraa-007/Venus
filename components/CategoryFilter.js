import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import theme from "../theme";

const CategoryFilter = ({ categories, selectedCategory, onSelect }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}
  >
    {categories.map((category) => {
      const selected = category === selectedCategory;

      return (
        <TouchableOpacity
          key={category}
          onPress={() => onSelect(category)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityState={{ selected }}
          style={styles.tab}
        >
          <Text style={[styles.label, selected && styles.selectedLabel]}>
            {category}
          </Text>

          <View
            style={[styles.indicator, selected && styles.activeIndicator]}
          />
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    gap: 28,
  },
  tab: {
    alignItems: "center",
    paddingTop: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.textSecondary,
  },
  selectedLabel: {
    color: theme.colors.primary,
    fontWeight: "700",
  },
  indicator: {
    height: 3,
    width: "100%",
    borderRadius: 3,
    marginTop: 10,
    backgroundColor: "transparent",
  },
  activeIndicator: {
    backgroundColor: theme.colors.primary,
  },
});

export default CategoryFilter;
