import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Pay({ event, username, selectedSeat, method, setMethod, handleRegister, isLoading, toCurrency }) {
  return (
    <View style={styles.box}>
      <Text style={styles.sectionTitle}>Thông tin đặt vé</Text>
      <Text>Họ tên: {username}</Text>
      <Text>Ghế: {selectedSeat}</Text>
      <Text>Tổng tiền: {toCurrency(event.phiThamGia)}</Text>
      <Text style={{ marginTop: 8, fontWeight: "bold" }}>Phương thức thanh toán:</Text>
      {["Qua ví điện tử", "Qua ngân hàng"].map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.methodBtn, method === item && styles.methodActive]}
          onPress={() => setMethod(item)}
        >
          <Text style={{ color: method === item ? "#fff" : "#000" }}>{item}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: method ? "#007bff" : "#ccc", opacity: isLoading ? 0.6 : 1 }]}
        disabled={!method || isLoading}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>{isLoading ? "Đang xử lý..." : "Thanh toán"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 12, color: "#333" },
  methodBtn: { padding: 12, borderWidth: 1, borderColor: "#ddd", borderRadius: 6, alignItems: "center", marginTop: 8 },
  methodActive: { backgroundColor: "#007bff", borderColor: "#007bff" },
  button: { padding: 12, borderRadius: 6, alignItems: "center", marginTop: 8 },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});