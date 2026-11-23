import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import theme from "../theme";

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.logoText}>Venus</Text>

      <Image
        source={require("../assets/icon.png")}
        style={styles.logoImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 65,
    width: "100%",
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  logoText: {
    color: theme.colors.textOnPrimary,
    fontSize: 23,
    fontWeight: "bold",
    letterSpacing: 0.7,
  },

  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Navbar;
