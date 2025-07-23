import React, { useCallback } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, Image, TouchableOpacity, Text, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ThongtinProfile({ onLogout, username = "Lê Anh Quân", externalOrders = [] }) {
  const navigation = useNavigation();

  const ProfileListItem = useCallback(
    ({ icon, label, onPress }) => (
      <TouchableOpacity style={styles.profileItem} onPress={onPress}>
        <View style={styles.profileItemLeft}>
          <Ionicons name={icon} size={24} color="#007bff" style={styles.profileItemIcon} />
          <Text style={styles.profileItemText}>{label}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#ccc" />
      </TouchableOpacity>
    ),
    []
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={styles.container}>
        <View style={styles.defaultContentContainer}>
          <View style={styles.profileHeader}>
            <Image source={require("../assets/img/avt5.jpg")} style={styles.avatar} />
            <Text style={styles.profileName}>{username}</Text>
          </View>
          <ProfileListItem
            icon="person-circle-outline"
            label="Thông tin cá nhân"
            onPress={() => navigation.navigate("PersonalInfo", { username, externalOrders })}
          />
          <ProfileListItem
            icon="key-outline"
            label="Đổi mật khẩu"
            onPress={() => navigation.navigate("ChangePassword")}
          />
          <ProfileListItem
            icon="receipt-outline"
            label="Lịch sử giao dịch"
            onPress={() => navigation.navigate("OrderHistory", { externalOrders })}
          />
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => {
              Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
                { text: "Hủy", style: "cancel" },
                { text: "Đăng xuất", style: "destructive", onPress: onLogout },
              ]);
            }}
          >
            <Text style={styles.logoutBtnText}>Đăng xuất</Text>
            <Ionicons name="log-out-outline" size={24} color="#dc3545" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  defaultContentContainer: { paddingTop: 0 },
  profileHeader: {
    backgroundColor: "#8ebad3",
    paddingVertical: 30,
    alignItems: "center",
    marginBottom: 40,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  profileName: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  profileItemLeft: { flexDirection: "row", alignItems: "center" },
  profileItemIcon: { marginRight: 10 },
  profileItemText: { fontSize: 16, color: "#333" },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#dc3545",
    borderWidth: 1,
  },
  logoutBtnText: {
    color: "#dc3545",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 10,
  },
});