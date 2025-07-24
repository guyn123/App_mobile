import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChangePassword({ setActiveSection }) {
  const API_BASE = "http://172.17.154.189:8084/api/taikhoan";
  const [matKhauCu, setMatKhauCu] = useState("");
  const [matKhauMoi, setMatKhauMoi] = useState("");
  const [matKhauLai, setMatKhauLai] = useState("");
  const [token, setToken] = useState("");

  const fetchToken = useCallback(async () => {
    const storedToken = await AsyncStorage.getItem("token");
    setToken(storedToken || "");
    return storedToken;
  }, []);

  const handleChangePassword = useCallback(async () => {
    if (!matKhauCu || !matKhauMoi || !matKhauLai) {
      Alert.alert("Lỗi", "Vui lòng nhập đủ các trường mật khẩu.");
      return;
    }
    if (matKhauMoi !== matKhauLai) {
      Alert.alert("Lỗi", "Mật khẩu mới không trùng khớp.");
      return;
    }

    const storedToken = await fetchToken();
    try {
      const res = await axios.put(
        `${API_BASE}/changepassword`,
        {
          oldPassword: matKhauCu,
          newPassword: matKhauMoi,
          confirmNewPassword: matKhauLai,
        },
        {
          headers: { Cookie: `token=${storedToken}` },
          withCredentials: true,
        }
      );
      Alert.alert("Thành công", res.data.message);
      setMatKhauCu("");
      setMatKhauMoi("");
      setMatKhauLai("");
    } catch (err) {
      Alert.alert("Lỗi", err.response?.data?.error || "Không đổi được mật khẩu.");
    }
  }, [fetchToken, API_BASE, matKhauCu, matKhauMoi, matKhauLai]);

  const Input = useCallback(
    ({ label, placeholder, value, onChangeText, secureTextEntry }) => (
      <View style={styles.formGroup}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    ),
    []
  );

  return (
    <View style={styles.sectionContainer}>
      
      
      <Input
        label="Mật khẩu hiện tại"
        placeholder="Nhập mật khẩu hiện tại..."
        secureTextEntry
        value={matKhauCu}
        onChangeText={setMatKhauCu}
      />
      <Input
        label="Mật khẩu mới"
        placeholder="Nhập mật khẩu mới..."
        secureTextEntry
        value={matKhauMoi}
        onChangeText={setMatKhauMoi}
      />
      <Input
        label="Nhập lại mật khẩu mới"
        placeholder="Xác nhận mật khẩu mới..."
        secureTextEntry
        value={matKhauLai}
        onChangeText={setMatKhauLai}
      />
      <TouchableOpacity style={styles.saveBtn} onPress={handleChangePassword}>
        <Text style={styles.btnText}>Đổi mật khẩu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 16,
    textAlign: "center",
  },
  
  
  formGroup: { marginBottom: 12 },
  label: { fontWeight: "600", fontSize: 17, marginBottom: 6 },
  input: {
    backgroundColor: "#fdfdfd",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    marginTop: 14,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});