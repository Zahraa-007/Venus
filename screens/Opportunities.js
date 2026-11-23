import React, { useMemo, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../theme";
import Navbar from "../components/navbar";
import BottomNav from "../components/BottomNav";
import CategoryFilter from "../components/CategoryFilter";
import OpportunityCard from "../components/OpportunityCard";
import opportunities from "../data/opportunities";
import { useAppData } from "../context/AppContext";

const categories = [
  "All",
  "Education",
  "Healthcare",
  "Environment",
  "Community",
  "Technology",
];

const Opportunities = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { savedOpportunityIds, toggleSavedOpportunity } = useAppData();

  const visibleOpportunities = useMemo(
    () =>
      selectedCategory === "All"
        ? opportunities
        : opportunities.filter(
            (opportunity) => opportunity.category === selectedCategory,
          ),
    [selectedCategory],
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />

      <Navbar />

      <View style={styles.heading}>
        <View>
          <Text style={styles.title}>Discover Opportunities</Text>
          <Text style={styles.subtitle}>
            Make a difference through volunteering.
          </Text>
        </View>

        <View style={styles.headingIcon}>
          <MaterialCommunityIcons
            name="hand-heart-outline"
            size={25}
            color={theme.colors.primary}
          />
        </View>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.sectionTitle}>Explore Categories</Text>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </View>

      <ScrollView
        style={styles.feed}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>
            {selectedCategory === "All"
              ? "All Opportunities"
              : selectedCategory}
          </Text>

          <Text style={styles.resultCount}>
            {visibleOpportunities.length} available
          </Text>
        </View>

        {visibleOpportunities.length > 0 ? (
          visibleOpportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              isSaved={savedOpportunityIds.includes(opportunity.id)}
              onToggleSaved={() => toggleSavedOpportunity(opportunity.id)}
              onViewDetails={() =>
                navigation.navigate("OpportunityDetails", {
                  opportunityId: opportunity.id,
                })
              }
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <MaterialCommunityIcons
                name="briefcase-search-outline"
                size={38}
                color={theme.colors.primary}
              />
            </View>

            <Text style={styles.emptyTitle}>No Opportunities Found</Text>

            <Text style={styles.emptyDescription}>
              There are currently no opportunities in this category. Try
              exploring another category.
            </Text>
          </View>
        )}
      </ScrollView>

      <BottomNav
        active="Opportunities"
        onNavigate={(screen) => {
          if (screen !== "Opportunities") {
            navigation.navigate(screen);
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  heading: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: theme.colors.text,
    fontSize: 23,
    fontWeight: "800",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginTop: 6,
  },
  headingIcon: {
    width: 46,
    height: 46,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  filterSection: {
    marginTop: 2,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "700",
    paddingHorizontal: theme.spacing.md,
  },
  feed: {
    flex: 1,
  },
  feedContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
  },
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  resultsTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  resultCount: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 55,
  },
  emptyIcon: {
    width: 76,
    height: 76,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: "800",
  },
  emptyDescription: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 8,
  },
});

export default Opportunities;
