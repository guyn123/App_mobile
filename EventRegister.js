import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE from './src/api';
import Pay from './Pay';
import Ticket from './Ticket';
import { Linking } from "react-native";

const fetchToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Retrieved token:", token ? "Token exists" : "No token found");
    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

export default function EventRegister({ route, username, isLoggedIn, addOrder }) {
  const { id } = route.params;
  const navigation = useNavigation();

  const [event, setEvent] = useState(null);
  const [eventLoading, setEventLoading] = useState(true);
  const [step, setStep] = useState(2);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [method, setMethod] = useState(null);
  const [countdown, setCountdown] = useState(600);
  const [paid, setPaid] = useState(false);
  const [maDangKy, setMaDangKy] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successToken, setSuccessToken] = useState("");
  const [cancelToken, setCancelToken] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [existingRegistration, setExistingRegistration] = useState(null);

  // Fetch event data and booked seats
  useEffect(() => {
    const loadEventData = async () => {
      try {
        setEventLoading(true);
        const [eventResponse, seatsResponse, registrationResponse] = await Promise.all([
          axios.get(`${API_BASE}/sukien/get/${id}`),
          // Hypothetical endpoint for booked seats
          axios.get(`${API_BASE}/sukien/get/seats/${id}`, {
            headers: { Cookie: `token=${await fetchToken()}` },
            withCredentials: true,
          }).catch(() => ({ data: [] })), // Fallback if endpoint doesn't exist
          // Fetch existing registration
          axios.get(`${API_BASE}/sukien/dangky/me/${id}`, {
            headers: { Cookie: `token=${await fetchToken()}` },
            withCredentials: true,
          }).catch(() => ({ data: null })), // Fallback if no registration
        ]);

        if (eventResponse.data) {
          setEvent(eventResponse.data);
          setBookedSeats(seatsResponse.data || []);
          if (registrationResponse.data && registrationResponse.data.hasRegistration) {
            setExistingRegistration(registrationResponse.data);
            setSelectedSeat(registrationResponse.data.viTriGhe);
            setMethod(registrationResponse.data.phuongThucThanhToan);
            setPaymentUrl(registrationResponse.data.paymentUrl || "");
            setSuccessToken(registrationResponse.data.successToken || "");
            setCancelToken(registrationResponse.data.cancelToken || "");
            setStep(4);
            Alert.alert(
              "Thông báo",
              "Bạn đã có một đăng ký đang chờ thanh toán. Vui lòng hoàn tất hoặc hủy trước khi đăng ký lại.",
              [
                { text: "Hoàn tất thanh toán", onPress: () => setStep(4) },
                { text: "Hủy đăng ký", onPress: () => handlePaymentCancel() },
                { text: "OK", style: "cancel" },
              ]
            );
          }
        } else {
          Alert.alert("Lỗi", "Không tìm thấy thông tin sự kiện", [
            { text: "OK", onPress: () => navigation.goBack() },
          ]);
        }
      } catch (error) {
        console.error("Error loading event or seats:", error);
        Alert.alert("Lỗi", "Không thể tải thông tin sự kiện hoặc ghế", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } finally {
        setEventLoading(false);
      }
    };
    loadEventData();
  }, [id, navigation]);

  // Check event time
  useEffect(() => {
    if (!event) return;
    const now = new Date();
    const startTime = new Date(event.ngayBatDau);
    const endTime = new Date(event.ngayKetThuc);
    const isEventEnded = now > endTime;
    const isEventOngoing = now >= startTime && now <= endTime;
    if (isEventEnded || isEventOngoing) {
      Alert.alert(
        "Không thể đăng ký",
        isEventEnded ? "Sự kiện đã kết thúc." : "Sự kiện đang diễn ra, không thể đăng ký.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }
  }, [event, navigation]);

  // Countdown timer
  useEffect(() => {
    let timer;
    if (step === 4 && countdown > 0 && !paid && paymentUrl) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !paid && paymentUrl) {
      Alert.alert("Hết thời gian thanh toán", "Phiên thanh toán đã hết hạn. Vui lòng đăng ký lại.");
      handlePaymentCancel();
    }
    return () => clearTimeout(timer);
  }, [step, countdown, paid, paymentUrl]);

  // Enhanced register function
  const handleRegister = useCallback(async () => {
    if (!selectedSeat || !method) {
      Alert.alert("Lỗi", "Vui lòng chọn ghế và phương thức thanh toán");
      return;
    }
    setIsLoading(true);
    try {
      const storedToken = await fetchToken();
      if (!storedToken) {
        Alert.alert("Lỗi", "Không tìm thấy token. Vui lòng đăng nhập lại", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
        return;
      }
      const requestBody = { viTriGhe: selectedSeat, phuongThucThanhToan: method };
      console.log("=== REGISTRATION DEBUG INFO ===");
      console.log("API URL:", `${API_BASE}/sukien/dangky/${id}`);
      console.log("Request Body:", requestBody);
      console.log("Token exists:", !!storedToken);
      console.log("Token preview:", storedToken.substring(0, 30) + "...");
      console.log("Event ID:", id);
      console.log("Selected Seat:", selectedSeat);
      console.log("Payment Method:", method);
      try {
        const tokenParts = storedToken.split(".");
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log("=== JWT TOKEN ANALYSIS ===");
          console.log("Token payload:", payload);
          console.log("Token expires at:", new Date(payload.exp * 1000));
          console.log("Current time:", new Date());
          console.log("Token expired?", Date.now() > payload.exp * 1000);
          console.log("User role/authority:", payload.vaiTro);
          console.log("Username:", payload.tenDangNhap);
          console.log("User ID:", payload.maTaiKhoan);
          if (Date.now() > payload.exp * 1000) {
            Alert.alert("Token hết hạn", "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            return;
          }
          if (payload.vaiTro !== "KhachHang") {
            Alert.alert("Lỗi quyền truy cập", `Role "${payload.vaiTro}" không có quyền đăng ký sự kiện. Cần role "KhachHang".`);
            return;
          }
        }
      } catch (e) {
        console.log("Could not decode token:", e);
      }
      const tokenMethods = [
        { name: "Cookie Header", config: { headers: { "Content-Type": "application/json", Cookie: `token=${storedToken}` }, withCredentials: true } },
        { name: "Authorization Bearer", config: { headers: { "Content-Type": "application/json", Authorization: `Bearer ${storedToken}` }, withCredentials: true } },
        { name: "Custom Auth Header", config: { headers: { "Content-Type": "application/json", "X-Auth-Token": storedToken, token: storedToken }, withCredentials: true } },
        { name: "Different Cookie Format", config: { headers: { "Content-Type": "application/json", Cookie: `authToken=${storedToken}; token=${storedToken}` }, withCredentials: true } },
        { name: "Query Parameter", config: { headers: { "Content-Type": "application/json" }, params: { token: storedToken }, withCredentials: true } },
      ];
      let response = null;
      let lastError = null;
      for (let i = 0; i < tokenMethods.length; i++) {
        const method = tokenMethods[i];
        try {
          console.log(`=== TRYING METHOD ${i + 1}: ${method.name} ===`);
          console.log("Config:", method.config);
          response = await axios.post(`${API_BASE}/sukien/dangky/${id}`, requestBody, { ...method.config, timeout: 15000 });
          console.log(`✅ METHOD ${i + 1} (${method.name}) SUCCESS!`);
          break;
        } catch (error) {
          console.log(`❌ METHOD ${i + 1} (${method.name}) FAILED:`, error.response?.status);
          lastError = error;
          if (error.response?.status && error.response.status !== 403) {
            console.log("Different error code, might be progress - stopping here");
            throw error;
          }
          continue;
        }
      }
      if (!response) {
        console.log("All authentication methods failed!");
        throw lastError;
      }
      console.log("Registration successful:", response.data);
      if (response.data && response.data.url) {
        const paymentUrl = response.data.url;
        setPaymentUrl(paymentUrl);
        const urlParts = paymentUrl.split("/");
        let extractedSuccessToken = "";
        let extractedCancelToken = "";
        for (let i = 0; i < urlParts.length; i++) {
          if (urlParts[i] === "success" && i > 0) extractedSuccessToken = urlParts[i - 1];
          if (urlParts[i] === "cancel" && i > 0) extractedCancelToken = urlParts[i - 1];
        }
        if (!extractedSuccessToken || !extractedCancelToken) {
          const urlString = paymentUrl.toString();
          const successMatch = urlString.match(/([^\/]+)\/success/);
          const cancelMatch = urlString.match(/([^\/]+)\/cancel/);
          if (successMatch) extractedSuccessToken = successMatch[1];
          if (cancelMatch) extractedCancelToken = cancelMatch[1];
        }
        setSuccessToken(extractedSuccessToken);
        setCancelToken(extractedCancelToken);
        console.log("Extracted tokens:", { success: extractedSuccessToken, cancel: extractedCancelToken });
        setStep(4);
        setCountdown(600);
        Linking.openURL(paymentUrl);
      } else {
        Alert.alert("Lỗi đăng ký", "Không nhận được URL thanh toán");
      }
    } catch (error) {
      console.error("=== REGISTRATION ERROR DEBUG ===");
      console.error("Full Error Object:", error);
      if (error.response) {
        console.error("Error Status:", error.response.status);
        console.error("Error Headers:", error.response.headers);
        console.error("Error Data:", error.response.data);
        console.error("Error Config URL:", error.response.config?.url);
        console.error("Error Config Headers:", error.response.config?.headers);
      } else if (error.request) {
        console.error("No Response Received:", error.request);
      } else {
        console.error("Request Setup Error:", error.message);
      }
      let errorMessage = "Không thể kết nối đến server";
      let errorDetails = "";
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data.error === "You have already signed up for this event and have a pending payment") {
          errorMessage = "Đăng ký đã tồn tại";
          errorDetails = "Bạn đã đăng ký sự kiện này và có một thanh toán đang chờ. Vui lòng hủy đăng ký hiện tại để thử lại.";
          // Try to fetch existing registration details
          try {
            const storedToken = await fetchToken();
            const registrationResponse = await axios.get(`${API_BASE}/sukien/dangky/me/${id}`, {
              headers: { Cookie: `token=${storedToken}` },
              withCredentials: true,
            });
            if (registrationResponse.data && registrationResponse.data.hasRegistration) {
              setExistingRegistration(registrationResponse.data);
              setSelectedSeat(registrationResponse.data.viTriGhe);
              setMethod(registrationResponse.data.phuongThucThanhToan);
              setPaymentUrl(registrationResponse.data.paymentUrl || "");
              setSuccessToken(registrationResponse.data.successToken || "");
              setCancelToken(registrationResponse.data.cancelToken || "");
              setStep(4);
              Alert.alert(errorMessage, errorDetails, [
                { text: "Hoàn tất thanh toán", onPress: () => setStep(4) },
                { text: "Hủy đăng ký", onPress: () => handlePaymentCancel() },
                { text: "OK", style: "cancel" },
              ]);
            } else {
              Alert.alert(errorMessage, errorDetails, [
                { text: "Hủy đăng ký", onPress: () => handlePaymentCancel() },
                { text: "OK", style: "cancel" },
              ]);
            }
          } catch (regError) {
            console.error("Failed to fetch existing registration:", regError);
            Alert.alert(errorMessage, errorDetails + "\nKhông thể lấy thông tin đăng ký. Vui lòng hủy và thử lại.", [
              { text: "Hủy đăng ký", onPress: () => handlePaymentCancel() },
              { text: "OK", style: "cancel" },
            ]);
          }
          return;
        }
        switch (status) {
          case 403:
            errorMessage = "Không có quyền truy cập";
            errorDetails = data?.error || data?.message || "Lỗi xác thực không rõ";
            break;
          case 401:
            errorMessage = "Phiên đăng nhập đã hết hạn";
            errorDetails = "Vui lòng thoát và đăng nhập lại";
            break;
          case 400:
            errorMessage = "Yêu cầu không hợp lệ";
            errorDetails = data?.error || data?.message || "Có thể ghế đã được đặt hoặc thông tin không chính xác";
            break;
          case 404:
            errorMessage = "Không tìm thấy";
            errorDetails = data?.error || data?.message || "Sự kiện không tồn tại hoặc đã bị xóa";
            break;
          case 409:
            errorMessage = "Xung đột dữ liệu";
            errorDetails = "Ghế có thể đã được đặt bởi người khác";
            break;
          case 500:
            errorMessage = "Lỗi server";
            errorDetails = "Vui lòng thử lại sau ít phút";
            break;
          default:
            errorMessage = `Lỗi ${status}`;
            errorDetails = data?.error || data?.message || "Lỗi không xác định";
        }
      } else if (error.request) {
        errorMessage = "Lỗi kết nối mạng";
        errorDetails = "Không thể kết nối đến server. Vui lòng kiểm tra:\n• Kết nối internet\n• Địa chỉ server\n• Firewall/VPN";
      } else {
        errorMessage = "Lỗi không xác định";
        errorDetails = error.message;
      }
      Alert.alert(errorMessage, errorDetails, [
        { text: "OK", style: "default" },
        ...(error.response?.status === 403 ? [{ text: "Thử lại", onPress: () => setStep(2) }] : []),
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedSeat, method, id, navigation]);

  // Enhanced payment success confirmation
  const handlePaymentSuccess = useCallback(async () => {
    if (!successToken) {
      Alert.alert("Lỗi", "Không tìm thấy token thanh toán");
      return;
    }
    setIsLoading(true);
    try {
      const storedToken = await fetchToken();
      if (!storedToken) {
        Alert.alert("Lỗi", "Vui lòng đăng nhập lại");
        navigation.navigate("Login");
        return;
      }
      console.log("Confirming payment with token:", successToken);
      const response = await axios.get(`${API_BASE}/sukien/dangky/${successToken}/success`, {
        headers: { Cookie: `token=${storedToken}`, "Content-Type": "application/json" },
        withCredentials: true,
        timeout: 10000,
      });
      if (response.data && response.data.maDangKy) {
        setMaDangKy(response.data.maDangKy);
        setPaid(true);
        const order = {
          id: response.data.maDangKy,
          category: event.tenDanhMuc || "Sự kiện",
          title: event.tenSuKien,
          bookingTime: new Date().toLocaleString("vi-VN"),
          start: new Date(event.ngayBatDau).toLocaleString("vi-VN"),
          end: new Date(event.ngayKetThuc).toLocaleString("vi-VN"),
          location: event.diaDiem,
          price: parseInt(event.phiThamGia).toLocaleString() + "₫",
          description: event.moTa || "",
          totalSeats: event.luongChoNgoi,
          bookedSeats: (event.soNguoiDaDangKy || 0) + 1,
          maGhe: selectedSeat,
          maVe: response.data.maDangKy,
          status: "Thành công",
        };
        if (addOrder) {
          addOrder(order);
        }
        Alert.alert("Thành công", "Thanh toán thành công! Vé của bạn đã được tạo.");
      } else {
        Alert.alert("Lỗi", "Không nhận được thông tin đăng ký");
      }
    } catch (error) {
      console.error("Payment confirmation error:", error);
      let errorMessage = "Không thể xác nhận thanh toán";
      if (error.response) {
        const errorData = error.response.data;
        errorMessage = errorData?.error || errorData?.message || errorMessage;
        if (error.response.status === 401) {
          errorMessage = "Phiên đăng nhập đã hết hạn. Vui lòng thoát và đăng nhập lại.";
        }
      }
      Alert.alert("Lỗi", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [successToken, event, selectedSeat, addOrder, navigation]);

  // Enhanced payment cancellation
  const handlePaymentCancel = useCallback(async () => {
    if (!cancelToken) {
      // If no cancel token, try to cancel via registration endpoint
      try {
        const storedToken = await fetchToken();
        if (!storedToken) {
          Alert.alert("Lỗi", "Vui lòng đăng nhập lại");
          navigation.navigate("Login");
          return;
        }
        await axios.delete(`${API_BASE}/sukien/dangky/me/${id}`, {
          headers: { Cookie: `token=${storedToken}` },
          withCredentials: true,
          timeout: 10000,
        });
        Alert.alert("Đã hủy", "Đăng ký đã được hủy. Bạn có thể đăng ký lại.");
        setSelectedSeat(null);
        setMethod(null);
        setStep(2);
        setCountdown(600);
        setPaymentUrl("");
        setSuccessToken("");
        setCancelToken("");
        setExistingRegistration(null);
      } catch (error) {
        console.error("Payment cancellation error:", error);
        Alert.alert("Lỗi", "Không thể hủy đăng ký. Vui lòng thử lại.");
      }
      return;
    }
    setIsLoading(true);
    try {
      const storedToken = await fetchToken();
      if (!storedToken) {
        Alert.alert("Lỗi", "Vui lòng đăng nhập lại");
        navigation.navigate("Login");
        return;
      }
      console.log("Cancelling payment with token:", cancelToken);
      const response = await axios.get(`${API_BASE}/sukien/dangky/${cancelToken}/cancel`, {
        headers: { Cookie: `token=${storedToken}`, "Content-Type": "application/json" },
        withCredentials: true,
        timeout: 10000,
      });
      if (response.data) {
        Alert.alert("Đã hủy", "Thanh toán đã được hủy. Ghế đã được giải phóng.");
        setSelectedSeat(null);
        setMethod(null);
        setStep(2);
        setCountdown(600);
        setPaymentUrl("");
        setSuccessToken("");
        setCancelToken("");
        setExistingRegistration(null);
      }
    } catch (error) {
      console.error("Payment cancellation error:", error);
      let errorMessage = "Không thể hủy thanh toán";
      if (error.response) {
        const errorData = error.response.data;
        errorMessage = errorData?.error || errorData?.message || errorMessage;
        if (error.response.status === 401) {
          errorMessage = "Phiên đăng nhập đã hết hạn. Vui lòng thoát và đăng nhập lại.";
        }
      }
      Alert.alert("Lỗi", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [cancelToken, id, navigation]);

  const toCurrency = (v) => parseInt(v).toLocaleString() + " ₫";
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (eventLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Đang tải thông tin sự kiện...</Text>
      </View>
    );
  }

  if (!event) return null;

  const seats = event ? Array.from({ length: event.luongChoNgoi }, (_, i) => i + 1) : [];

  return (
    <ScrollView style={styles.container}>
      {!paid && (
        <View style={styles.box}>
          <Image source={{ uri: `${API_BASE}/sukien/get/img/${event.anhSuKien}` }} style={styles.eventBanner} />
          <Text style={styles.eventTitle}>{event.tenSuKien}</Text>
          <Text style={styles.eventInfo}>📅 Bắt đầu: {new Date(event.ngayBatDau).toLocaleString("vi-VN")}</Text>
          <Text style={styles.eventInfo}>📅 Kết thúc: {new Date(event.ngayKetThuc).toLocaleString("vi-VN")}</Text>
          <Text style={styles.eventInfo}>📍 Địa điểm: {event.diaDiem}</Text>
          <Text style={styles.eventInfo}>💰 Giá vé: {toCurrency(event.phiThamGia)}</Text>
          <Text style={styles.eventInfo}>🪑 Tổng ghế: {event.luongChoNgoi}</Text>
          <Text style={styles.eventInfo}>👥 Đã đăng ký: {event.soNguoiDaDangKy || 0}</Text>
          <Text style={styles.eventInfo}>📊 Trạng thái: {event.trangThaiSuKien}</Text>
        </View>
      )}

      {step === 2 && (
        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Sơ đồ chỗ ngồi</Text>
          <View style={styles.legendContainer}>
            <View style={[styles.legendItem, { backgroundColor: "#4CAF50" }]} />
            <Text style={styles.legendText}>Còn chỗ</Text>
            <View style={[styles.legendItem, { backgroundColor: "#f44336" }]} />
            <Text style={styles.legendText}>Đã đặt</Text>
            <View style={[styles.legendItem, { backgroundColor: "#f0ad4e" }]} />
            <Text style={styles.legendText}>Đang chọn</Text>
          </View>
          <View style={styles.stage}>
            <Text style={styles.stageText}>SÂN KHẤU</Text>
          </View>
          <View style={styles.seatWrap}>
            {seats.map((seat) => {
              const isBooked = bookedSeats.includes(seat);
              const isSelected = selectedSeat === seat;
              const bgColor = isBooked ? "#f44336" : isSelected ? "#f0ad4e" : "#4CAF50";
              return (
                <TouchableOpacity
                  key={seat}
                  disabled={isBooked}
                  style={[styles.seat, { backgroundColor: bgColor }]}
                  onPress={() => setSelectedSeat(seat === selectedSeat ? null : seat)}
                >
                  <Text style={styles.seatText}>{seat}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: selectedSeat ? "#28a745" : "#ccc", opacity: isLoading ? 0.6 : 1 }]}
            disabled={!selectedSeat || isLoading}
            onPress={() => setStep(3)}
          >
            <Text style={styles.buttonText}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <Pay
          event={event}
          username={username}
          selectedSeat={selectedSeat}
          method={method}
          setMethod={setMethod}
          handleRegister={handleRegister}
          isLoading={isLoading}
          toCurrency={toCurrency}
        />
      )}

      {step === 4 && (
        <Ticket
          event={event}
          username={username}
          selectedSeat={selectedSeat}
          method={method}
          paid={paid}
          maDangKy={maDangKy}
          paymentUrl={paymentUrl}
          countdown={countdown}
          isLoading={isLoading}
          handlePaymentSuccess={handlePaymentSuccess}
          handlePaymentCancel={handlePaymentCancel}
          toCurrency={toCurrency}
          formatTime={formatTime}
          hasExistingRegistration={!!existingRegistration}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
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
  eventBanner: { width: "100%", height: 200, borderRadius: 8, marginBottom: 12 },
  eventTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 12, color: "#333", textAlign: "center" },
  eventInfo: { fontSize: 14, marginBottom: 6, color: "#555" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 12, color: "#333" },
  legendContainer: { flexDirection: "row", alignItems: "center", marginBottom: 12, flexWrap: "wrap" },
  legendItem: { width: 20, height: 20, borderRadius: 4, marginRight: 8, marginLeft: 16 },
  legendText: { marginRight: 16, fontSize: 12 },
  stage: { backgroundColor: "#ddd", padding: 12, marginBottom: 16, borderRadius: 4, alignItems: "center" },
  stageText: { fontWeight: "bold", color: "#666" },
  seatWrap: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 16 },
  seat: { width: 40, height: 40, margin: 4, borderRadius: 4, justifyContent: "center", alignItems: "center" },
  seatText: { color: "white", fontWeight: "bold", fontSize: 12 },
  button: { padding: 12, borderRadius: 6, alignItems: "center", marginTop: 8 },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});