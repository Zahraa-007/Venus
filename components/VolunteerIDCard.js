import React, { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../theme";

const cardFields = [
  ["Birth date", "birthDate"],
  ["School / University", "school"],
  ["Card number", "cardNumber"],
  ["Email", "email"],
  ["Gender", "gender"],
  ["Hobby", "hobby"],
];

const VolunteerIDCard = ({ visible, profile, onClose }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      animation.setValue(0);
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        damping: 17,
        stiffness: 190,
      }).start();
    }
  }, [animation, visible]);

  const cardTransform = {
    opacity: animation,
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.92, 1],
        }),
      },
    ],
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close volunteer identity card"
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        />
        <Animated.View style={[styles.card, cardTransform]}>
          <View pointerEvents="none" style={styles.watermark}>
            <MaterialCommunityIcons
              name="flower-tulip"
              size={150}
              color={theme.colors.secondary}
            />
          </View>
          <View style={styles.cardHeader}>
            <View style={styles.brandMark}>
              <MaterialCommunityIcons
                name="flower-tulip"
                size={17}
                color={theme.colors.secondary}
              />
            </View>
            <View style={styles.brandCopy}>
              <Text style={styles.brandTitle}>VENUS VOLUNTEER</Text>
              <Text style={styles.brandSubtitle}>MEMBERSHIP CARD</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close card"
              onPress={onClose}
              hitSlop={8}
              style={styles.closeButton}
            >
              <MaterialCommunityIcons
                name="close"
                size={19}
                color={theme.colors.primary}
              />
            </Pressable>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.portrait}>
              <MaterialCommunityIcons
                name="account"
                size={36}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles.identity}>
              <Text style={styles.nameLabel}>VOLUNTEER NAME</Text>
              <Text style={styles.name} numberOfLines={1}>
                {profile.fullName || "Not provided"}
              </Text>
              <View style={styles.fieldGrid}>
                {cardFields.map(([label, key]) => (
                  <View key={key} style={styles.field}>
                    <Text style={styles.fieldLabel}>{label.toUpperCase()}</Text>
                    <Text style={styles.fieldValue} numberOfLines={1}>
                      {profile[key] || "Not provided"}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.footerText}>BELONG · SERVE · FLOURISH</Text>
            <MaterialCommunityIcons
              name="flower-tulip"
              size={17}
              color={theme.colors.secondaryDark}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    aspectRatio: 1.56,
    maxHeight: "68%",
    backgroundColor: theme.colors.background,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 9,
    overflow: "hidden",
    justifyContent: "space-between",
    shadowColor: theme.colors.primaryDark,
    shadowOpacity: 0.28,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  watermark: {
    position: "absolute",
    right: 12,
    bottom: 7,
    opacity: 0.1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
  },
  brandMark: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brandCopy: {
    flex: 1,
    marginLeft: 8,
  },
  brandTitle: {
    color: theme.colors.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  brandSubtitle: {
    color: theme.colors.secondaryDark,
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 1.4,
    marginTop: 2,
  },
  closeButton: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    gap: 10,
  },
  portrait: {
    width: 55,
    height: 67,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    backgroundColor: theme.colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  identity: {
    flex: 1,
    minWidth: 0,
  },
  nameLabel: {
    color: theme.colors.secondaryDark,
    fontSize: 7,
    letterSpacing: 0.8,
    fontWeight: "700",
  },
  name: {
    color: theme.colors.primaryDark,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
    marginBottom: 6,
  },
  fieldGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 5,
  },
  field: {
    width: "50%",
    paddingRight: 4,
  },
  fieldLabel: {
    color: theme.colors.secondaryDark,
    fontSize: 7,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  fieldValue: {
    color: theme.colors.text,
    fontSize: 9,
    fontWeight: "600",
    marginTop: 1,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.secondary,
    paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerText: {
    color: theme.colors.primary,
    fontSize: 7,
    letterSpacing: 1.1,
    fontWeight: "800",
  },
});

export default VolunteerIDCard;
