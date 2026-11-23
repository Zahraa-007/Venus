import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import theme from "../theme";
import Navbar from "../components/navbar";
import BottomNav from "../components/BottomNav";

const posts = [
  {
    id: "1",
    organization: "Unknown",
    time: "2 hours ago",
    caption: "Together, we can make a difference.",
    likes: "4.6K",
    comments: "25",
    shares: "1.9K",
    views: "52.5K",
  },
  {
    id: "2",
    organization: "Volunteer Team",
    time: "5 hours ago",
    caption: "A new volunteering opportunity is waiting for you.",
    likes: "320",
    comments: "18",
    shares: "42",
    views: "2.1K",
  },
];

const FeedTabs = ({ activeTab, onChange }) => {
  const tabs = ["News", "Following", "Teams"];

  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab, index) => (
        <React.Fragment key={tab}>
          <TouchableOpacity
            onPress={() => onChange(tab)}
            activeOpacity={0.7}
            style={styles.tabButton}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>

            {activeTab === tab && <View style={styles.activeTabLine} />}
          </TouchableOpacity>

          {index !== tabs.length - 1 && (
            <Text style={styles.tabSeparator}>/</Text>
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="account" size={35} color="#FFFFFF" />
        </View>

        <View style={styles.organizationInfo}>
          <Text style={styles.organizationName}>{post.organization}</Text>

          <Text style={styles.postTime}>{post.time}</Text>
        </View>

        <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.postImage}>
        <Text style={styles.postImageText}>Post</Text>

        <Text style={styles.postCaption}>{post.caption}</Text>
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionItem}>
          <MaterialCommunityIcons
            name="comment-outline"
            size={23}
            color={theme.colors.text}
          />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <MaterialCommunityIcons
            name="repeat"
            size={23}
            color={theme.colors.text}
          />
          <Text style={styles.actionText}>{post.shares}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => setLiked(!liked)}
        >
          <MaterialCommunityIcons
            name={liked ? "heart" : "heart-outline"}
            size={23}
            color={liked ? "#C62828" : theme.colors.text}
          />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <MaterialCommunityIcons
            name="chart-bar"
            size={23}
            color={theme.colors.text}
          />
          <Text style={styles.actionText}>{post.views}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSaved(!saved)}
          style={styles.iconButton}
        >
          <MaterialCommunityIcons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={23}
            color={saved ? theme.colors.primary : theme.colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons
            name="share-variant-outline"
            size={23}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Home = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("News");

  const displayedPosts = posts;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />

      <Navbar />

      <FeedTabs activeTab={activeTab} onChange={setActiveTab} />

      <ScrollView
        style={styles.feed}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {displayedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.createPostButton}
        activeOpacity={0.8}
        onPress={() => navigation?.navigate("CreatePost")}
      >
        <MaterialCommunityIcons
          name="plus"
          size={32}
          color={theme.colors.secondary}
        />
      </TouchableOpacity>

      <BottomNav
        active="Home"
        onNavigate={(screen) => {
          if (screen !== "Home") {
            navigation?.navigate(screen);
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

  tabsContainer: {
    height: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 22,
    paddingHorizontal: 20,
  },

  tabButton: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  tabText: {
    fontSize: 15,
    color: "#77716B",
    fontWeight: "500",
  },

  activeTabText: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },

  activeTabLine: {
    height: 2,
    width: "100%",
    backgroundColor: theme.colors.primary,
    marginTop: 5,
    borderRadius: 2,
  },

  tabSeparator: {
    color: theme.colors.text,
    fontSize: 15,
  },

  feed: {
    flex: 1,
  },

  feedContent: {
    paddingHorizontal: 18,
    paddingTop: 15,
    paddingBottom: 110,
  },

  postContainer: {
    width: "100%",
    marginBottom: 32,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 5,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#AAA",
    alignItems: "center",
    justifyContent: "center",
  },

  organizationInfo: {
    marginLeft: 14,
    flex: 1,
  },

  organizationName: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
  },

  postTime: {
    fontSize: 12,
    color: "#8F7775",
    marginTop: 5,
  },

  moreButton: {
    padding: 8,
  },

  postImage: {
    width: "100%",
    height: 360,
    backgroundColor: "#AAA",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  postImageText: {
    fontSize: 42,
    color: "#333333",
    fontWeight: "500",
  },

  postCaption: {
    position: "absolute",
    bottom: 18,
    left: 20,
    right: 20,
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 24,
  },

  postActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingTop: 15,
    paddingBottom: 5,
  },

  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  actionText: {
    fontSize: 11,
    color: theme.colors.text,
  },

  iconButton: {
    paddingHorizontal: 2,
  },

  createPostButton: {
    position: "absolute",
    right: 22,
    bottom: 95,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

export default Home;
