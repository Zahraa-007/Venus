import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../theme";

const OpportunityCard = ({
  opportunity,
  isSaved,
  onToggleSaved,
  onViewDetails,
}) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <View style={styles.organizationAvatar}>
        <MaterialCommunityIcons
          name={opportunity.icon}
          size={25}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.organizationDetails}>
        <Text style={styles.organizationName} numberOfLines={1}>
          {opportunity.organization}
        </Text>
        <Text style={styles.category}>{opportunity.category}</Text>
      </View>

      <TouchableOpacity
        onPress={onToggleSaved}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={isSaved ? "Remove from saved" : "Save opportunity"}
        accessibilityState={{ selected: isSaved }}
        style={[styles.saveButton, isSaved && styles.savedButton]}
      >
        <MaterialCommunityIcons
          name={isSaved ? "bookmark" : "bookmark-outline"}
          size={20}
          color={isSaved ? theme.colors.primary : theme.colors.textSecondary}
        />
      </TouchableOpacity>
    </View>

    <View style={styles.content}>
      <Text style={styles.title}>{opportunity.title}</Text>

      <Text style={styles.description} numberOfLines={3}>
        {opportunity.description}
      </Text>
    </View>

    <View style={styles.infoContainer}>
      <View style={styles.infoItem}>
        <View style={styles.infoIcon}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={18}
            color={theme.colors.primary}
          />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Location</Text>
          <Text style={styles.infoValue} numberOfLines={1}>
            {opportunity.location}
          </Text>
        </View>
      </View>

      <View style={styles.infoItem}>
        <View style={styles.infoIcon}>
          <MaterialCommunityIcons
            name="account-group-outline"
            size={18}
            color={theme.colors.primary}
          />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Volunteers</Text>
          <Text style={styles.infoValue}>
            {opportunity.volunteers
              ? `${opportunity.volunteers} needed`
              : "Places available"}
          </Text>
        </View>
      </View>
    </View>

    <View style={styles.footer}>
      <View style={styles.footerMeta}>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{opportunity.type}</Text>
        </View>

        <View style={styles.deadlineContainer}>
          <MaterialCommunityIcons
            name="calendar-clock-outline"
            size={15}
            color={theme.colors.textSecondary}
          />
          <Text style={styles.deadline}>{opportunity.deadline}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.detailsButton}
        onPress={onViewDetails}
        activeOpacity={0.75}
        accessibilityRole="button"
      >
        <Text style={styles.detailsButtonText}>View Details</Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={18}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 1,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  organizationAvatar: {
    width: 46,
    height: 46,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  organizationDetails: {
    flex: 1,
    marginLeft: 12,
  },
  organizationName: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "700",
  },
  category: {
    color: theme.colors.secondaryDark,
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
  },
  saveButton: {
    width: 37,
    height: 37,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  savedButton: {
    backgroundColor: theme.colors.secondaryLight,
  },
  content: {
    marginTop: 17,
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "800",
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },
  infoContainer: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: theme.radius.md,
    padding: 12,
    marginTop: 16,
    gap: 13,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: "500",
  },
  infoValue: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  footer: {
    marginTop: 15,
    gap: 13,
  },
  footerMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  typeBadge: {
    backgroundColor: theme.colors.surfaceSecondary,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
  },
  typeText: {
    color: theme.colors.primary,
    fontSize: 11,
    fontWeight: "700",
  },
  deadlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flexShrink: 1,
  },
  deadline: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    fontWeight: "500",
  },
  detailsButton: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: theme.radius.md,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  detailsButtonText: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: "700",
  },
});

export default OpportunityCard;
