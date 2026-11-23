import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../theme";
import BottomNav from "../components/BottomNav";
import VolunteerIDCard from "../components/VolunteerIDCard";
import { useAppData } from "../context/AppContext";

const editableFields = [
  ["Full name", "fullName"],
  ["Nickname", "nickname"],
  ["Birth date", "birthDate"],
  ["School / University", "school"],
  ["Card number", "cardNumber"],
  ["Email", "email"],
  ["Gender", "gender"],
  ["Hobby", "hobby"],
];

const Profile = ({ navigation }) => {
  const { profile, setProfile } = useAppData();
  const [idCardVisible, setIdCardVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [draftProfile, setDraftProfile] = useState(profile);

  const startEditing = () => {
    setDraftProfile(profile);
    setEditVisible(true);
  };

  const saveProfile = () => {
    setProfile(draftProfile);
    setEditVisible(false);
  };

  const memberId = profile.cardNumber
    ? `Volunteer ID · •••• ${profile.cardNumber.slice(-4)}`
    : "Volunteer ID · Not assigned";

  const navigateBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <ScrollView
        style={styles.profileScroll}
        contentContainerStyle={styles.profileContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.banner}>
          <View pointerEvents="none" style={styles.bannerOrnamentLarge} />
          <View pointerEvents="none" style={styles.bannerOrnamentSmall} />
          <View style={styles.bannerActions}>
            <Text style={styles.bannerWordmark}>VENUS</Text>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Profile settings"
              onPress={() => setSettingsVisible(true)}
              style={styles.bannerIcon}
            >
              <MaterialCommunityIcons
                name="cog-outline"
                size={23}
                color={theme.colors.textOnPrimary}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.bannerSubtitle}>A little kindness goes far</Text>
        </View>

        <View style={styles.profileIdentity}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons
              name="account"
              size={48}
              color={theme.colors.primary}
            />
          </View>
          <Text style={styles.nickname}>{profile.nickname || "Volunteer"}</Text>
          <Text style={styles.memberId}>{memberId}</Text>
        </View>

        <View style={styles.stats}>
          <ProfileStat label="Following" value={profile.following} />
          <View style={styles.statDivider} />
          <ProfileStat label="Followers" value={profile.followers} />
          <View style={styles.statDivider} />
          <ProfileStat label="Likes" value={profile.likes} />
        </View>

        <View style={styles.actions}>
          <ActionButton
            icon="account-edit-outline"
            label="Edit Profile"
            onPress={startEditing}
          />
          <ActionButton
            icon="clipboard-text-outline"
            label="My Activities"
            onPress={() => navigation.navigate("Activities")}
          />
          <ActionButton
            icon="card-account-details-outline"
            label="ID Card"
            onPress={() => setIdCardVisible(true)}
            emphasized
          />
        </View>

        <View style={styles.privacyNote}>
          <MaterialCommunityIcons
            name="shield-lock-outline"
            size={19}
            color={theme.colors.primary}
          />
          <Text style={styles.privacyText}>
            Personal details appear only when you open your volunteer ID card.
          </Text>
        </View>
      </ScrollView>

      <BottomNav
        active="Profile"
        onNavigate={(screen) => {
          if (screen !== "Profile") {
            navigation.navigate(screen);
          }
        }}
      />

      <VolunteerIDCard
        visible={idCardVisible}
        profile={profile}
        onClose={() => setIdCardVisible(false)}
      />

      <Modal
        visible={editVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.formSheet}>
            <View style={styles.sheetHeader}>
              <View>
                <Text style={styles.sheetTitle}>Edit profile</Text>
                <Text style={styles.sheetSubtitle}>
                  These details are shown on your ID card only.
                </Text>
              </View>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Close edit profile"
                onPress={() => setEditVisible(false)}
                style={styles.closeButton}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={21}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {editableFields.map(([label, key]) => (
                <View key={key} style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>{label}</Text>
                  <TextInput
                    value={draftProfile[key]}
                    onChangeText={(value) =>
                      setDraftProfile((current) => ({
                        ...current,
                        [key]: value,
                      }))
                    }
                    placeholder={`Enter ${label.toLowerCase()}`}
                    placeholderTextColor={theme.colors.textSecondary}
                    autoCapitalize={key === "email" ? "none" : "words"}
                    keyboardType={key === "email" ? "email-address" : "default"}
                    style={styles.input}
                  />
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={saveProfile}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Save profile</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={settingsVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSettingsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.settingsCard}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Profile settings</Text>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Close settings"
                onPress={() => setSettingsVisible(false)}
                style={styles.closeButton}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={21}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.settingsCopy}>
              Your profile details stay on this device in this preview. Personal
              card information is not shown on your public profile.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSettingsVisible(false);
                Alert.alert(
                  "Profile data",
                  "Your information is currently held in app memory and is cleared when the app restarts.",
                );
              }}
              style={styles.settingsAction}
            >
              <Text style={styles.settingsActionText}>About profile data</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const ProfileStat = ({ label, value }) => (
  <View style={styles.stat}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ActionButton = ({ icon, label, onPress, emphasized = false }) => (
  <TouchableOpacity
    accessibilityRole="button"
    onPress={onPress}
    activeOpacity={0.75}
    style={[styles.actionButton, emphasized && styles.emphasizedAction]}
  >
    <MaterialCommunityIcons
      name={icon}
      size={21}
      color={emphasized ? theme.colors.textOnPrimary : theme.colors.primary}
    />
    <Text
      style={[styles.actionLabel, emphasized && styles.emphasizedActionLabel]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileScroll: {
    flex: 1,
  },
  profileContent: {
    paddingBottom: theme.spacing.lg,
  },
  banner: {
    height: 190,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    overflow: "hidden",
  },
  bannerOrnamentLarge: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    opacity: 0.38,
    right: -60,
    top: 35,
  },
  bannerOrnamentSmall: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    opacity: 0.27,
    right: -25,
    top: 70,
  },
  bannerActions: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.textOnPrimary,
    opacity: 0.88,
  },
  bannerWordmark: {
    color: theme.colors.textOnPrimary,
    fontSize: 18,
    letterSpacing: 3,
    fontWeight: "800",
  },
  bannerSubtitle: {
    color: theme.colors.secondaryLight,
    fontSize: 13,
    fontWeight: "500",
    marginTop: 17,
    textAlign: "center",
  },
  profileIdentity: {
    alignItems: "center",
    marginTop: -47,
  },
  avatar: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: theme.colors.surface,
    borderWidth: 4,
    borderColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  nickname: {
    color: theme.colors.text,
    fontSize: 21,
    fontWeight: "800",
    marginTop: 8,
  },
  memberId: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  stats: {
    flexDirection: "row",
    marginHorizontal: theme.spacing.md,
    marginTop: 19,
    paddingVertical: 15,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    color: theme.colors.primary,
    fontWeight: "800",
    fontSize: 18,
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },
  statDivider: {
    height: 30,
    width: 1,
    backgroundColor: theme.colors.border,
  },
  actions: {
    flexDirection: "row",
    gap: 9,
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  actionButton: {
    flex: 1,
    minHeight: 77,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
    gap: 7,
  },
  emphasizedAction: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  actionLabel: {
    color: theme.colors.primary,
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
  },
  emphasizedActionLabel: {
    color: theme.colors.textOnPrimary,
  },
  privacyNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceSecondary,
  },
  privacyText: {
    flex: 1,
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.colors.overlay,
    padding: 18,
  },
  formSheet: {
    maxHeight: "90%",
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  sheetTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "800",
  },
  sheetSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 5,
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.sm,
    paddingHorizontal: 12,
    color: theme.colors.text,
    fontSize: 14,
  },
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    marginTop: 12,
  },
  saveButtonText: {
    color: theme.colors.textOnPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  settingsCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
  },
  settingsCopy: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },
  settingsAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    marginTop: 16,
    paddingTop: 14,
  },
  settingsActionText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
});

export default Profile;
