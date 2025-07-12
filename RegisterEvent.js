import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { eventList } from './src/data/eventData'; // giả sử bạn có sẵn file này
import { useRoute } from '@react-navigation/native';

export default function DKEvent() {
  const route = useRoute();
  const { eventId } = route.params; // Nhận id từ URL
  const event = eventList.find(e => e.id === eventId);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(180);
  const intervalRef = useRef(null);

  // ==== Random ghế đã đặt ====
  const totalSeats = 100;
  const bookedSeats = Array.from({ length: 30 }, () =>
    Math.floor(Math.random() * totalSeats)
  );

  const isSeatBooked = (i) => bookedSeats.includes(i);
  const isSeatSelected = (i) => selectedSeats.includes(i);

  const toggleSeat = (i) => {
    if (isSeatBooked(i)) return;
    setSelectedSeats(prev =>
      prev.includes(i) ? prev.filter(s => s !== i) : [...prev, i]
    );
  };

  // ==== Bắt đầu đếm ngược ====
  useEffect(() => {
    if (step === 3) {
      intervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setStep(6); // Hiện overlay
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [step]);

  const totalPrice = event && selectedSeats.length * event.price;

  if (!event) return <Text style={styles.warning}>Không tìm thấy sự kiện.</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* 1. THÔNG TIN SỰ KIỆN */}
      <View style={styles.section}>
        <Text style={styles.title}>{event.title}</Text>
        <Text>🗓️ Bắt đầu: {new Date(event.start).toLocaleString('vi-VN')}</Text>
        <Text>🛑 Kết thúc: {new Date(event.end).toLocaleString('vi-VN')}</Text>
        <Text>📍 Địa điểm: {event.location}</Text>
        <Text>💵 Giá vé: {parseInt(event.price).toLocaleString()}₫</Text>
      </View>

      {/* 2. SƠ ĐỒ GHẾ */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Sơ đồ chỗ ngồi</Text>
        <Text>🎭 Sân khấu phía trên</Text>
        <View style={styles.legend}>
          <Text style={styles.legendItem}>🟩 Còn trống</Text>
          <Text style={styles.legendItem}>🟥 Đã đặt</Text>
          <Text style={styles.legendItem}>🟦 Đang chọn</Text>
        </View>
        <View style={styles.seatsContainers}>
          {Array.from({ length: totalSeats }).map((_, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.seat,
                isSeatBooked(i) && styles.booked,
                isSeatSelected(i) && styles.selected,
              ]}
              onPress={() => toggleSeat(i)}
            >
              <Text style={styles.seatText}>{i + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => {
            if (selectedSeats.length === 0) {
              Alert.alert('Vui lòng chọn ghế trước!');
              return;
            }
            setStep(3);
          }}
        >
          <Text style={styles.bookBtnText}>Đặt vé</Text>
        </TouchableOpacity>
      </View>

      {/* 3. ĐẶT VÉ + THANH TOÁN */}
      {step === 3 && (
        <View style={styles.section} id="bookingSummary">
          <Text style={styles.subtitle}>Thông tin đặt vé</Text>
          <Text>👤 Họ tên: Nguyễn Văn A</Text>
          <Text>📞 SĐT: 0123456789</Text>
          <Text>💺 Ghế đã chọn: {selectedSeats.join(', ')}</Text>
          <Text>💰 Tổng tiền: {totalPrice.toLocaleString()}₫</Text>
          <Text style={styles.countdown}>⏳ {countdown}s</Text>

          <Text style={styles.subtitle}>Phương thức thanh toán:</Text>
          <Text>📱 MoMo | 💳 ZaloPay | 🏦 Chuyển khoản | 💵 Tiền mặt</Text>

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
            <TouchableOpacity style={styles.payBtn} onPress={() => setStep(4)}>
              <Text style={styles.btnText}>Thanh toán</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.payBtn, { backgroundColor: '#ccc' }]}
              onPress={() => {
                setSelectedSeats([]);
                setStep(2);
              }}
            >
              <Text style={styles.btnText}>Huỷ</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 4. QR THANH TOÁN */}
      {step === 4 && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Thanh toán chuyển khoản</Text>
          <Text>🏦 Ngân hàng: TPBank</Text>
          <Text>💳 Số tài khoản: 0123456789</Text>
          <Text>📝 Nội dung: THANHTOAN#{Math.floor(Math.random() * 999999)}</Text>
          <Text>💵 Số tiền: {totalPrice.toLocaleString()}₫</Text>
          <TouchableOpacity
            style={[styles.payBtn, { marginTop: 16 }]}
            onPress={() => setStep(5)}
          >
            <Text style={styles.btnText}>Xác nhận đã thanh toán</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 5. HIỂN THỊ VÉ */}
      {step === 5 && (
        <View style={styles.section} id="ticket">
          <Text style={styles.subtitle}>🎫 Vé của bạn</Text>
          <Text>🎉 Sự kiện: {event.title}</Text>
          <Text>🪪 Mã vé: EVT{Math.floor(Math.random() * 999999)}</Text>
          <Text>👤 Tên: Nguyễn Văn A</Text>
          <Text>💺 Ghế: {selectedSeats.join(', ')}</Text>
          <Text>💳 Phương thức: Chuyển khoản</Text>
          <Text>📅 Ngày đặt: {new Date().toLocaleDateString('vi-VN')}</Text>

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
            <TouchableOpacity style={styles.payBtn}>
              <Text style={styles.btnText}>In vé</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.payBtn}>
              <Text style={styles.btnText}>Tải vé HTML</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 6. OVERLAY HẾT HẠN */}
      {step === 6 && (
        <View style={styles.overlay}>
          <Text style={{ color: '#fff', fontSize: 18 }}>⏰ Hết thời gian thanh toán!</Text>
          <TouchableOpacity
            style={[styles.payBtn, { backgroundColor: '#fff', marginTop: 10 }]}
            onPress={() => {
              setStep(2);
              setSelectedSeats([]);
              setCountdown(180);
            }}
          >
            <Text style={{ color: '#000' }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f9f9f9' },
  section: { marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  legend: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 8 },
  legendItem: { fontSize: 12 },
  seatsContainers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  seat: {
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  booked: { backgroundColor: 'red' },
  selected: { backgroundColor: 'blue' },
  seatText: { color: '#fff', fontSize: 12 },
  bookBtn: {
    backgroundColor: '#28a745',
    padding: 12,
    marginTop: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  bookBtnText: { color: '#fff', fontWeight: 'bold' },
  payBtn: {
    backgroundColor: '#007bff',
    padding: 12,
    flex: 1,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  countdown: { color: 'red', marginTop: 8 },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  warning: {
    marginTop: 50,
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
});
