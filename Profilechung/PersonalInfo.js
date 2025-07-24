import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PersonalInfo({ route }) {
  const navigation = useNavigation();
  const { username = "Lê Anh Quân" } = route.params || {};
  const API_BASE = "http://172.17.154.189:8084/api/taikhoan";
  const [token, setToken] = useState("");
  const [originalInfo, setOriginalInfo] = useState({});
  const [hoTen, setHoTen] = useState("");
  const [gender, setGender] = useState("");
  const [tuoi, setTuoi] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");
  const [diaChi, setDiaChi] = useState("");

  const fetchToken = useCallback(async () => {
    const storedToken = await AsyncStorage.getItem("token");
    setToken(storedToken || "");
    return storedToken;
  }, []);

  const fetchUserInfo = useCallback(async () => {
    const storedToken = await fetchToken();
    try {
      const res = await axios.get(`${API_BASE}/me`, {
        headers: { Cookie: `token=${storedToken}` },
        withCredentials: true,
      });
      const d = res.data;
      setHoTen(d.hoTen || "");
      setGender(d.gioiTinh || "");
      setTuoi(d.soTuoi?.toString() || "");
      setEmail(d.email || "");
      setSdt(d.phone || "");
      setDiaChi(d.diaChi || "");
      setOriginalInfo({
        hoTen: d.hoTen || "",
        gioiTinh: d.gioiTinh || "",
        soTuoi: d.soTuoi?.toString() || "",
        email: d.email || "",
        phone: d.phone || "",
        diaChi: d.diaChi || "",
      });
    } catch (err) {
      console.log("Lỗi khi lấy thông tin cá nhân:", err);
      Alert.alert("Lỗi", "Không lấy được thông tin cá nhân.");
    }
  }, [fetchToken, API_BASE]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const handleSaveInfo = useCallback(async () => {
    const storedToken = await fetchToken();
    const updatedData = {};
    if (hoTen !== originalInfo.hoTen) updatedData.hoTen = hoTen;
    if (gender !== originalInfo.gioiTinh) updatedData.gioiTinh = gender;
    if (tuoi !== originalInfo.soTuoi) updatedData.soTuoi = parseInt(tuoi, 10);
    if (email !== originalInfo.email) updatedData.email = email;
    if (sdt !== originalInfo.phone) updatedData.phone = sdt;
    if (diaChi !== originalInfo.diaChi) updatedData.diaChi = diaChi;

    if (Object.keys(updatedData).length === 0) {
      Alert.alert("Không có thay đổi", "Bạn chưa thay đổi thông tin nào.");
      return;
    }

    try {
      const res = await axios.put(`${API_BASE}/update/me`, updatedData, {
        headers: { Cookie: `token=${storedToken}` },
        withCredentials: true,
      });
      Alert.alert("Thành công", res.data.message || "Cập nhật thành công");
      setOriginalInfo({ ...originalInfo, ...updatedData });
    } catch (err) {
      console.log("Chi tiết lỗi cập nhật:", err.response?.data || err);
      Alert.alert("Lỗi", err.response?.data?.error || "Không cập nhật được thông tin.");
    }
  }, [fetchToken, API_BASE, hoTen, gender, tuoi, email, sdt, diaChi, originalInfo]);

  const Input = useCallback(
    ({ label, placeholder, value, onChangeText, keyboardType }) => (
      <View style={styles.formGroup}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    ),
    []
  );

  const RadioOption = useCallback(
    ({ label, value: val }) => (
      <TouchableOpacity style={styles.radioOption} onPress={() => setGender(val)}>
        <View style={[styles.radioCircle, gender === val && styles.radioChecked]} />
        <Text style={styles.radioLabel}>{label}</Text>
      </TouchableOpacity>
    ),
    [gender]
  );

  return (
    <View style={styles.sectionContainer}>

      
      <Input label="Họ và tên" placeholder="Nhập họ tên..." value={hoTen} onChangeText={setHoTen} />
      <Text style={styles.label}>Giới tính</Text>
      <View style={styles.genderRow}>
        <RadioOption label="Nam" value="Nam" />
        <RadioOption label="Nữ" value="Nữ" />
      </View>
      <Input label="Tuổi" placeholder="VD: 22" keyboardType="numeric" value={tuoi} onChangeText={setTuoi} />
      <Input label="Email" placeholder="email@example.com" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Input label="Số điện thoại" placeholder="098xxxxxxx" keyboardType="phone-pad" value={sdt} onChangeText={setSdt} />
      <Input label="Địa chỉ" placeholder="Địa chỉ..." value={diaChi} onChangeText={setDiaChi} />
      <TouchableOpacity style={styles.saveBtn} onPress={handleSaveInfo}>
        <Text style={styles.btnText}>Lưu thông tin</Text>
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
  radioOption: { flexDirection: "row", alignItems: "center", marginRight: 24 },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#007bff",
    marginRight: 6,
  },
  radioChecked: { backgroundColor: "#007bff" },
  radioLabel: { fontSize: 14 },
  genderRow: { flexDirection: "row", marginBottom: 10 },
});