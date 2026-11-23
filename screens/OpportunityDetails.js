import React from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../theme";
import opportunities from "../data/opportunities";
import Navbar from "../components/navbar";

const OpportunityDetails = ({ navigation, route }) => {
  const opportunity = opportunities.find(
    (item) => item.id === route.params?.opportunityId,
  );

  if (!opportunity) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle="light-content"
        />
        <Navbar />
        <View style={styles.notFound}>
          <Text style={styles.title}>Opportunity unavailable</Text>
          <Text style={styles.body}>
            This opportunity could not be found. Please return to the list.
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.primaryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityRole="button"
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={20}
            color={theme.colors.primary}
          />
          <Text style={styles.backText}>Opportunities</Text>
        </TouchableOpacity>
        <View style={styles.organization}>
          <View style={styles.organizationAvatar}>
            <MaterialCommunityIcons
              name={opportunity.icon}
              size={26}
              color={theme.colors.primary}
            />
          </View>
          <View style={styles.organizationText}>
            <Text style={styles.organizationName}>
              {opportunity.organization}
            </Text>
            <Text style={styles.category}>{opportunity.category}</Text>
          </View>
        </View>
        <Text style={styles.title}>{opportunity.title}</Text>
        <Text style={styles.description}>{opportunity.fullDescription}</Text>
        <View style={styles.factsCard}>
          <DetailFact
            icon="map-marker-outline"
            label="Location"
            value={opportunity.location}
          />
          <DetailFact
            icon="account-multiple-outline"
            label="Volunteers needed"
            value={
              opportunity.volunteers
                ? `${opportunity.volunteers} people`
                : "Places available"
            }
          />
          <DetailFact
            icon="calendar-clock"
            label="Schedule"
            value={opportunity.schedule}
          />
          <DetailFact
            icon="clock-alert-outline"
            label="Application deadline"
            value={opportunity.deadline}
          />
          <DetailFact
            icon="laptop"
            label="Participation"
            value={opportunity.type}
          />
        </View>
        <Text style={styles.sectionTitle}>About the organization</Text>
        <Text style={styles.body}>{opportunity.organizationDescription}</Text>
        <Text style={styles.sectionTitle}>What you’ll need</Text>
        {opportunity.requirements.map((requirement) => (
          <View key={requirement} style={styles.requirement}>
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={18}
              color={theme.colors.secondaryDark}
            />
            <Text style={styles.body}>{requirement}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            Alert.alert(
              "Applications are not open yet",
              "You can explore this opportunity, but applications are not connected in this preview.",
            )
          }
          accessibilityRole="button"
        >
          <Text style={styles.primaryButtonText}>Applications opening soon</Text>
        </TouchableOpacity>
        <Text style={styles.applicationNote}>
          Application submission will be available when Venus connects to its
          volunteer platform.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailFact = ({ icon, label, value }) => (
  <View style={styles.fact}>
    <MaterialCommunityIcons
      name={icon}
      size={19}
      color={theme.colors.primary}
    />
    <View style={styles.factCopy}>
      <Text style={styles.factLabel}>{label}</Text>
      <Text style={styles.factValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingVertical: 15,
  },
  backText: {
    color: theme.colors.primary,
    fontWeight: "700",
    fontSize: 13,
  },
  organization: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 17,
  },
  organizationAvatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  organizationText: {
    flex: 1,
    marginLeft: 12,
  },
  organizationName: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 14,
  },
  category: {
    color: theme.colors.secondaryDark,
    fontWeight: "700",
    fontSize: 12,
    marginTop: 4,
  },
  title: {
    color: theme.colors.text,
    fontSize: 25,
    lineHeight: 32,
    fontWeight: "800",
    marginBottom: 10,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  factsCard: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.lg,
    gap: 15,
  },
  fact: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  factCopy: {
    flex: 1,
  },
  factLabel: {
    color: theme.colors.textSecondary,
    fontSize: 11,
  },
  factValue: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 17,
    marginBottom: 8,
    marginTop: 6,
  },
  body: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },
  requirement: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
    marginBottom: 8,
  },
  primaryButton: {
    marginTop: 20,
    minHeight: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  primaryButtonText: {
    color: theme.colors.textOnPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  applicationNote: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
    marginTop: 8,
  },
  notFound: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: "center",
  },
});

export default OpportunityDetails;
