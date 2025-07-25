import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Linking } from "react-native";

export default function Ticket({
  event,
  username,
  selectedSeat,
  method,
  paid,
  maDangKy,
  paymentUrl,
  countdown,
  isLoading,
  handlePaymentSuccess,
  handlePaymentCancel,
  toCurrency,
  formatTime,
  hasExistingRegistration,
}) {
  return (
    <>
      {!paid && (
        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Thanh toán trực tuyến</Text>
          {hasExistingRegistration && !paymentUrl ? (
            <>
              <Text style={styles.paymentInfo}>
                Bạn đã có một đăng ký đang chờ thanh toán (Ghế: {selectedSeat}, Phương thức: {method}).
                Không thể lấy thông tin thanh toán từ server. Vui lòng hủy đăng ký để thử lại.
              </Text>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#dc3545", marginTop: 8, opacity: isLoading ? 0.6 : 1 }]}
                disabled={isLoading}
                onPress={handlePaymentCancel}
              >
                <Text style={styles.buttonText}>{isLoading ? "Đang hủy..." : "Hủy đăng ký"}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.paymentInfo}>
                {countdown === 600
                  ? "Bạn đã có một đăng ký đang chờ thanh toán. Vui lòng hoàn tất hoặc hủy trước khi đăng ký lại."
                  : "Một trang thanh toán đã được mở trong trình duyệt của bạn."}
              </Text>
              <Text style={styles.paymentInfo}>Phương thức: {method}</Text>
              <Text style={styles.paymentInfo}>Tổng tiền: {toCurrency(event.phiThamGia)}</Text>
              <Text style={{ marginTop: 8, textAlign: "center", fontSize: 16, color: "#ff6b6b" }}>
                ⏰ Còn lại: {formatTime(countdown)}
              </Text>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#28a745", marginTop: 16 }]}
                onPress={() => Linking.openURL(paymentUrl)}
              >
                <Text style={styles.buttonText}>Mở lại trang thanh toán</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#007bff", marginTop: 8, opacity: isLoading ? 0.6 : 1 }]}
                disabled={isLoading}
                onPress={handlePaymentSuccess}
              >
                <Text style={styles.buttonText}>{isLoading ? "Đang xác nhận..." : "Tôi đã thanh toán"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#dc3545", marginTop: 8, opacity: isLoading ? 0.6 : 1 }]}
                disabled={isLoading}
                onPress={handlePaymentCancel}
              >
                <Text style={styles.buttonText}>{isLoading ? "Đang hủy..." : "Hủy thanh toán"}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
      {paid && maDangKy && (
        <View style={styles.ticketBox}>
          <Text style={styles.ticketIcon}>🎫</Text>
          <Text style={styles.ticketTitle}>VÉ THAM DỰ</Text>
          <View style={styles.ticketContent}>
            <Text style={styles.ticketText}>Sự kiện: {event.tenSuKien}</Text>
            <Text style={styles.ticketText}>Họ tên: {username}</Text>
            <Text style={styles.ticketText}>Ghế: {selectedSeat}</Text>
            <Text style={styles.ticketText}>Phương thức: {method}</Text>
            <Text style={styles.ticketText}>Ngày đặt: {new Date().toLocaleString("vi-VN")}</Text>
            <Text style={{ textAlign: "center", alignSelf: "center", fontSize: 20, marginTop: 20 }}>
              🔖 Mã đăng ký: <Text style={styles.code}>{maDangKy}</Text>
            </Text>
            <Text style={styles.noteText}>* Vui lòng lưu mã đăng ký để điểm danh tại sự kiện</Text>
          </View>
        </View>
      )}
    </>
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
  paymentInfo: { fontSize: 14, marginBottom: 4, color: "#333" },
  button: { padding: 12, borderRadius: 6, alignItems: "center", marginTop: 8 },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  ticketBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  ticketIcon: { fontSize: 48, marginBottom: 8 },
  ticketTitle: { fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 16 },
  ticketContent: { width: "100%" },
  ticketText: { fontSize: 14, marginBottom: 4, color: "#555" },
  code: { fontFamily: "monospace", backgroundColor: "#f0f0f0", padding: 4, borderRadius: 4, color: "#e74c3c", fontWeight: "bold" },
  noteText: { fontSize: 12, color: "#888", textAlign: "center", marginTop: 16, fontStyle: "italic" },
});