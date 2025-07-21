// ✅ FILE: DKEven.js 
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { eventList } from './src/data/eventData';

const generateMaDiemDanh = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export default function DKEvent({ route, username, addOrder }) {
  const { id } = route.params;
  const event = eventList.find(e => e.maSuKien === id);

  const [step, setStep] = useState(2);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [method, setMethod] = useState(null);
  const [countdown, setCountdown] = useState(180);
  const [paid, setPaid] = useState(false);
  const [maDiemDanh, setMaDiemDanh] = useState('');

  const seats = Array.from({ length: event.luongChoNgoi }, (_, i) => i + 1);
  const bookedSeats = []; // có thể mở rộng

  const now = new Date();
const startTime = new Date(event.ngayBatDau);
const endTime = new Date(event.ngayKetThuc);

const isEventEnded = now > endTime;
const isEventOngoing = now >= startTime && now <= endTime;

if (isEventEnded || isEventOngoing) {
  Alert.alert('Không thể đăng ký', isEventEnded ? 'Sự kiện đã kết thúc.' : 'Sự kiện đang diễn ra, không thể đăng ký.');
  navigation.goBack(); // quay về trang trước
  return null;
}
  useEffect(() => {
    let timer;
    if (step === 4 && countdown > 0 && !paid) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !paid) {
      Alert.alert('Hết thời gian thanh toán', 'Ghế đã được giải phóng.');
      setSelectedSeat(null);
      setStep(2);
      setCountdown(180);
    }
    return () => clearTimeout(timer);
  }, [step, countdown, paid]);

  const handlePaid = () => {
    const newCode = generateMaDiemDanh();
    setMaDiemDanh(newCode);
    setPaid(true);

    const order = {
      id: `GD${Math.floor(Math.random() * 100000)}`,
      category: event.tenDanhMuc,
      title: event.tenSuKien,
      bookingTime: new Date().toLocaleString('vi-VN'),
      start: new Date(event.ngayBatDau).toLocaleString('vi-VN'),
      end: new Date(event.ngayKetThuc).toLocaleString('vi-VN'),
      location: event.diaDiem,
      price: parseInt(event.phiThamGia).toLocaleString() + '₫',
      description: event.moTa,
      totalSeats: event.luongChoNgoi,
      bookedSeats: event.soNguoiDaDangKy + 1,
      maGhe: selectedSeat,
      maVe: newCode,
    };

    addOrder(order);
  };

  const toCurrency = v => parseInt(v).toLocaleString() + ' ₫';

  return (
    <ScrollView style={styles.container}>
      {!paid && (
        <View style={styles.box}>
          <Text style={styles.eventTitle}>{event.tenSuKien}</Text>
          <Text>Bắt đầu: {new Date(event.ngayBatDau).toLocaleString('vi-VN')}</Text>
          <Text>Kết thúc: {new Date(event.ngayKetThuc).toLocaleString('vi-VN')}</Text>
          <Text>Địa điểm: {event.diaDiem}</Text>
          <Text>Giá vé: {toCurrency(event.phiThamGia)}</Text>
        </View>
      )}

      {step === 2 && (
        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Sơ đồ chỗ ngồi</Text>
          <View style={styles.legendContainer}>
            <View style={[styles.legendItem, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.legendText}>Còn chỗ</Text>
            <View style={[styles.legendItem, { backgroundColor: '#f44336' }]} />
            <Text style={styles.legendText}>Đã đặt</Text>
            <View style={[styles.legendItem, { backgroundColor: '#f0ad4e' }]} />
            <Text style={styles.legendText}>Đang chọn</Text>
          </View>
          <View style={styles.stage}><Text style={styles.stageText}>SÂN KHẤU</Text></View>
          <View style={styles.seatWrap}>
            {seats.map(seat => {
              const isBooked = bookedSeats.includes(seat);
              const isSelected = selectedSeat === seat;
              const bgColor = isBooked
                ? '#f44336'
                : isSelected
                  ? '#f0ad4e'
                  : '#4CAF50';

              return (
                <TouchableOpacity
                  key={seat}
                  disabled={isBooked}
                  style={[styles.seat, { backgroundColor: bgColor }]}
                  onPress={() => setSelectedSeat(seat === selectedSeat ? null : seat)}>
                  <Text style={styles.seatText}>{seat}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: selectedSeat ? '#28a745' : '#ccc' }]}
            disabled={!selectedSeat}
            onPress={() => setStep(3)}>
            <Text style={styles.buttonText}>Đặt vé</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Thông tin đặt vé</Text>
          <Text>Họ tên: {username}</Text>
          <Text>Ghế: {selectedSeat}</Text>
          <Text>Tổng tiền: {toCurrency(event.phiThamGia)}</Text>
          <Text style={{ marginTop: 8, fontWeight: 'bold' }}>Phương thức thanh toán:</Text>
          {['MoMo', 'ZaloPay'].map(item => (
            <TouchableOpacity
              key={item}
              style={[styles.methodBtn, method === item && styles.methodActive]}
              onPress={() => setMethod(item)}>
              <Text style={{ color: method === item ? '#fff' : '#000' }}>{item}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: method ? '#007bff' : '#ccc' }]}
            disabled={!method}
            onPress={() => setStep(4)}>
            <Text style={styles.buttonText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 4 && !paid && (
        <View style={styles.box}>
          <Text style={styles.sectionTitle}>QR Thanh toán</Text>
          <Image
            source={require('./assets/img/QR.jpg')}
            style={{ width: 200, height: 200, alignSelf: 'center', marginBottom: 12 }}
          />
          <Text>Ngân hàng: MB Bank</Text>
          <Text>Số tài khoản: 123456789</Text>
          <Text>Nội dung: Thanh toan ve (mã tự động)</Text>
          <Text>Tổng tiền: {toCurrency(event.phiThamGia)}</Text>
          <Text style={{ marginTop: 8 }}>⏰ Còn lại: {countdown}s</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#28a745' }]}
            onPress={handlePaid}>
            <Text style={styles.buttonText}>Tôi đã thanh toán</Text>
          </TouchableOpacity>
        </View>
      )}

      {paid && (
        <View style={styles.ticketBox}>
          <Text style={styles.ticketIcon}>🎫</Text>
          <Text style={styles.ticketTitle}>VÉ THAM DỰ</Text>
          <View style={styles.ticketContent}>
            <Text style={styles.ticketText}>Sự kiện: {event.tenSuKien}</Text>
            <Text style={styles.ticketText}>Họ tên: {username}</Text>
            <Text style={styles.ticketText}>Ghế: {selectedSeat}</Text>
            <Text style={styles.ticketText}>Phương thức: {method}</Text>
            <Text style={styles.ticketText}>Ngày đặt: {new Date().toLocaleString('vi-VN')}</Text>
            <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 20, marginTop: 20 }}>
              🔖 Mã điểm danh: <Text style={styles.code}>{maDiemDanh}</Text>
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 12 },
  box: { backgroundColor: '#f2f2f2', padding: 14, borderRadius: 10, marginBottom: 16 },
  eventTitle: { fontSize: 18, fontWeight: 'bold', color: '#007bff', marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  stage: { backgroundColor: '#d9534f', padding: 10, marginVertical: 10 },
  stageText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  seatWrap: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  seat: {
    width: 35, height: 35,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  seatText: { color: '#fff', fontWeight: 'bold' },
  methodBtn: {
    padding: 12,
    marginTop: 8,
    borderRadius: 6,
    backgroundColor: '#eee',
    alignItems: 'center'
  },
  methodActive: { backgroundColor: '#dc3545' },
  button: {
    marginTop: 16,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  legendItem: {
    width: 16,
    height: 16,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  legendText: {
    marginRight: 12,
    fontSize: 12,
  },
// vé tham dự:
ticketBox: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 16,
  borderColor: '#007bff',
  borderWidth: 2,
  alignItems: 'center',
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 5,
},
ticketIcon: {
  fontSize: 70,
  marginBottom: 0,
},
ticketTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#007bff',
  marginBottom: 12,
},
ticketContent: {
  width: '100%',
},
ticketText: {
  fontSize: 17,
  marginBottom: 8,
},

code: {
  fontWeight: 'bold',
  color: '#d9534f',
},


});
