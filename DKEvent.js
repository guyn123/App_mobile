import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { eventList } from './src/data/eventData';

export default function DKEvent() {
  const route = useRoute();
  const { id } = route.params;
  const event = eventList.find(e => e.id === id);

  const [step, setStep] = useState(2); // Bỏ qua bước 1, nhảy thẳng tới chọn ghế
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [method, setMethod] = useState(null);
  const [countdown, setCountdown] = useState(180);
  const [paid, setPaid] = useState(false);
  const ticketCode = 'VE20250712105214';

  const seats = Array.from({ length: event.totalSeats }, (_, i) => i + 1);
  const bookedSeats = []; // Ban đầu không có ghế nào bị đặt

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

  const toCurrency = v => parseInt(v).toLocaleString() + ' ₫';

  return (
    <ScrollView style={styles.container}>
      

    {!paid && (
  <View style={styles.box}>
    <Text style={styles.eventTitle}>{event.title}</Text>
    <Text>Bắt đầu: {new Date(event.start).toLocaleString('vi-VN')}</Text>
    <Text>Kết thúc: {new Date(event.end).toLocaleString('vi-VN')}</Text>
    <Text>Địa điểm: {event.location}</Text>
    <Text>Giá vé: {toCurrency(event.price)}</Text>
  </View>
)}


      {/* Sơ đồ chỗ ngồi */}
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
                  onPress={() =>
                    setSelectedSeat(seat === selectedSeat ? null : seat)
                  }>
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

      {/* Thanh toán */}
      {step === 3 && (
        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Thông tin đặt vé</Text>
          <Text>Họ tên: Nguyễn Văn A</Text>
          <Text>Số điện thoại: 0987654321</Text>
          <Text>Ghế: {selectedSeat}</Text>
          <Text>Tổng tiền: {toCurrency(event.price)}</Text>
          <Text style={{ marginTop: 8, fontWeight: 'bold' }}>Phương thức thanh toán:</Text>
          {['MoMo', 'ZaloPay', ].map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.methodBtn,
                method === item && styles.methodActive,
              ]}
              onPress={() => setMethod(item)}
            >
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

      {/* QR + xác nhận */}
      {step === 4 && !paid && (
  <View style={styles.box}>
    <Text style={styles.sectionTitle}>QR Thanh toán</Text>
    <Image
      source={require('./assets/img/QR.jpg')}
      style={{ width: 200, height: 200, alignSelf: 'center', marginBottom: 12 }}
    />
    <Text>Ngân hàng: MB Bank</Text>
    <Text>Số tài khoản: 123456789</Text>
    <Text>Nội dung: Thanh toan ve {ticketCode}</Text>
    <Text>Tổng tiền: {toCurrency(event.price)}</Text>
    <Text style={{ marginTop: 8 }}>⏰ Còn lại: {countdown}s</Text>
    <TouchableOpacity
      style={[styles.button, { backgroundColor: '#28a745' }]}
      onPress={() => setPaid(true)}>
      <Text style={styles.buttonText}>Tôi đã thanh toán</Text>
    </TouchableOpacity>
  </View>
)}

      {/* Hiển thị vé */}
      {paid && (
<View style={styles.ticketBox}>
  <Text style={styles.ticketIcon}>🎫</Text>
  <Text style={styles.ticketTitle}>VÉ THAM DỰ</Text>
  <View style={styles.ticketContent}>
    <Text style={styles.ticketText}>Sự kiện: {event.title}</Text>
    <Text style={styles.ticketText}>Họ tên: Nguyễn Văn A</Text>
    <Text style={styles.ticketText}>Ghế: {selectedSeat}</Text>
    <Text style={styles.ticketText}>Phương thức: {method}</Text>
    <Text style={styles.ticketText}>Ngày đặt: {new Date().toLocaleString('vi-VN')}</Text>
    <Text style={{ textAlign: 'center', alignSelf: 'center',fontSize: 20,
  marginTop: 20, }}>
  🔖 Mã vé: <Text style={styles.code}>{ticketCode}</Text>
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
