import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function OrderHistory({ route }) {
  const navigation = useNavigation();
  const { externalOrders = [] } = route.params || {};
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cauHoiText, setCauHoiText] = useState("");
  const [cauHoiDaGui, setCauHoiDaGui] = useState({});

  const handleBack = useCallback(() => {
    if (selectedOrder) {
      setSelectedOrder(null);
    } else {
      navigation.goBack();
    }
  }, [selectedOrder, navigation]);

  const handleSendQuestion = useCallback(() => {
    if (!cauHoiText.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập nội dung câu hỏi.");
      return;
    }
    setCauHoiDaGui((prev) => ({ ...prev, [selectedOrder.id]: true }));
    setCauHoiText("");
    Alert.alert("Thành công", "Câu hỏi đã được gửi!");
  }, [cauHoiText, selectedOrder]);

  const renderOrderDetail = useCallback(() => {
    if (!selectedOrder) return null;
    const now = new Date();
    const start = new Date(selectedOrder.start);
    const isOngoingOrEnded = now >= start;
    const hasAskedQuestion = cauHoiDaGui[selectedOrder.id];

    return (
      <>
        <View style={styles.orderDetailBox}>
          <Text style={styles.orderTitle}>{selectedOrder.title}</Text>
          <Text style={styles.orderSubInfo}>Mã: {selectedOrder.id}</Text>
          <Text style={styles.orderSubInfo}>Đặt lúc: {selectedOrder.bookingTime}</Text>
          <Text style={styles.orderSubInfo}>Địa điểm: {selectedOrder.location}</Text>
          <Text style={styles.orderSubInfo}>Bắt đầu: {selectedOrder.start}</Text>
          <Text style={styles.orderSubInfo}>Kết thúc: {selectedOrder.end}</Text>
          <Text style={styles.orderSubInfo}>Ghế: {selectedOrder.maGhe}</Text>
          <Text style={[styles.ordermaVe, { marginTop: 12, fontSize: 20 }]}>Mã vé: {selectedOrder.maVe}</Text>
          <Text style={[styles.orderPrice, { marginTop: 12 }]}>Tổng: {selectedOrder.price}</Text>
        </View>
        {!isOngoingOrEnded && !hasAskedQuestion && (
          <View style={styles.questionContainer}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>Gửi câu hỏi cho sự kiện này:</Text>
            <TextInput
              style={[styles.input, { minHeight: 60, textAlignVertical: "top" }]}
              multiline
              placeholder="Nhập nội dung câu hỏi..."
              value={cauHoiText}
              onChangeText={setCauHoiText}
            />
            <TouchableOpacity style={[styles.saveBtn, { marginTop: 10 }]} onPress={handleSendQuestion}>
              <Text style={styles.btnText}>Gửi câu hỏi</Text>
            </TouchableOpacity>
          </View>
        )}
        {hasAskedQuestion && (
          <Text style={[styles.label, { textAlign: "center", marginTop: 12, color: "#28a745" }]}>
            Bạn đã gửi câu hỏi cho sự kiện này.
          </Text>
        )}
      </>
    );
  }, [selectedOrder, cauHoiDaGui, cauHoiText, handleSendQuestion]);

  const renderOrdersList = useCallback(() => {
    if (externalOrders.length === 0) {
      return <Text style={{ textAlign: "center", marginTop: 16, color: "#999" }}>Bạn chưa có giao dịch nào.</Text>;
    }
    return externalOrders.map((order) => (
      <TouchableOpacity key={order.id} style={styles.orderCard} onPress={() => setSelectedOrder(order)}>
        <View style={styles.orderLeft}>
          <Text style={styles.orderTitle}>{order.title}</Text>
          <Text style={styles.orderSubInfo}>Đặt lúc: {order.bookingTime}</Text>
          <Text style={styles.orderSubInfo}>{order.location}</Text>
        </View>
        <View style={styles.orderRight}>
          <Text style={styles.orderPrice}>{order.price}</Text>
        </View>
      </TouchableOpacity>
    ));
  }, [externalOrders]);

  return (
    <View style={styles.sectionContainer}>
 
      <Text style={styles.sectionTitle}>{selectedOrder ? "CHI TIẾT GIAO DỊCH" : "CÁC GIAO DỊCH CỦA BẠN"}</Text>
      {selectedOrder ? renderOrderDetail() : renderOrdersList()}
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
 
  backText: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
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
  orderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  orderLeft: { flex: 2 },
  orderRight: { flex: 1, alignItems: "flex-end", justifyContent: "center" },
  orderTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
  orderSubInfo: { fontSize: 16, color: "#888", marginTop: 2 },
  orderPrice: { fontSize: 20, fontWeight: "bold", color: "#007bff" },
  ordermaVe: { fontSize: 18, fontWeight: "bold", color: "#28a745" },
  orderDetailBox: {
    backgroundColor: "#fdfdfd",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  questionContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
  },
  label: { fontWeight: "600", fontSize: 17, marginBottom: 6 },
});