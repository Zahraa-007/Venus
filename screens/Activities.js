import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../theme";
import Navbar from "../components/navbar";
import BottomNav from "../components/BottomNav";

const Activities = ({ navigation }) => (
  <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
    <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
    <Navbar />
    <View style={styles.content}>
      <Text style={styles.title}>Activities</Text>
      <View style={styles.emptyState}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons
            name="calendar-heart"
            size={34}
            color={theme.colors.primary}
          />
        </View>
        <Text style={styles.emptyTitle}>Your volunteer journey starts here</Text>
        <Text style={styles.emptyText}>
          Activities you join will appear here. Explore opportunities to find
          your first one.
        </Text>
      </View>
    </View>
    <BottomNav
      active="Activities"
      onNavigate={(screen) => {
        if (screen !== "Activities") {
          navigation.navigate(screen);
        }
      }}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: 26,
    fontWeight: "800",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: theme.colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    marginBottom: 17,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
  },
});

export default Activities;
