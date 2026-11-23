import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../theme";
import Navbar from "../components/navbar";
import BottomNav from "../components/BottomNav";
import OpportunityCard from "../components/OpportunityCard";
import opportunities from "../data/opportunities";
import { useAppData } from "../context/AppContext";

const Saved = ({ navigation }) => {
  const { savedOpportunityIds, toggleSavedOpportunity } = useAppData();
  const savedOpportunities = opportunities.filter((opportunity) =>
    savedOpportunityIds.includes(opportunity.id),
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <Navbar />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Saved</Text>
        <Text style={styles.subtitle}>
          Keep the opportunities you want to revisit close by.
        </Text>
        {savedOpportunities.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons
                name="bookmark-outline"
                size={34}
                color={theme.colors.primary}
              />
            </View>
            <Text style={styles.emptyTitle}>Nothing saved just yet</Text>
            <Text style={styles.emptyText}>
              Save an opportunity from the Opportunities page and it will show
              up here.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {savedOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                isSaved
                onToggleSaved={() => toggleSavedOpportunity(opportunity.id)}
                onViewDetails={() =>
                  navigation.navigate("OpportunityDetails", {
                    opportunityId: opportunity.id,
                  })
                }
              />
            ))}
          </View>
        )}
      </ScrollView>
      <BottomNav
        active="Saved"
        onNavigate={(screen) => {
          if (screen !== "Saved") {
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
  content: {
    flexGrow: 1,
    padding: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: 26,
    fontWeight: "800",
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 35,
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
  list: {
    marginTop: theme.spacing.lg,
  },
});

export default Saved;
